const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartItemSchema = new Schema({
    productid: { type: Number },
    quantity: { type: Number }
});

const CartSchema = new Schema({
    userid: { type: ObjectId, required: true, unique: true },
    cart: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
