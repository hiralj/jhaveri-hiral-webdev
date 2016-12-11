module.exports = function () {
    var mongoose = require("mongoose");

    var FoodSchema = mongoose.Schema({
        _member: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        qty: Number,
        nutrient_value: Number,
        date: String,
        thumbnail: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "food"});

    return FoodSchema;
};