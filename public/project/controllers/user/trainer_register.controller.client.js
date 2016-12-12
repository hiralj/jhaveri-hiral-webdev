(function () {
    angular
        .module("FitnessMaker")
        .controller("TrainerRegister", TrainerRegister);

    function TrainerRegister(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(trainer) {
            trainer.role = "Trainer";
            UserService
                .createUser(trainer)
                .success(
                    function (trainerObj) {
                        $location.url('/fitness/trainer/' + trainerObj._id + '/dashboard');
                    }
                );
        }
    }
})();