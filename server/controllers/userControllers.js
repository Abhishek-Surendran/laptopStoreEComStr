import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/generateToken.js'




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

        res.status(201).json({message: 'User created successfully', data: userWithoutPassword});

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


        return res.status(200).json({ message: 'Login successful'});
    }catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

export const userProfile = async (req, res) => {

    try {
        
        const userId = req.user.id;
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
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true});
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};