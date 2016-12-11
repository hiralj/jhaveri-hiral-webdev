module.exports = function () {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';

    if(process.env.NODE_ENV == "production") {
        connectionString = "mongodb://heroku_p5fswtwk:j7pg3itpfkgth3uu2m9tic90kl@ds019491.mlab.com:19491/heroku_p5fswtwk";
    }

    var connection = mongoose.createConnection(connectionString);
    
    var userModel = require("./user/user.model.server")(connection);
    var websiteModel = require("./website/website.model.server")(connection);
    var pageModel = require("./page/page.model.server")(connection);
    var widgetModel = require("./widget/widget.model.server")(connection);

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};