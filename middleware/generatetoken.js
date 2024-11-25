const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');
const JWT_TOKEN = process.env.JWT_SECRET_KEY;

const generateToken = async (userId)=>{
    try {
        const user = await User.findById(userId);
        if (!user){
            throw new Error('User not found');
        }
        const token = jwt.sign({userId : user.id, role : user.role},JWT_TOKEN,{expiresIn: '1h'})
        return token;
    } catch (error) {
        console.log("Error generating token",error);
        throw error;
    }
}

module.exports = generateToken;