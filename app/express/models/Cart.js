const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartItemSchema = new Schema({
    name:{type:String},
    price:{type:Number},
    image_url:{type:String},
    quantity: { type: Number }
});

const CartSchema = new Schema({
    userid: { type: ObjectId, required: true, unique: true },
    cart: [CartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
