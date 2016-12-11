module.exports = function () {
    var mongoose = require("mongoose");

    // This same schema is used for both types of users - Member and Trainer
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        role: {type: String, enum: ['Member', 'Trainer']},
        dob: Date,
        trainingExperience: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    return UserSchema;
};