module.exports = function (connection) {
    var UserSchema = require("./user.schema.server")();
    var UserModel = connection.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        getAllTrainers: getAllTrainers
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function getAllTrainers() {
        return UserModel.find({role: 'Trainer'});
    }
};