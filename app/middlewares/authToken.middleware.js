const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(403).json({message:"Request is not authorized"});
    const token = authHeader && authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const {access_level , userId , orgId} = payload;
        const user = {access_level:access_level,_id: userId , orgId: orgId};
        req.user = user;
        next();
    }catch(error){
        res.status(403).json({message:error.message});
    }
}

module.exports = authenticateToken;