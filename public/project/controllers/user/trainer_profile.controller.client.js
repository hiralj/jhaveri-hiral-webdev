(function () {
    angular
        .module("FitnessMaker")
        .controller("TrainerProfileController", TrainerProfileController);

    function TrainerProfileController($routeParams, UserService) {
        var vm = this;
        vm.trainerId = $routeParams["userId"];
        console.log(vm.trainerId);

        function init() {
            UserService
                .findUserById(vm.trainerId)
                .success(
                    function (userObj) {
                        vm.trainer = userObj;
                    }
                );
        }

        init();
    }
})();