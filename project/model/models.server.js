module.exports = function () {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.NODE_ENV == "production") {
        connectionString = "mongodb://heroku_p5fswtwk:j7pg3itpfkgth3uu2m9tic90kl@ds019491.mlab.com:19491/heroku_p5fswtwk";
    }

    var connection = mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server")(connection);
    var foodModel = require("./food/food.model.server")(connection);
    var availabilityModel = require("./availability/availability.model.server")(connection);
    var appointmentModel = require("./appointment/appointment.model.server")(connection);

    var model = {
        userModel: userModel,
        foodModel: foodModel,
        availabilityModel: availabilityModel,
        appointmentModel: appointmentModel
    };

    foodModel.setModel(model);
    availabilityModel.setModel(model);
    appointmentModel.setModel(model);
    return model;
};