import User from '../database/models/User';
import { generateJWT } from '../utils/jwt-generator';
import { validatePassword } from '../utils/bcryptjs';

const loginController = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if user exist in DB
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: 'Unregistered user'
            });
        }

        // Check Password
        const validPassword = validatePassword(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                status: 400,
                msg: 'Incorrect password'
            });
        }

        // Create JWToken and resply
        const token = await generateJWT(user.id, user.role);
        
        return res.status(200).json({
            status: 200,
            token
        });

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    loginController
}
