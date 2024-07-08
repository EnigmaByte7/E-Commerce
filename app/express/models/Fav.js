const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavItemSchema = new Schema({
    name:{type:String},
    price:{type:Number},
    image_url:{type:String},
});

const FavSchema = new Schema({
    userid: { type: ObjectId, required: true, unique: true },
    fav: [FavItemSchema]
});

const Fav = mongoose.model('Fav', FavSchema);
module.exports = Fav;
