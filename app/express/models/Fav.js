const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    userid: { type: ObjectId, required: true },
    fav: { type: Array }
});

const Fav = mongoose.model('Fav', UserSchema);
module.exports = Fav;
