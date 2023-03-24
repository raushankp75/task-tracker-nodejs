const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const login = async (req, res) => {
    // console.log(req)
    const { email, password } = req.body;
    // console.log(req.body, "req.body 14")

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }


    // Check if the user exists

    try {
        // Check if the user exists in the user model
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User is not Registered' });
        }

        // console.log(user, 23)
        // Check if the password is correct
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } else {

            const payload = { id: user._id, role: user.role };
            const token = jwt.sign(payload, "SECRETKEY", { expiresIn: '2d' });

            return res.status(200).json({ success: true, message: 'Login successful', token, role: user.role, email: user.email });
        }

    } catch (error) {
        console.log(error, 34)
    }

}


module.exports = { login };