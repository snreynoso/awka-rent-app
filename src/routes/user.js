import { Router } from 'express';
import { userValidator } from '../validators/user-validator';
import { validateJWT } from '../utils/jwt-generator';
import {
    createUser,
    getAllUsers,
    getUserById,
    // updateUser,
    deleteUser
} from '../controllers/user';

const router = Router();

router.post('/create'  , userValidator, validateJWT, createUser);
router.get('/get-all'  , validateJWT, getAllUsers);
router.get('/get'      , validateJWT, getUserById);
// router.post('/update' , userValidator, validateJWT, updateUser);
router.delete('/delete', validateJWT, deleteUser);

module.exports = router;
