import express from 'express';

const router = express.Router();
import authController from '~/controllers/auth.controllers';

router.post('/register', authController.register)
router.post('/', authController.auth)

export default router;