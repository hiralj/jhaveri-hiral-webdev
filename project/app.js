module.exports = function (app) {
    var model = require("./model/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/food.service.server")(app, model);
    require("./services/availability.service.server")(app, model);
    require("./services/appointment.service.server")(app, model);
};