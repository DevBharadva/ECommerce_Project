const express = require('express');
const addressRoutes = express.Router();
const { createaddress, getuseraddresses, updateaddress, deleteaddress, setdefaultaddress } = require('../controller/address.controller');
const { verifyToken } = require("../helper/tokenVerify");


addressRoutes.post('/addaddress', verifyToken, createaddress );

addressRoutes.get('/getaddresses', verifyToken, getuseraddresses);

addressRoutes.put('/editaddress', verifyToken, updateaddress);

addressRoutes.delete('/deleteaddress', verifyToken, deleteaddress);

addressRoutes.patch('/setdefaultaddress', verifyToken, setdefaultaddress);


module.exports = addressRoutes;


//  addaddress, editaddress, deleteaddress, setdefaultaddress, getaddress