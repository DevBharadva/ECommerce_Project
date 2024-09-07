const User = require("../model/user.model");
const bcrypt = require('bcrypt')
const path = require('path')
const JsonWebToken = require('jsonwebtoken')

/* ----------------------User Registration------------------------- */

exports.singup = async (req, res) => {
  try {
    let imagePath = "";
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (user) {
      return res.json({ msg: "user is aleardy exists..." });
    }
    
    console.log('Password:', req.body.password); // Debugging line
    console.log('profileimagew:', req.body.ProfileImage); // Debugging line
    
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    user = await User.create({
      ...req.body,
      password: hashPassword,
    })
    if(req.file){
      imagePath = req.file.path.replace(/\\/g,"/");
  }
    console.log("user",user);
    user.save();
    res.status(201).json({ msg: "User is register", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


/* ----------------------User Registration------------------------- */

exports.signin = async (req,res)=>{
  try {
      let user = await User.findOne({email:req.body.email, isDelete:false})
      if(!user){
        return res.status(400).json({msg:"user is not found"})
      }
      let checkpassword = await bcrypt.compare(req.body.password,user.password)
      if(!checkpassword){
        return res.json({msg:"password is not match..."});
      }
      let token = await JsonWebToken.sign({userId:user._id},process.env.SECRET_KEY)
      res.status(200).json({msg:"user Login Success",token});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal Server error"})
  }
}

/* ----------------------Get All Users ------------------------- */

exports.getallusers = async(req,res)=>{
   try {
        let users = await User.find({isDelete:false});
        res.status(200).json(users)
   } catch (error) {
       console.log(error);
       res.stauts(500).json({msg:"internal Server error"})
   }
}

/* ----------------------Get User ------------------------- */

exports.getUser = async(req,res)=>{
  try {
       let user = await User.findById(req.query.userId);
       if(!user){
          res.status(404).json({msg:"User not found"})
       }
       res.status(200).json(user)
  } catch (error) {
      console.log(error);
      res.status(500).json({msg:"internal Server error"})
  }
}