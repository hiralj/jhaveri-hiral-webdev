module.exports = function () {
    var mongoose = require("mongoose");

    var AppointmentSchema = mongoose.Schema({
        _trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        _member: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        day: String,
        start: Number,
        end: Number,
        status: {type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled']},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "appointment"});

    return AppointmentSchema;
};