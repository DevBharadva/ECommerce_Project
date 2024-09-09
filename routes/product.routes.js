const express = require('express');
const productRoutes =  express.Router();
const {userverify} = require('../helper/tokenVerify')
const { addNewProduct, getAllProduct, getProduct, UpdateProduct, deleteProduct } = require('../controller/product.controller');


/* ---------- Add Product ---------- */

productRoutes.post('/addproduct',userverify,addNewProduct)

/* --------- Get All Product---------- */

productRoutes.get('/getall',userverify,getAllProduct)

/* ---------- Get Product ------------- */

productRoutes.get('/getproduct',getProduct)

/* ----------- Update Product ---------- */

productRoutes.put('/updateProduct',userverify,  UpdateProduct)

/* ------------Delete Product ------------ */

productRoutes.delete('/delete',userverify,deleteProduct)

module.exports = productRoutes;