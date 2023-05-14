const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

// Login user
exports.loginUser = async (req, res) => {
    try {
        // Check if email exist
        const { email, password } = req.body;

        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        if (!validEmail) {
            return res.status(401).json({ msg: 'Invalid email format' });
        }

        // Check if password is valid
        const validPassword = /^[\w@!$%*#?&]{8,}$/.test(password);
        if (!validPassword) {
            return res.status(401).json({ msg: 'Password must contain at least 8 characters, including only letters, numbers, and the special character "@"' });
        }

        // Check if user exist.
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'not user: Invalid email or password' });
        }

        // Check if emamil and password match
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

        // Create the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, async (err, token) => {
            if (err) throw err;
            console.log("Successfully login.");
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 60 minutes (1 hour).
            // res.cookie('token', token, { httpOnly: true, maxAge: 10000 }); // 10 seconds
            // console.log(`Token: ${token}`);
            await User.findByIdAndUpdate(user.id, { loggedOut: false });    // set loggedOut flag to false
            res.json({ token, user: payload.user });
        });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logoutUser = async (req, res) => {
    try {
        // Update the user's loggedOut property in the User model
        await User.findByIdAndUpdate(req.user.id, { loggedOut: true }, { new: true });
    
        // Insert the token into the Blacklist model
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        // console.log(`token: ${token}`);
        // console.log(`userID: ${userId}`);

        const blacklistToken = new Blacklist({ token, user: userId });

        // // const blacklistToken = new Blacklist({ token, user: req.user.id });
        // if(blacklistToken){
        //     console.log("blacklistToken is OK");
        // }

        await blacklistToken.save();
    
        // Clear the token cookie
        res.cookie("token", "", { httpOnly: true, maxAge: 0, path: "/" });
    
        // Send a success response
        console.log("User logged out successfully");
        res.json({ msg: "User logged out successfully" });

    } catch (err) {
        // console.error(err.message);
        res.status(500).send("Server error");
    }
};