const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const ResetPassword = require('../models/ResetPassword');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log("Fetched users from API")
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 
// Create or register user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
        });
        await user.save();
        console.log("Registered successfully.");
        res.json({message : "Registered successfully.", user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Registration failed: ' + err.message);
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userFields.password = await bcrypt.hash(password, salt);
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        await user.deleteOne();
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}; 

// Send reset password email
exports.sendResetPasswordEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User with that email not found' });
        }
        const resetPassword = new ResetPassword({ user: user.id });
        await resetPassword.save();
        const token = jwt.sign(
            { resetPasswordId: resetPassword.id },
            process.env.JWT_RESET_PASSWORD_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Token sent.")
        console.log(`Reset Token: ${token}`);
        // TODO: send email with reset password link containing token
        res.json({ msg: 'Reset password email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { resetPasswordId } = jwt.verify(req.params.token, process.env.JWT_RESET_PASSWORD_SECRET);
        const resetPassword = await ResetPassword.findById(resetPasswordId);
        if (!resetPassword) {
            return res.status(400).json({ msg: 'Invalid reset password token' });
        }
        const user = await User.findById(resetPassword.user);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        await resetPassword.deleteOne();
        console.log("Password reset successful");
        res.json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};