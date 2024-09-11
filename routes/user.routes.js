const express =  require('express');
const userRoutes = express.Router();
const { singup, signin, getallusers, getUser, logout, updateUser, Changepassword } = require('../controller/user.controller');
const {userverify} = require('../helper/tokenVerify')
const {upload} = require('../helper/userimage')

/* -------User => Register----- */
userRoutes.post('/register', upload.single('ProfileImage'),singup)

/* -------User => Register----- */
userRoutes.post('/login', signin)

/* -------Get All => Users ----- */

userRoutes.get('/getAll',getallusers)

/* Get => User */

userRoutes.get('/getuser',getUser)

/* Put => Update User */
userRoutes.put('/updateuser',userverify,updateUser)

/* Put => Change Password */
userRoutes.put('/change',userverify,Changepassword)

/* Delete => LogOut User */
userRoutes.delete('/logout',userverify,logout)


module.exports = userRoutes