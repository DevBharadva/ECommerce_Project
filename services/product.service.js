const Product = require('../model/product.model');

class Productservices {

    /* ----------Add New Product Services------- */

    async addNewProduct(body) {
        return await Product.create(body);
    };

    /* ----------get Product Services------- */
    
    async getProduct(body) {
        return await Product.findOne(body);
    };

    /* ----------get All Product Services------- */

    async getAllProducts(body) {
        return await Product.find(body);
    };

    /* ----------update Product Services------- */

    async UpdateProduct(body){
        return await Product.findByIdAndUpdate(id,{$set:body},{new:true});
    }


};

module.exports = Productservices;

//add, get ,getAll,update
