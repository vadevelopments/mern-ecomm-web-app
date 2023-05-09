const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

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
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, async (err, token) => {
            if (err) throw err;
            console.log("Successfully login.");
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            console.log(token);
            await User.findByIdAndUpdate(user.id, { loggedOut: false });
            res.json({ token, user: payload.user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//logout user
exports.logoutUser = async (req, res) => {
    try {
        console.log(Blacklist.db.name); //Check if Blacklist is connected to database 
        console.log(req.user.id); // Check if userID is same with the user that is currently logged in.
        await User.findByIdAndUpdate(req.user.id, { loggedOut: true });
        console.log(req.cookies);
        const token = req.cookies.token;
        console.log('Token before clearing:', token);
        const decodedToken = jwt.decode(token);
        const blacklistToken = new Blacklist({ token, user: req.user.id });
        await blacklistToken.save();
        res.cookie('token', '', { httpOnly: true, maxAge: 0, path: '/' }); // Clear the token cookie
        console.log('Token after clearing:', req.cookies.token); //Need fix, still having token after clearing  =============================================
        console.log('User logged out successfully');
        res.json({ msg: 'User logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
