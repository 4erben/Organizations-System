const jwt = require("jsonwebtoken");


function generateAccessToken(user){
    return jwt.sign(
        {userId: user.id, access_level: user.access_level,orgId: user.orgId },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
    );
}

function generateRefreshToken(user){
    return jwt.sign(
        {userId: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRATION}
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};