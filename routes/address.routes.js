const express = require('express');
const addressRoutes = express.Router();
const { createaddress, getuseraddresses, updateaddress, deleteaddress, setdefaultaddress } = require('../controller/address.controller');
const { userverify } = require("../helper/tokenVerify");


addressRoutes.post('/addaddress' ,userverify, createaddress );

addressRoutes.get('/getaddresses' ,userverify, getuseraddresses);

addressRoutes.put('/editaddress' ,userverify, updateaddress);

addressRoutes.delete('/deleteaddress' ,userverify, deleteaddress);

addressRoutes.patch('/setdefaultaddress' ,userverify, setdefaultaddress);

module.exports = addressRoutes;

//  addaddress, editaddress, deleteaddress, setdefaultaddress, getaddress