const express =  require('express');
const userRoutes = express.Router();
const { singup, signin, getallusers, getUser } = require('../controller/user.controller');
// const userverify = require('../helper/tokenVerify')
const upload = require('../helper/userimage')

/* -------User => Register----- */
userRoutes.post('/register', upload.single('ProfileImage'),singup)

/* -------User => Register----- */
userRoutes.post('/login', signin)

/* -------Get All => Users ----- */

userRoutes.get('/getAll',getallusers)

/* Get => User */

userRoutes.get('/getuser',getUser)

module.exports = userRoutes