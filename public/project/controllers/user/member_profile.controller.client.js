(function () {
    angular
        .module("FitnessMaker")
        .controller("MemberProfileController", MemberProfileController);
    
    function MemberProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(
                    function (userObj) {
                        vm.user = userObj;
                    }
                );
        }

        init();
    }

})();