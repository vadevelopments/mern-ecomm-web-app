const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
  
    // Check if token is missing
    if (!token) {
        return res.status(401).json({ error: 'Authorization denied: missing token' });
    }

    // Check if token has been cleared
    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ msg: 'Authorization denied: token has been cleared' });
    }
  
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // Check if user has logged out
        const user = await User.findById(decoded.user.id);
        if (user.loggedOut) {
            return res.status(401).json({ msg: 'Authorization denied: user has logged out' });
        }
    
        // Add user to request object
        req.user = decoded.user;
    
        // Continue with the next middleware or route handler
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: 'Authorization denied: invalid token' });
    }
};  