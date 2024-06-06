import { Router } from 'express';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import User from '../models/userModel.js';
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        console.log('User saved:', user);  // Log the saved user
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log('Token created:', token);  // Log the created token

        res.status(201).json({ token });
    } catch (err) {
        console.error('Error during signup:', err);  // Improved logging
        res.status(500).send('Error creating user');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {    
        console.error('Error during login:', err);    
        res.status(500).send('Error logging in');
    }
});

export default router;
