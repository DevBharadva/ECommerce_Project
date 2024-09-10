const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    item:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
            },
            totalAmount:Number
        }
    ],
    totalPrice:{
        type:Number
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},
{
    versionKey:false,
    timestamps:true
});

module.exports= mongoose.model('orders',orderSchema)