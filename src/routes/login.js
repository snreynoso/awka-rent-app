import { Router } from 'express';
import { loginValidator } from '../validators/login-validator';
import { loginController } from '../controllers/login';

const router = Router();

router.post('/', loginValidator, loginController);

module.exports = router;
