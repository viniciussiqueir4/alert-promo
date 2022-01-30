import * as z from 'zod'
import AppError from '../../exceptions/appError.exception'
import StatusCode from '~/helpers/statusCode'
import parseZodErrors from '~/helpers/parseZodErros'
import { User } from '@prisma/client';
import prisma from '~/services/prisma';
import { registerValidation } from '~/validations'
// import { validatePhone } from '~/utils/validateCellphone';
import bcrypt from 'bcryptjs';

export const registerService = async (data: User) => {
  try {
    const { name, email, password, cellphone } = registerValidation.parse(data);

    const exist = await prisma.user.findFirst({
      where: {
        OR: [{
          email,
        }, {
          cellphone
        }]
      }
    });

    if(exist) throw new AppError(['USER_ALREADY_EXIST'], StatusCode.INTERNAL_SERVER_ERROR);

    // const phoneIsValid = validatePhone(cellphone);
    // if(!phoneIsValid) throw new AppError(['CELLPHONE_INVALID'], StatusCode.INTERNAL_SERVER_ERROR);
    

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 8),
        cellphone,
      }
    });

    delete user.password;
    return user;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST)
    }
    if (error instanceof AppError) {
      throw new AppError(error.messages, error.statusCode)
    }
    throw new AppError([String(error)], StatusCode.INTERNAL_SERVER_ERROR)
  }
}