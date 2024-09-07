const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

exports.userverify = async(req,res,next)=>{
       try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            return res.json({msg:"Not authorized"})
        }
        let token = authorization.split(" ")[1];
        let {userId} = await jwt.verify(token,process.env.SECRET_KEY);
        if(!userId){
            return res.status(401).json({msg:"unauthorized"});
        }
        let user = await  User.findOne({_id:userId,isDelete:false});
        if(!user){
            return res.status(404).json({_id:userId,isDelete:false});
        }
        req.user = user;
        next();
       } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Server Error"})
       }
}