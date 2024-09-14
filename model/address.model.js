const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    isDefault:{
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('addresses', addressSchema);