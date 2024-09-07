const express = require('express');
const productRoutes =  express.Router();
const { addNewProduct, getAllProduct, getProduct } = require('../controller/product.controller');

productRoutes.post('/addproduct',addNewProduct)

productRoutes.get('/getall',getAllProduct)
productRoutes.get('/getproduct',getProduct)

module.exports = productRoutes;