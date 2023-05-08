const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'not user: Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'not matched: Invalid email or password' });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};