const express = require('express');
const { addNewOrder } = require('../controller/order.controller');
const {userverify}= require('../helper/tokenVerify')
const orderrotues = express.Router();



orderrotues.post('/order',userverify,addNewOrder)