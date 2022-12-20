// const User = require('../database/DBmodels/user');
// const { generateJWT } = require('../helpers/generate-jwt');
// const sendEmail = require('../helpers/send-grid');

export const register = async (req, res) => {
    res.send('Respuesta controlador auth');

    // const { ...data } = req.body;
    // try {
    //     await User.create(data); // Save in DB

    //     // Send wellcome email
    //     sendEmail(data.email);

    //     res.json({
    //         msg: `User ${data.name} created!`
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         msg: error.errors[0].message
    //     })
    // }
};
