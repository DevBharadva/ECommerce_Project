const wishlsit = require('../model/wishlist.model')
const Product = require('../../model/product.model');

exports.addFavorite = async(req,res)=>{
    try {
        let {product_item} = req.body;
        let product = await Product.findById(product_item)
        if (!product) {
           return res.json({message:"product is not in favorite list..."});
        }
        let favorite = await wishlsit.favFindOne({product_item:req.body.product_item,user:req.user._id});
        if (favorite) {
            return res.json({message:"items is already exist in list..."});
        }
        favorite = await wishlsit.favCreate({
            ...req.body,
            user:req.user._id,
        });
        favorite.save();
        res.status(201).json({message:"item is added in favorite list",favorite});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

exports.deleteFavorite = async(req,res)=>{
    try {
        let id = req.params.id;
        let favorite = await wishlsit.findOne({_id:id,user:req.user._id,isDelete:false});
        if (!favorite) {
            return res.json({message:'user has does not in favorite list...'});    
        }
        favorite = await wishlsit.findOneAndUpdate(
            {_id:id},
            {$set:{isDelete:true}},
            {new:true}
        )
        favorite.save();
        res.json({message:'product item is deleted in favorite list',favorite});    

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}