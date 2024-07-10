const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderItemSchema = new Schema({
    username: {type:String},
    state:{type:String},
    city:{type:String},
    zip:{type:Number},
    pay:{type:String}
})

const OrderSchema = new Schema({
    userid: { type: ObjectId, required: true, unique: true },
    order: [OrderItemSchema]
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
