import { Request, Response } from 'express';
import { registerService, authService } from '~/services/auth'
import presenter from '../helpers/presenter';
import StatusCode from '../helpers/statusCode';

const authController = (() => {
  const register = async (req: Request, res: Response) => {
    try {
      const result = await registerService(req.body);
      return res.status(StatusCode.OK).json(presenter(result, ['SUCCESS'], true));
    } catch(err) {
      return res.status(err.statusCode).json(err);
    } 
  }

  const auth = async (req: Request, res: Response) => {
    try {
      const result = await authService(req.body);
      return res.status(StatusCode.OK).json(presenter(result, ['SUCCESS'], true));
    } catch(err) {
      return res.status(err.statusCode).json(err);
    } 
  }

  

  return {
    register,
    auth,
  }
})();

export default authController;