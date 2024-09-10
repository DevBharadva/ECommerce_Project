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

<<<<<<< HEAD
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
=======
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
>>>>>>> d5184fb2413379b465c369c6c849e20582f2d8c3
        }
        product = await Product.findByIdAndUpdate(
            product._id,
            {$set:{isDelete:true}},
            {new:true}
<<<<<<< HEAD
        );  
        res.status(200).json({product,message:"Product Delete Success"});  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
=======
        );
        res.status(201).josn({product,msg:"Product Deleted...!"})
    } catch (error) {
        console.log(error);
        res.status(500).josn({msg:"Internal Serer error..."})
>>>>>>> d5184fb2413379b465c369c6c849e20582f2d8c3
    }
}