(function () {
    angular
        .module("FitnessMaker")
        .controller("TrainerRegister", TrainerRegister);

    function TrainerRegister(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(trainer) {
            // Use vm.member
            trainer.role = "Trainer";
            UserService
                .createUser(trainer)
                .success(
                    function (trainerObj) {
                        $location.url("/api/fitness/user/" + trainerObj._id + "/trainer_dashboard");
                    }
                );
        }
    }
})();