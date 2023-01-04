import { check } from 'express-validator';
import { validateFields } from '../middlewares/field-validation';

const loginValidator = [
    check('email', 'Email is empty').not().isEmpty(),
    check('email', 'Email is not valid' ).isEmail(),
    check('password', 'Password is empty').not().isEmpty(),
    validateFields
];

module.exports = {
    loginValidator
}
