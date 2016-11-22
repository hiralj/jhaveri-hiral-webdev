module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server")();

    var api = {
        userModel: userModel
    };

    return api;
};