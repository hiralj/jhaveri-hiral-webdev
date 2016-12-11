module.exports = function (connection) {
    var model = {};
    var FoodSchema = require("./food.schema.server")();
    var FoodModel = connection.model("FoodModel", FoodSchema);

    var api = {
        setModel: setModel,
        createFood: createFood,
        findFoodById: findFoodById,
        deleteFood: deleteFood,
        findFoodsOnDateForUser: findFoodsOnDateForUser
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createFood(food, userId) {
        return model
            .userModel
            .findUserById(userId)
            .then(
                function (userObj) {
                    return FoodModel
                        .create(food)
                        .then(
                            function (foodObj) {
                                foodObj._member = userObj;
                                foodObj.save();
                                return foodObj;
                            }
                        );
                }
            );
    }

    function findFoodById(foodId) {
        return FoodModel.findById(foodId);
    }

    function deleteFood(foodId) {
        return FoodModel.remove({_id: foodId});
    }

    function findFoodsOnDateForUser(date, userId) {
        return FoodModel.find({_member: userId, date: date});
    }
};