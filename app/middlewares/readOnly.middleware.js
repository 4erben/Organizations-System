const User = require("../models/users.model");

const checkReadOnlyAccess = async(req,res,next)=>{
    const userId = req.user._id;
    try{
        const user = await User.findById(userId);
        //check if user exists 
        if(!user){
            return res.status(403).json({ message: 'Access denied.' });
        }
        //check user permission
        if(user.access_level === "read-only"){
            return res.status(403).json({ message: 'Insufficient permissions.' });
        }
        next();
    }catch(err){
        res.status(500).json({ message: 'An error occurred while checking access.', error: err.message });
    }
}

module.exports = checkReadOnlyAccess;