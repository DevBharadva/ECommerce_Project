const Cart = require('../model/cart.model');

class cartService {
    /* Add to Cart */

    async cartCreate (body){
            return await Cart.create(body)
    };

    async getCart (body){
        return await Cart.findOne(body);
    };

    async getAllCarts(body){
        return await Cart.find(body)
    };

    async UpdateCart(body){
        return await Cart.findByIdAndUpdate(id,{$set:body},{new:true})
    }
    }


