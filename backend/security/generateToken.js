const jwt=require("jsonwebtoken")

const authTokenGenerate=(id,res)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
    const cookieExpireMilliseconds = parseInt(process.env.JWT_COOKIE_EXPIRE, 10);
    res.cookie("_id",token,{
        expires: new Date(Date.now() + cookieExpireMilliseconds),
        httpOnly:true
    })
}

module.exports=authTokenGenerate