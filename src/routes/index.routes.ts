import express, { Request, Response, NextFunction}from 'express';
import AppError from '../exceptions/appError.exception';
import presenter from '../helpers/presenter'; 
import authRoutes from './auth.routes';


const router = express.Router();

router.use('/api/v1/auth', authRoutes);

router.use(async (err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json(presenter({}, err.messages, false));
  }
  return response.status(500).json(presenter({}, [JSON.stringify(err)], false));
});

export default router;