const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const path = require("path");
const JsonWebToken = require("jsonwebtoken");
const userservices = require("../services/user.service");
const userservice = new userservices();

/* ----------------------User Registration------------------------- */

exports.singup = async (req, res) => {
  try {
    let imagePath = "";
    let user = await userservice.findOne({
      email: req.body.email,
      isDelete: false,
    });
    if (user) {
      return res.json({ msg: "user is aleardy exists..." });
    }

    console.log("Password:", req.body.password); // Debugging line
    console.log("profileimagew:", req.body.ProfileImage); // Debugging line

    let hashPassword = await bcrypt.hash(req.body.password, 10);
    user = await userservice.addNewUser({
      ...req.body,
      password: hashPassword,
    });
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/");
    }
    console.log("user", user);
    if(req.file){
      imagePath = req.file.path.replace(/\\/g,"/");
  }
    user = await User.create({
      ...req.body,
      password: hashPassword,
      ProfileImage : imagePath
    })
    console.log("user",user);
    user.save();
    res.status(201).json({ msg: "User is register", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

/* ----------------------User Login------------------------- */

exports.signin = async (req, res) => {
  try {
    let user = await userservice.getUser({
      email: req.body.email,
      isDelete: false,
    });
    if (!user) {
      return res.status(400).json({ msg: "user is not found" });
    }
    let checkpassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkpassword) {
      return res.json({ msg: "password is not match..." });
    }
    let token = await JsonWebToken.sign(
      { userId: user._id },
      process.env.SECRET_KEY
    );
    res.status(200).json({ msg: "user Login Success", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
};

/* ----------------------Get All Users ------------------------- */

exports.getallusers = async (req, res) => {
  try {
    let users = await userservice.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal Server error" });
  }
};

/* ----------------------Get User ------------------------- */

exports.getUser = async (req, res) => {
  try {
    let user = await userservice.findById(req.query.userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal Server error" });
  }
};

/* ------------Update User------------- */

exports.updateUser = async (req, res) => {
  try {
    let user = await userservice.UpdateUser(req.user._id, { ...req.body });
    user.save();
    res.status(201).json({ message: "user is updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error..." });
  }
};

/* -------------Delete user------------- */

exports.deleteUser = async(req, res)=>{
  try {
     let user = await userservice.UpdateUser(
      user._id,
      {$set:{isDelete:true}},
      {new:true}
      )
      res.status(201).json({message:"user is deleted...",user});
  } 
  catch (error) {
      console.log(error);
      res.status(500).json({message:"internal server error"});
  }
}

/* ----------------------Update Users ------------------------- */

exports.updateUser = async(req,res)=>{
  try {
    let user = req.user;
    user =  await User.findByIdAndUpdate(
        user._id,
        {$set: req.body},
        {new:true}
      )
      user.save();
      res.status(201).json({msg:"User Updated...",user})
  } catch (error) {
    console.log(error);
    res.status(500).josn({msg:"Internal Server Error"})
  }
}

/* ---------------------- LogOut Users ------------------------- */

exports.logout = async(req,res)=>{
  try {
    let user = req.user;

      // res.redirect('/api/user/login')
      res.status(202).json({user,msg:"user logut, reset token "});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal Server Error"})
  }
}

/* ------------------- Changed  Password ------------------- */

exports.Changepassword = async(req,res)=>{
  try {
      let {old_password,new_password,confirm_password} = req.body;
      let checkPassword = await bcrypt.compare(old_password,req.user.password);
      if (!checkPassword) {
          res.json({message:"password is incorrect..."});
      }
      if (new_password != confirm_password) {
          res.json({message:"not match confirm password..."})
      }
      let hashPassword = await bcrypt.hash(new_password,10);
      new_password = await User.findByIdAndUpdate(
          req.user._id,
          {$set:{password:hashPassword}}
      )
      res.json({message:"password is updated",new_password});
  }
  catch (error) {
      console.log(error);
      res.status(500).json({message:"internal server error"});
  }
}