import { Router } from 'express';
import { userValidator } from '../validators/user-validator';
import { createUser } from '../controllers/user';
import { validateJWT } from '../utils/jwt-generator';
const router = Router();

// router.post('/create', isSuperAdmin, userValidator, createUser);

// Is admin check when validate JW Token, if not return res

router.post('/create', userValidator, validateJWT, createUser);

module.exports = router;
