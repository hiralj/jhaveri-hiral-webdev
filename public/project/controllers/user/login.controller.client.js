(function () {
    angular
        .module("FitnessMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        function login(credentials) {
            UserService
                .login(credentials.username, credentials.password)
                .success(
                    function (userObj) {
                        if(!userObj) {
                            vm.error = "Username or Password is incorrect!";
                            return;
                        }

                        if(userObj.role === "Trainer") {
                            $location.url("/fitness/trainer/" + userObj._id + "/dashboard");
                        } else if(userObj.role === "Member") {
                            $location.url("/fitness/member/" + userObj._id + "/dashboard");
                        } else {
                            vm.error = "Error: Neither a member nor a trainer";
                            return;
                        }
                    }
                );
        }
    }
})();