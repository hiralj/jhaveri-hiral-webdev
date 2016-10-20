(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.update = update;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        function update(user) {
            UserService.updateUser(vm.userId, user);
            $location.url("/user/" + vm.userId);
        }

        init();
    }
})();