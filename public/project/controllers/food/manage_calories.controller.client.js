(function () {
    angular
        .module("FitnessMaker")
        .controller("ManageCalories", ManageCalories);

    function ManageCalories($routeParams, FoodService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.dateSelected = $.datepicker.formatDate('mm/dd/yy', new Date());
        vm.foodSelected = [];

        vm.searchChange = searchChange;
        vm.searchFood = searchFood;
        vm.addFood = addFood;
        vm.serving_qty_update = serving_qty_update;
        vm.findFoodsOnDateForUser = findFoodsOnDateForUser;

        vm.foods = [];

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

        function serving_qty_update(foodId, serving_qty) {
            for(var i in foodSelected) {
                if(foodSelected[i].id == foodId) {
                    foodSelected[i].serving_qty = serving_qty;
                    break;
                }
            }
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

        function searchChange() {
            // $http.get("/api/search/autocomplete/" + vm.searchText)
            //     .success(function (foodList) {
            //         vm.foods = foodList;
            //     });

            // console.log(vm.searchText);

        }


        function searchFood() {
            // $http.get("/api/search/food/" + vm.searchText)
            //     .success(
            //         function (options) {
            //             vm.options = options;
            //         }
            //     );
            vm.options = [{
                "item_name": "Milk Bar Pie Mix",
                "brand_name": "Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/581ae3292bd17a195fd0c78a.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 190,
                "nutrient_uom": "kcal",
                "serving_qty": 0.13,
                "serving_uom": "of dry mix",
                "resource_id": "WVY6UAnmQ",
                "nutrients": null
            }, {
                "item_name": "Milk",
                "brand_name": "a2 Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/55959dfa2dbdc0585a3d9422.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 160,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "BlbRfMk1M",
                "nutrients": null
            }, {
                "item_name": "Milk, Reduced Fat, 2% Milkfat",
                "brand_name": "Lil' Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 130,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "carton",
                "resource_id": "81zAfd63M",
                "nutrients": null
            }, {
                "item_name": "Milk, Lowfat",
                "brand_name": "a2 Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/558ee71bd450fd807d479696.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 120,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "QoK6I8Jqa",
                "nutrients": null
            }, {
                "item_name": "Lowfat Milk",
                "brand_name": "a2 Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5564296212099ef37e1670d7.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 120,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "k5Q8IwqRA",
                "nutrients": null
            }, {
                "item_name": "Milk, Lowfat, Strawberry, 1% Milkfat",
                "brand_name": "Lil' Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 150,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "carton",
                "resource_id": "eJB8fwYEY",
                "nutrients": null
            }, {
                "item_name": "Milk, Reduced Fat, 2% Milkfat",
                "brand_name": "Lil' Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 130,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "carton",
                "resource_id": "EDGdi5nWA",
                "nutrients": null
            }, {
                "item_name": "Milk Duds",
                "brand_name": "Milk Duds",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5457c6ec0d5781691593edd2.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 220,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "box",
                "resource_id": "3rKgCkxB",
                "nutrients": null
            }, {
                "item_name": "Almond Milk",
                "brand_name": "O Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5576d7d5936b348a6e7e041d.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 120,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "RN6vi1zy9",
                "nutrients": null
            }, {
                "item_name": "Cashew Milk",
                "brand_name": "O Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/55da4b9e2fd0f7f433c94853.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 180,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "gbA8fjWp1",
                "nutrients": null
            }, {
                "item_name": "Fat-Free Milk",
                "brand_name": "a2 Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/56379410d05b878c34c37e3d.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 100,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "gbA8fjpAd",
                "nutrients": null
            }, {
                "item_name": "Milk Beverage, Vanilla",
                "brand_name": "Milk Wise",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5653b3d9f94dd14e425e18b4.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 70,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "4r6GC5Wmj",
                "nutrients": null
            }, {
                "item_name": "Snack, Milk Chocolate",
                "brand_name": "Dairy Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/554f0e80ea5968c10f465d52.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 120,
                "nutrient_uom": "kcal",
                "serving_qty": 3,
                "serving_uom": "squares",
                "resource_id": "RN6vi15pb",
                "nutrients": null
            }, {
                "item_name": "Milk Favoring Straws, Chocolate",
                "brand_name": "Milk Magic",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5799ade1d9ed235e038f03c1.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 20,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "mGqofgnzm",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws",
                "brand_name": "Got Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/536bbcc8f1f85db0054dd798.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 16,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "XG5vfKAea",
                "nutrients": null
            }, {
                "item_name": "Protein Supplement Milk, Vanilla",
                "brand_name": "Monster Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/58241cd8660b023e562b921e.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 280,
                "nutrient_uom": "kcal",
                "serving_qty": 2,
                "serving_uom": "scoops",
                "resource_id": "jwX8f0RXx",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws, Chocolate",
                "brand_name": "Got Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 16,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "x5lAIznDy",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws, Strawberry",
                "brand_name": "Got Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/536bbcca4a749f8f03d61359.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 17,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "gbA8frvYe",
                "nutrients": null
            }, {
                "item_name": "Chocolate Partly Skimmed Milk",
                "brand_name": "Milk on the Moove",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/57fdaf8f8f7fe0f15d35ea33.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 190,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "dNyEi5RlB",
                "nutrients": null
            }, {
                "item_name": "Milk Chocolate, Sea Salt & Almonds",
                "brand_name": "Gourmet Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/55d2eeea2772739771172ddc.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 200,
                "nutrient_uom": "kcal",
                "serving_qty": 3,
                "serving_uom": "pieces",
                "resource_id": "oBKJfO1OQ",
                "nutrients": null
            }, {
                "item_name": "High Protein Shake, Chocolate Milk",
                "brand_name": "Muscle Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 350,
                "nutrient_uom": "kcal",
                "serving_qty": 17,
                "serving_uom": "fl oz",
                "resource_id": "GjBkIa54a",
                "nutrients": null
            }, {
                "item_name": "Almond Milk",
                "brand_name": "O Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/551247d9139bc65f373e3f36.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 120,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "cup",
                "resource_id": "nDjNijxoe",
                "nutrients": null
            }, {
                "item_name": "Lil' Milk 2% Reduced Fat Chocolate Milk",
                "brand_name": "Lil' Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/536a98f429a0839e7408e94a.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 190,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "carton",
                "resource_id": "aQR8cwm6q",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws, Vanilla Milkshake",
                "brand_name": "Got Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 17,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "YyM6hbDzg",
                "nutrients": null
            }, {
                "item_name": "Milk Flavoring, Jammin' Banana",
                "brand_name": "Milk Splash",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/55fb273fc684ecb214542ded.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": null,
                "nutrient_uom": "kcal",
                "serving_qty": 0.5,
                "serving_uom": "tsp",
                "resource_id": "4r6GC5G64",
                "nutrients": null
            }, {
                "item_name": "Milk Flavoring Straws, Chocolate Peanut Butter",
                "brand_name": "Milk Magic",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/5799addf9a90a1df59c56294.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 20,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straws",
                "resource_id": "Zql6CV3mK",
                "nutrients": null
            }, {
                "item_name": "Lean Muscle Formula, Lower Calorie, Chocolate Milk",
                "brand_name": "Muscle Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 195,
                "nutrient_uom": "kcal",
                "serving_qty": 2,
                "serving_uom": "scoops",
                "resource_id": "rjxRIa19e",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws, Cookies & Cream",
                "brand_name": "Got Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/536100725375dde50ab406cc.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 17,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "3rKgCXKo5",
                "nutrients": null
            }, {
                "item_name": "High Protein Shake, Chocolate Milk",
                "brand_name": "Muscle Milk",
                "thumbnail": "https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png",
                "nutrient_name": "Calories",
                "nutrient_value": 230,
                "nutrient_uom": "kcal",
                "serving_qty": 11,
                "serving_uom": "fl oz",
                "resource_id": "V8zYfKv63",
                "nutrients": null
            }, {
                "item_name": "Magic Milk Flavoring Straws, Chocolate",
                "brand_name": "Got Milk",
                "thumbnail": "https://d1r9wva3zcpswd.cloudfront.net/536bbcccf1f85db0054dd79a.jpeg",
                "nutrient_name": "Calories",
                "nutrient_value": 16,
                "nutrient_uom": "kcal",
                "serving_qty": 1,
                "serving_uom": "straw",
                "resource_id": "Kq4XCMyxR",
                "nutrients": null
            }];
        }

        init();
    }
})();