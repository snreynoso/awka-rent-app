const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors
        });
    }
    next();
}

module.exports = {
    validateFields
}