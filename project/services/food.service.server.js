module.exports = function (app, model) {
    app.post('/api/fitness/user/:userId/food', createFood);
    app.get('/api/fitness/user/:userId/food', findFoodsOnDateForUser);
    app.get('/api/fitness/food/:foodId', findFoodById);
    app.delete('/api/fitness/food/:foodId', deleteFood);

    function createFood(req, res) {
        var userId = req.params.userId;
        var food = req.body;
        model
            .foodModel
            .createFood(food, userId)
            .then(
                function (foodObj) {
                    res.send(foodObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findFoodsOnDateForUser(req, res) {
        var userId = req.params.userId;
        var date = req.query.date;
        model
            .foodModel
            .findFoodsOnDateForUser(date, userId)
            .then(
                function (foods) {
                    res.send(foods);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findFoodById(req, res) {
        var foodId = req.params.foodId;
        model
            .foodModel
            .findFoodById(foodId)
            .then(
                function (foodObj) {
                    res.send(foodObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFood(req, res) {
        var foodId = req.params.foodId;
        model
            .foodModel
            .deleteFood(foodId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
}