import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js'
import mongoose from 'mongoose';




export const signup = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        const savedUser = await user.save();

        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        res.status(201).json({ message: 'User created successfully', data: userWithoutPassword });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password. Try again' });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: 'User is deactivated. Contact admin' });
        }

        const token = generateToken(user, user.role)
        res.cookie("token", token)


        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

export const userProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const checkUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'User is authenticated' });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password: _, ...userWithoutPassword } = updatedUser.toObject();

        res.status(200).json({ message: 'User updated successfully', data: userWithoutPassword });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const deactivateUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deactivated successfully', data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users fetched successfully', data: users });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};