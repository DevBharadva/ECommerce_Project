const express = require('express');
const productRoutes =  express.Router();
<<<<<<< HEAD
const { addNewProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const {userverify} = require('../helper/tokenVerify')
=======
const {userverify} = require('../helper/tokenVerify')
const { addNewProduct, getAllProduct, getProduct, UpdateProduct, deleteProduct } = require('../controller/product.controller');
>>>>>>> d5184fb2413379b465c369c6c849e20582f2d8c3


/* ---------- Add Product ---------- */

productRoutes.post('/addproduct',userverify,addNewProduct)

/* --------- Get All Product---------- */

productRoutes.get('/getall',userverify,getAllProduct)

/* ---------- Get Product ------------- */

productRoutes.get('/getproduct',getProduct)

<<<<<<< HEAD
productRoutes.put('/update',updateProduct)
productRoutes.delete('/delete',userverify,deleteProduct)

module.exports = productRoutes;
=======
/* ----------- Update Product ---------- */

productRoutes.put('/updateProduct',userverify,  UpdateProduct)

/* ------------Delete Product ------------ */

productRoutes.delete('/delete',userverify,deleteProduct)

module.exports = productRoutes;
>>>>>>> d5184fb2413379b465c369c6c849e20582f2d8c3
