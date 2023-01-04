const bcrypt = require('bcryptjs');

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const validatePassword = (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword);
};

module.exports = {
    encryptPassword,
    validatePassword
}
