const Address = require('../model/address.model');


exports.createaddress = async (req, res) => {

    try {
        const { isDefault } = req.body;
        const userId = req.user._id;
        if (isDefault) { await Address.updateMany({ userId }, { isDefault: false }); }
        const address = await Address.create({ userId, ...req.body });
        res.status(201).json({ message: 'Address created successfully...', address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.getuseraddresses = async (req, res) => {

    try {
        const userId = req.user._id;
        const addresses = await Address.find({ userId, isDelete: false });
        res.status(200).json(addresses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.updateaddress = async (req, res) => {

    try {
        const { addressId } = req.query;
        const userId = req.user._id;
        const { isDefault } = req.body;
        let address = await Address.findOne({ _id: addressId, userId, isDelete: false });
        if (!address) { return res.status(404).json({ message: 'Address not found...' }); }
        if (isDefault) { await Address.updateMany({ userId }, { isDefault: false }); }
        address = await Address.updateOne({ _id: addressId }, { ...req.body }, { new: true });
        res.status(200).json({ message: 'Address updated successfully...', address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.deleteaddress = async (req, res) => {

    try {
        const { addressId } = req.query;
        const userId = req.user._id;
        const address = await Address.findOne({ _id: addressId, userId, isDelete: false });
        if (!address) { return res.status(404).json({ message: 'Address not found...' }); }
        if (!userId) { return res.status(403).json({ message: 'You can not update this review...' }); }
        address.isDelete = true;
        await address.save();
        res.status(200).json({ message: 'Address deleted successfully...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.setdefaultaddress = async (req, res) => {

    try {
        const { addressId } = req.query;
        const userId = req.user._id;
        let address = await Address.findOne({ _id: addressId, userId, isDelete: false });
        if (!address) { return res.status(404).json({ message: 'Address not found...' }); }
        await Address.updateMany({ userId }, { isDefault: false });
        address.isDefault = true;
        await address.save();
        res.status(200).json({ message: 'Default address set successfully...', address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};