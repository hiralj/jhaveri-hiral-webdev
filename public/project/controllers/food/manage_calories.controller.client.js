(function () {
    angular
        .module("FitnessMaker")
        .controller("ManageCalories", ManageCalories);

    function ManageCalories($routeParams, FoodService, $http) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        var date = $routeParams["date"];
        date = date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4);
        vm.dateSelected = date;
        vm.foodSelected = [];

        vm.searchChange = searchChange;
        vm.searchFood = searchFood;
        vm.addFood = addFood;
        vm.findFoodsOnDateForUser = findFoodsOnDateForUser;
        vm.dateChange = dateChange;

        vm.foods = [];

        function searchChange() {
            // $http.get("/api/search/autocomplete/" + vm.searchText)
            //     .success(function (foodList) {
            //         vm.foods = foodList;
            //     });
        }

        function dateChange() {
            findFoodsOnDateForUser(vm.userId, vm.dateSelected);
        }

        function init() {
            findFoodsOnDateForUser(vm.userId, vm.dateSelected);
        }

        function findFoodsOnDateForUser (userId, date) {
            FoodService
                .findFoodsOnDateForUser(userId, date)
                .success(
                    function (foodsEaten) {
                        vm.foodSelected = foodsEaten;
                    }
                );
        }

        function addFood(food) {
            food.name = food.item_name;
            delete food.item_name;
            food.qty = food.serving_qty;
            delete food.serving_qty;
            food.date = vm.dateSelected;

            FoodService
                .createFood(food, vm.userId)
                .success(
                    function (foodObj) {
                        vm.foodSelected.push(foodObj);
                        vm.options = [];
                    }
                );
        }

        function searchFood() {
            $http.get("/api/search/food/" + vm.searchText)
                .success(
                    function (options) {
                        vm.options = options;
                    }
                );
            // vm.options = [{
            //     "item_name": "Milk Bar Pie Mix",
            //     "brand_name": "Milk",
            //     "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/581ae3292bd17a195fd0c78a.jpeg",
            //     "nutrient_name": "Calories",
            //     "nutrient_value": 190,
            //     "nutrient_uom": "kcal",
            //     "serving_qty": 0.13,
            //     "serving_uom": "of dry mix",
            //     "resource_id": "WVY6UAnmQ",
            //     "nutrients": null
            // }, {
            //     "item_name": "Milk",
            //     "brand_name": "a2 Milk",
            //     "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/55959dfa2dbdc0585a3d9422.jpeg",
            //     "nutrient_name": "Calories",
            //     "nutrient_value": 160,
            //     "nutrient_uom": "kcal",
            //     "serving_qty": 1,
            //     "serving_uom": "cup",
            //     "resource_id": "BlbRfMk1M",
            //     "nutrients": null
            // }];
        }

        init();
    }
})();