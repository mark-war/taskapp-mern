import pkg from 'jsonwebtoken'
const { verify } = pkg
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
const JWT_SECRET = process.env.JWT_SECRET;

// const authorize = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Access denied');
    
//     try {
//         const verified = verify(token, JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid token');
//     }
// }

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
});

export { protect };
