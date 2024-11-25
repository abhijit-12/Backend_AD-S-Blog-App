const jwt = require('jsonwebtoken');

const JWT_TOKEN = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
   try {
    // const token = req.cookies.token;
    const token = req.headers.authorization?.split(' ')[1]; //barear Authorization token
    if (!token) {
        return res.status(401).json({message:"no token provided"});
    }
    const decoded = jwt.verify(token,JWT_TOKEN);
    if (!decoded) {
        return res.status(401).json({message:"invalid token provided"});
    }
    req.userId = decoded;
    req.role = decoded.role;
    next();
   } catch (error) {
    console.log("Error Token verify",error);
    res.status(500).json({message:"invalid token",error});
   }
}

module.exports = verifyToken;

