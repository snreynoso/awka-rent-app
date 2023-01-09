import { check } from 'express-validator';
import { validateFields } from '../middlewares/field-validation';

const userValidator = [
    check('name', 'Name is empty').not().isEmpty(),
    check('email', 'Email is empty').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is empty').not().isEmpty(),
    check('role', 'Role is empty').not().isEmpty(),
    check('role', 'Role is not a number').isNumeric(),
    validateFields
];

module.exports = {
    userValidator
}
