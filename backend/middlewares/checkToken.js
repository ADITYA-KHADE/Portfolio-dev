const jwt =require("jsonwebtoken")
const User=require("../models/auth.model")

const checkToken=async (req,res,next)=>{
    const token=req.cookies._id;
    if(!token){
        return res.status(401).send("Access Denied  - Token not provided")
    }
    try {
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).send("Access Denied  - Invalid token")
        }

        const user = await User.findById(verified.id).select("-password");

        if(!user){
            return res.status(401).send("Access Denied  - User not found")
        }

        req.user=user;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}

module.exports=checkToken
