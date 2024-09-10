const express = require('express');
const { addToCart, getAllCart, updateCart } = require('../controller/cart.controller');
const cartRotues = express.Router();
const { userverify } = require('../helper/tokenVerify')

/*  */

/* ---------- Add To Cart ------------- */

cartRotues.post('/addtocart',userverify,addToCart)

/* ---------- Get All Carts ----------- */

cartRotues.get('/getAll',getAllCart)

/* -----------Update Product --------------- */

cartRotues.put('/update',userverify,updateCart)

module.exports = cartRotues;