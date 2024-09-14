const Revivew = require('../model/revivew.model');

/* -------------- Add Product revivew -------------------- */

exports.addReview = async(req,res)=>{
    try {
        let {Rating} = req.body;
        let product = await Product.findById(req.params.id);
        const alreadyReviewed = product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            return res.status(400).json({message:"user already reviewd"});
        }
        const review = {
            name:req.user.name,
            Rating:Number(Rating),
            user:req.user._id
        }
        product.reviews.push(review),
        product.numReviews = product.reviews.length

        product.Rating = product.reviews.reduce((total,item)=> item.Rating + total,0) /  product.reviews.length
        await product.save();
        res.status(201).json({message:"review added"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

/* --------------------- get Revivew ------------------------ */
exports.getReview = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        const getReview = product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
            return res.status(400).json(getReview); 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

/* ---------------------get All Revivew ----------------------- */

exports.getAllReview = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        const allReview = product.reviews;
        return res.json({message:"all users review",allReview});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

/* -----------------Update Revivew ------------------ */

exports.updateReview = async(req,res)=>{
    try {
        let {rating} = req.body;
        
        let product  = await Product.findById(req.params.id);
        if (!product) {
            return res.json({message:"product is not available"});
        }
        let reviews = product.reviews;
        let getReview = product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
        if (getReview === -1) {
            res.json({message:"review not found"});
        }
        getReview.rating  = Number(rating),
        product.rating = reviews.reduce((total,item)=> item.rating + total,0) /  product.reviews.length
        await product.save();
        res.json({message:"updated",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

/* -------------------- Delete Product Revivew ------------------*/


exports.deleteReview = async(req,res)=>{
    try {
        let product  = await Product.findById(req.params.id);
        if (!product) {
            return res.json({message:"product is not available"});
        }
        let reviews = product.reviews;
        let getReview = product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
        if (getReview === -1) {
            res.json({message:"review not found"});
        }
        getReview = {$set:{isDelete:true}}
        product.rating = reviews.reduce((total,item)=> item.rating + total,0) /  product.reviews.length
        await product.save();
        res.json({message:"deleted",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}