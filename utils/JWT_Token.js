const {sign, verify} = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign({
        id: user._id, email: user.email, role: user.rola},
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
            req.user = validToken;
            return next();
        }
    } catch (err) {
        return res.status(403).json({message: "Token is not valid!"});
    }
}

const verifyAdminToken = (req,res,next) => {
    const accessToken = req.cookies["LegalneLowiskaToken"];
    if(!accessToken) return res.status(401).json({message: "User not authenticated!"});
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if(validToken && validToken.role === "admin") {
            req.authenticated = true;
            req.user = validToken;
            return next();
        } else {
            return res.status(403).json({message: "User is not an admin!"});
        }
    } catch (err) {
        return res.status(403).json({message: "Token is not valid!"});
    }
}

module.exports = { createToken, verifyToken, verifyAdminToken };
