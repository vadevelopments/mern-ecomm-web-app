const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
  
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