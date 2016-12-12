(function () {
    angular
        .module("FitnessMaker")
        .controller("MemberDashboard", MemberDashboard);

    function MemberDashboard($routeParams, FoodService, $location, AppointmentService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        var dateSelected = new Date();
        vm.dateToRepresent = $.datepicker.formatDate('mm/dd/yy', dateSelected);

        vm.findFoodsOnDateForUser = findFoodsOnDateForUser;
        vm.decrementDate = decrementDate;
        vm.incrementDate = incrementDate;
        vm.representDate = representDate;
        vm.manageFood = manageFood;
        vm.deleteAppointment = deleteAppointment;
        vm.caloriePercentage = 0;

        vm.acceptedAppointments = [];
        vm.pendingAppointments = [];
        vm.rejectedAppointments = [];
        vm.showTime = showTime;

        function init() {
            findFoodsOnDateForUser(vm.userId, vm.dateToRepresent);
            computeAppointments();
        }

        function computeAppointments() {
            AppointmentService
                .getAppointmentsOfMember(vm.userId, "Accepted")
                .success(
                    function (appointments) {
                        vm.acceptedAppointments = appointments;
                    }
                );
            AppointmentService
                .getAppointmentsOfMember(vm.userId, "Pending")
                .success(
                    function (appointments) {
                        vm.pendingAppointments = appointments;
                    }
                );
            AppointmentService
                .getAppointmentsOfMember(vm.userId, "Rejected")
                .success(
                    function (appointments) {
                        vm.rejectedAppointments = appointments;
                    }
                );
        }

        function decrementDate() {
            dateSelected.setDate(dateSelected.getDate() - 1);
            vm.dateToRepresent = $.datepicker.formatDate('mm/dd/yy', dateSelected);
            findFoodsOnDateForUser(vm.userId, vm.dateToRepresent);
        }

        function incrementDate() {
            dateSelected.setDate(dateSelected.getDate() + 1);
            vm.dateToRepresent = $.datepicker.formatDate('mm/dd/yy', dateSelected);
            findFoodsOnDateForUser(vm.userId, vm.dateToRepresent);
        }

        function representDate() {
            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            var todayFormatted = $.datepicker.formatDate('mm/dd/yy', today);
            var yesterdayFormatted = $.datepicker.formatDate('mm/dd/yy', yesterday);

            if (vm.dateToRepresent === todayFormatted) {
                return "today";
            } else if (vm.dateToRepresent === yesterdayFormatted) {
                return "yesterday";
            } else {
                return vm.dateToRepresent;
            }
        }

        function findFoodsOnDateForUser (userId, date) {
            FoodService
                .findFoodsOnDateForUser(userId, date)
                .success(
                    function (foodsEaten) {
                        vm.totalCalories = 0;
                        for(var i in foodsEaten) {
                            vm.totalCalories += foodsEaten[i].nutrient_value;
                        }
                        var percentageAchieved = vm.totalCalories/2000*100;
                        vm.caloriePercentage = 0;
                        incrementCaloriePercentage(percentageAchieved);
                    }
                );
        }

        function incrementCaloriePercentage(total) {
            vm.caloriePercentage += 1;
            if(vm.caloriePercentage < total) {
                setTimeout(incrementCaloriePercentage(total), 100);
            }
        }

        function manageFood() {
            var date = vm.dateToRepresent;
            date = date.replace(/\//g, '');
            $location.url('/fitness/member/' + vm.userId + '/manage_calories/' + date);
        }

        function deleteAppointment(appointment) {
            AppointmentService
                .deleteAppointment(appointment._id)
                .success(
                    function () {
                        computeAppointments();
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