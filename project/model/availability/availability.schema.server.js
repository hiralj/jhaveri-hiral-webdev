module.exports = function () {
    var mongoose = require("mongoose");

    var AvailabilitySchema = mongoose.Schema({
        _trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        day: String,
        start: Number,
        end: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "availability"});

    return AvailabilitySchema;
};