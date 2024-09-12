const express = require('express');
const { addNewOrder,deleteOrder } = require('../controller/order.controller');
const {userverify}= require('../helper/tokenVerify')
const orderrotues = express.Router();



orderrotues.post('/order',userverify,addNewOrder)

orderrotues.delete('/delete',userverify,deleteOrder);

module.exports = orderrotues;