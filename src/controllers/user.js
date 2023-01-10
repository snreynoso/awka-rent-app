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

    const userEmail = req.body.email;
    const checkUser = await User.exists({ email: userEmail });

    if (checkUser) {
        return res.status(400).json({
            status: 400,
            msg: 'User with that email has already registered'
        });
    }

    const { name, email, password, role } = req.body;
    const encryptedPassword = encryptPassword(password);
    const newUser = new User({ name, email, password: encryptedPassword, role });
    const createdUser = await newUser.save();

    return res.status(200).json({
        status: 200,
        msg: `User ${createdUser.name} was created`
    });
};

const getAllUsers = async (req, res) => {

    const { userRole } = req.payloadToken;

    if (userRole !== 0) {
        return res.status(401).json({
            status: 401,
            msg: 'Unauthorized user...'
        });
    }

    const allUsers = await User.find().select('id name email role');

    return res.status(200).json({
        status: 200,
        allUsers
    });
};

const getUserById = async (req, res) => {

    const { userRole } = req.payloadToken;

    if (userRole !== 0) {
        return res.status(401).json({
            status: 401,
            msg: 'Unauthorized user...'
        });
    }

    const userId = req.body.id;
    const user = await User.findById(userId).select('id name email role');

    return res.status(200).json({
        status: 200,
        user
    });
};

const updateUser = async (req, res) => {

    const { userRole } = req.payloadToken;

    if (userRole !== 0) {
        return res.status(401).json({
            status: 401,
            msg: 'Unauthorized user...'
        });
    }

    const user = req.body.user;
    const filter = { _id: user._id };
    let update = user.fieldsToUpdate;

    if(update.password) {
        const encryptedPassword = encryptPassword(update.password);
        update.password = encryptedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(filter, update, { new: true }).select('name');

    console.log(updatedUser)

    return res.status(200).json({
        status: 200,
        msg: `User ${updatedUser.name} updated!`
    });
};

const deleteUser = async (req, res) => {

    const { userRole } = req.payloadToken;

    if (userRole !== 0) {
        return res.status(401).json({
            status: 401,
            msg: 'Unauthorized user...'
        });
    }

    const userId = req.body.id;
    const userDeleted = await User.findByIdAndDelete(userId).select('name');

    return res.status(200).json({
        status: 200,
        msg: `User ${userDeleted.name} was deleted`
    });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
