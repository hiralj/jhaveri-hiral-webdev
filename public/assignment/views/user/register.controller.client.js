(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, repassword, firstName, lastName, email) {
            if(password != repassword) {
                vm.error = "Passwords do not match";
                return;
            }
            user = {};
            user.username = username;
            user.password = password;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;

            var promise = UserService.createUser(user);
            promise
                .success(function(user){
                    if(user) {
                        $location.url("/");
                    } else {
                        vm.error = "Username taken!"
                    }
                })
                .error(function(){

                });
        }
    }
})();