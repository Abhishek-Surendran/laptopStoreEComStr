import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (user,role) =>{
    try {
        
        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token

    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

export {generateToken}