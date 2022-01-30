import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '~/config/auth';
import AppError from '~/exceptions/appError.exception';
import StatusCode from '~/helpers/statusCode';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string; 
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError(['MISSING_TOKEN'], StatusCode.BAD_REQUEST);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret!);

    const { sub, } = decoded as TokenPayload;
    request.user = {
      id: sub, 
    };
    return next();
  }
  catch(err) {
    throw new AppError(['INVALID_JWT_TOKEN'], StatusCode.BAD_REQUEST);
  }
}
