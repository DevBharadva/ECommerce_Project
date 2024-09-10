const express = require('express');
const favoriteRoutes = express.Router();
const {  userverify } = require('../helper/tokenVerify');

favoriteRoutes.post('/add-favorite',userverify,addFavorite)
favoriteRoutes.delete('/delete-favorite/',userverify,deleteFavorite)

module.exports = favoriteRoutes;