const {sign, verify} = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign({
        id: user._id, email: user.email},
        process.env.JWT_SECRET);
    return accessToken;
}

const verifyToken = (req,res,next) => {
    const accessToken = req.cookies["LegalneLowiskaToken"];
    if(!accessToken) return res.status(401).json({message: "User not authenticated!"});
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if(validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(403).json({message: "Token is not valid!"});
    }
}

module.exports = { createToken, verifyToken };
