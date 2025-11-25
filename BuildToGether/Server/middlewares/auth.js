const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');


async function auth(req, res, next) {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'No token' });


const token = header.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Invalid token format' });


try {
const decoded = jwt.verify(token, config.JWT_SECRET);
const user = await User.findById(decoded.id).select('-passwordHash');
if (!user) return res.status(401).json({ message: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
}


module.exports = auth;