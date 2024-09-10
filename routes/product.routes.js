const express = require('express');
const productRoutes =  express.Router();
const { addNewProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const {userverify} = require('../helper/tokenVerify')

productRoutes.post('/addproduct',addNewProduct)

productRoutes.get('/getall',getAllProduct)
productRoutes.get('/getproduct',getProduct)

productRoutes.put('/update',updateProduct)
productRoutes.delete('/delete',userverify,deleteProduct)

module.exports = productRoutes;
