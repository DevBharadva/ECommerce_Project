const express = require('express');
const {addReview, getReview} = require('../controller/review.controller')
const {userverify} = require('../helper/tokenVerify')
const reviewRoutes = express.Router();

reviewRoutes.post("/addreview" ,userverify, addReview);

reviewRoutes.get("/getrevivew",userverify,getReview)

module.exports = reviewRoutes;