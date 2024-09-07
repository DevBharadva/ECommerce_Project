const mongoose = require('mongoose')

const ProductSchema =  mongoose.Schema({
    productImage:String,
    title:{
        type:String,
        require:true
    },
    ProductPrice:{
        type:Number,
        require:true
    },
    Quntity:{
        type:Number
    },
    Validity:{
        type:String
    },
    Rating:{
        type:String
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

module.exports  = mongoose.model("products",ProductSchema);