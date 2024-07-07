const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    userid: { type: ObjectId, required: true },
    cart: { type: Array }
});

const Cart = mongoose.model('Cart', UserSchema);
module.exports = Cart;
