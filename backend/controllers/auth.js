const User = require('../models/auth.model')
const authTokenGenerate=require("../security/generateToken")

const signup =async(req, res) => {
    try {
       const {fullname,email,password}=req.body;

       const user=await User.findOne({email});

       if(user){
            return res.status(400).json({message:"Username already exists"})
       }        

        const newUser =new User({
              fullname,
              email,
              password
        })

        await newUser.save();
        if(newUser){
            authTokenGenerate(newUser._id,res);
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                message:"User registered successfully"})
        }else{
            res.status(400).json({message:"User not registered"})
        }

    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
}

const login = async(req, res) => { 
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        if(user.password!==password){
            return res.status(400).json({message:"Invalid credentials"})
        }
        authTokenGenerate(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            message:"User logged in successfully"})
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie('_id');

        // const {id}=req.body;
        // authTokenGenerate(user._id,res);
        
        res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getToken = async (req, res) => {
    try {
      const {id}=req.body;
      authTokenGenerate(id, res);
      res.status(200).json({ message: "Token generated successfully" });
      } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message, "getToken");
      }
  }
module.exports = {
    signup,
    login,
    logout,
    getToken
}
