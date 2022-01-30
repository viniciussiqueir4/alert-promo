import * as z from 'zod'
import AppError from '../../exceptions/appError.exception'
import StatusCode from '~/helpers/statusCode'
import parseZodErrors from '~/helpers/parseZodErros'
import { User } from '@prisma/client';
import prisma from '~/services/prisma';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from '~/config/auth';

export const authService = async (data: User) => {
  try {
    const { email, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if(!user) throw new AppError(['INVALID_CREDENCIALS'], StatusCode.INTERNAL_SERVER_ERROR);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if(!passwordMatches) throw new AppError(['INVALID_CREDENCIALS'], StatusCode.INTERNAL_SERVER_ERROR);

    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret!, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    delete user.password;
    
    return {
      user,
      token,
    }
  } catch(error) {
    if (error instanceof z.ZodError) {
      throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST)
    }
    if (error instanceof AppError) {
      throw new AppError(error.messages, error.statusCode)
    }
    throw new AppError([String(error)], StatusCode.INTERNAL_SERVER_ERROR)
  }
} 