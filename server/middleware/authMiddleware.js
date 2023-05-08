const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied: missing token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request object
        req.user = decoded.user;
        // req.user = user.findById(decode.id).select('-password')

        // Continue with the next middleware or route handler
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Authorization denied: invalid token' });
    }
};