import User from '../database/models/User';
import { encryptPassword } from '../utils/bcryptjs';

const createUser = async (req, res) => {

    const { userRole } = req.payloadToken;

    if (userRole !== 0) {
        return res.status(401).json({
            status: 401,
            msg: 'Unauthorized user...'
        });
    }

    // TODO Check if user with same email already exits

    const { name, email, password, role } = req.body;
    const encryptedPassword = encryptPassword(password);
    const newUser = new User({ name, email, password: encryptedPassword, role });
    const savedUser = await newUser.save();

    return res.status(200).json({
        status: 200,
        msg: 'User created!'
    });
};

// TODO READ Controller

// TODO UPDATE Controller

// TODO DELETE Controller

module.exports = {
    createUser
}
