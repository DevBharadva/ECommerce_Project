const express = require('express');
const productRoutes =  express.Router();
const { addNewProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const {userverify} = require('../helper/tokenVerify')


/* ---------- Add Product ---------- */

productRoutes.post('/addproduct',userverify,addNewProduct)

/* --------- Get All Product---------- */

productRoutes.get('/getall',userverify,getAllProduct)

/* ---------- Get Product ------------- */

productRoutes.get('/getproduct',getProduct)

/* ----------- Update Product ---------- */

productRoutes.put('/update',updateProduct)

/* ------------Delete Product ------------ */

productRoutes.delete('/delete',userverify,deleteProduct)

/* ---------- Add Revivew in Product ---------- */

// productRoutes.post('/addrevivew',userverify,addReview)

module.exports = productRoutes;
