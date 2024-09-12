const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

/* ---------------------Cart Checkout (Order Placed)-------------- */

exports.addNewOrder = async (req, res) => {
    try {
        console.log("user: ->>>>", req.user);
        
        let cart = await Cart.find({ user: req.user._id, isDelete: false }).populate("productId");
        console.log("Cart: ------> ", cart);

        // Check if the cart is empty
        if (cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        let orderItem = cart.map((item) => {
            if (!item.productId) {
                throw new Error('Product not found for cart item');
            }

            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.ProductPrice,
                totalAmount: item.quantity * item.productId.ProductPrice
            };
        });

        console.log("Order Items: -----> ", orderItem);

        let amount = orderItem.reduce((total, item) => total + item.totalAmount, 0);
        
        let order = await Order.create({
            userId: req.user._id,
            item: orderItem,
            totalPrice: amount
        });
        console.log(order);
        
        await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true });
        res.json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteOrder = async(req ,res)=>{
    try {
        let id = req.query._id;
        // let order = await Order.findById(id);
        let order = await Order.findOneAndUpdate(
            {_id:id},
            {$set:{isDelete:true}},
            {new:true}
        )
        res.json({message:"deleted",order})
    } 
    catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
     }
}