const isAdmin = (req,res,next)=>{
    if(req.role !== "admin"){
        res.status(501).json({sucess:false,massage:"Only Admin can access this"});
    }
    next();
}
module.exports = isAdmin;