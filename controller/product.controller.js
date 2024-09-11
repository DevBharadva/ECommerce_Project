const Product = require('../model/product.model');  // Ensure correct import path


/* -------------Add new Product--------- */

exports.addNewProduct = async (req, res) => {
    try {
        let product = await Product.findOne({ productName: req.body.title, isDelete: false });

        if (product) {
            return res.status(400).json({ msg: "Product Already Exists..." });
        }

        product = await Product.create({ ...req.body });

        res.status(201).json({ msg: "Product added successfully",product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

/* ------------get all products---------- */

exports.getAllProduct = async(req,res)=>{
    try {
        
        let product = await Product.find()
        if(!product){
            res.status(404).json({msg:"Product is Not Found"})
        }
        res.status(201).json(product)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:"Internal Server Error"})
        
    }
}

/* ------------get  product---------- */

exports.getProduct = async  (req,res)=>{
    try {
        let product = await Product.findById(req.query.id)
        if(!product){
            res.status(404).json({msg:"Product is Not Avaliable"});
        }
        res.status(201).json(product)  
    } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal Server Error"})
}

}

/* --------------Update Product --------------- */

exports.updateProduct = async (req,res)=>{
    try {
        let product = await Product.findOne({_id:req.query.productId});
        if(!product){
            return res.status(404).json({message:'Product not Found...'});
        }
        product = await Product.updateOne({_id:req.query.productId},{$set:req.body},{new:true});
        res.status(202).json({product,message:"Product Update Success...."})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

/* ---------------product remove-------------- */

exports.deleteProduct =  async (req,res)=>{
    try {
        let product = await Product.findOne({_id:req.params.userId},{isDelete:false});
        if(!product){
            return res.status(404).json({message:"Product Not Found..."});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"Internal Server Error"})
    }
}
            /* ------------Update  product---------- */

exports.UpdateProduct = async(req,res)=>{
    try {
        let product = await Product.findOne({_id:req.query.productid});
        if(!product){return res.status(404).json({msg:"Product not found..."})};
        
        product = await Product.updateOne({_id:req.query.productid},{isDelete:false});

        res.status(202).json({product, msg:"product Update Success..."});
    } catch (error) {
        console.log(error);
        res.stauts(500).json({msg:"Internal Server Error"})
    }
}

/* ------------- Delete Product----------------- */

exports.deleteProduct = async(req,res)=>{
    try {
        let product = await Product.findOne({_id:req.query.userId},{isDelete:false});
        if(!product){
            return res.status(404).json({msg:"Product Not found..."});
        }
        product = await Product.findByIdAndUpdate(
            product._id,
            {$set:{isDelete:true}},
            {new:true}
        );  
        res.status(200).json({product,message:"Product Delete Success"});  
    } catch (error) {
        console.log(error);
        res.status(500).josn({msg:"Internal Serer error..."})
    }
}

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