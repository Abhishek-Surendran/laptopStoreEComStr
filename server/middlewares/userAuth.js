import  jwt  from "jsonwebtoken";


const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded
        
        next()
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

export default userAuth