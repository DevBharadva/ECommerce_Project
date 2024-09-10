const User = require('../model/user.model');

class UserServices {

    /* ----------addNewUser Services------- */

    async addNewUser(body) {
        return await User.create(body);
    };

    /* ----------getAllUser Services------- */

    async getAllUser(body) {
        return await User.find(body);
    };

    /* ----------getUser Services------- */

    async getUser(body) {
        return await User.findOne(body);
    };

    /* ----------UpdateUser Services------- */
    async UpdateUser(body){
        return await User.findByIdAndUpdate(id,{$set:body},{new:true});
    }
};

module.exports = UserServices;
