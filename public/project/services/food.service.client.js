(function () {
    angular
        .module("FitnessMaker")
        .factory("FoodService", FoodService);
    
    function FoodService($http) {
        var api = {
            createFood: createFood,
            findFoodById: findFoodById,
            deleteFood: deleteFood,
            findFoodsOnDateForUser: findFoodsOnDateForUser
        };
        
        return api;
        
        function createFood(food, userId) {
            return $http.post('/api/fitness/user/' + userId + '/food', food);
        }
        
        function findFoodById(foodId) {
            return $http.get('/api/fitness/food/' + foodId);
        }

        function deleteFood(foodId) {
            return $http.delete('/api/fitness/food/' + foodId);
        }

        function findFoodsOnDateForUser(userId, date) {
            return $http.get('/api/fitness/user/' + userId + '/food?date=' + date);
        }
    }
})();