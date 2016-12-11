(function () {
    angular
        .module("FitnessMaker")
        .controller("TrainerDashboard", TrainerDashboard);

    function TrainerDashboard($routeParams, AppointmentService, UserService, $location) {
        var vm = this;
        vm.showTime = showTime;
        vm.confirmAppointment = confirmAppointment;
        vm.rejectAppointment = rejectAppointment;
        vm.deleteAppointment = deleteAppointment;
        vm.trainerId = $routeParams["userId"];

        function init() {
            AppointmentService
                .getAppointmentsOfTrainer(vm.trainerId, "Pending")
                .success(
                    function (appointments) {
                        vm.pendingAppointments = appointments;
                    }
                );

            AppointmentService
                .getAppointmentsOfTrainer(vm.trainerId, "Accepted")
                .success(
                    function (appointments) {
                        vm.acceptedAppointments = appointments;
                    }
                );
        }

        function confirmAppointment(appointment) {
            AppointmentService
                .confirmAppointment(appointment._id)
                .success(
                    function () {
                        vm.pendingAppointments.splice(vm.pendingAppointments.indexOf(appointment), 1);
                        vm.acceptedAppointments.push(appointment);
                    }
                );
        }

        function rejectAppointment(appointment) {
            AppointmentService
                .rejectAppointment(appointment._id)
                .success(
                    function () {
                        vm.pendingAppointments.splice(vm.pendingAppointments.indexOf(appointment), 1);
                    }
                );
        }

        function deleteAppointment(appointment) {
            AppointmentService
                .deleteAppointment(appointment._id)
                .success(
                    function () {
                        vm.acceptedAppointments.splice(vm.acceptedAppointments.indexOf(appointment), 1);
                    }
                );
        }

        function showTime(time) {
            numericTime = parseInt(time);
            if (numericTime < 10) {
                return "0"+time+":00";
            } else {
                return time+":00";
            }
        }

        init();
    }
})();