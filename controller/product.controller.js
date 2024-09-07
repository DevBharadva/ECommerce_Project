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