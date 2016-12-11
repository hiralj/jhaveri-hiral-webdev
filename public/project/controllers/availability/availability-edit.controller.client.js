(function () {
    angular
        .module("FitnessMaker")
        .controller("AvailabilityEdit", AvailabilityEdit);

    function AvailabilityEdit($routeParams, AvailabilityService, $location) {
        var vm = this;
        vm.trainerId = $routeParams["userId"];
        vm.availabilityId = $routeParams["availabilityId"];
        vm.updateAvailability = updateAvailability;
        vm.deleteAvailability = deleteAvailability;
        vm.showTime = showTime;

        function init() {
            vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            vm.hours = [];
            for (var i = 0; i <= 24; i++) {
                vm.hours.push(i);
            }
            // Updtae vm.availability
            // IMPORTANT: have start and end times converted in string from int
            AvailabilityService
                .getAvailabilityById(vm.availabilityId)
                .success(
                    function (availabilityObj) {
                        vm.availability = availabilityObj;
                        vm.availability.start = '' + vm.availability.start;
                        vm.availability.end = '' + vm.availability.end;
                    }
                );
        }

        function updateAvailability() {
            if (!vm.availability.day || !vm.availability.start || !vm.availability.end) {
                vm.error = "Please provide day, start time and end time!";
                return;
            }
            startTime = parseInt(vm.availability.start);
            endTime = parseInt(vm.availability.end);
            if (startTime >= endTime) {
                vm.error = "Start time must be less than end time";
                return;
            }
            // Update actual vm.availability
            var updatedAvailability = {
                day: vm.availability.day,
                start: startTime,
                end: endTime
            };
            AvailabilityService
                .updateAvailability(vm.availability._id, updatedAvailability)
                .success(
                    function () {
                        $location.url('/fitness/trainer/' + vm.trainerId + '/availability');
                    }
                );
        }

        function deleteAvailability() {
            AvailabilityService
                .deleteAvailability(vm.availabilityId)
                .success(
                    function () {
                        $location.url('/fitness/trainer/' + vm.trainerId + '/availability');
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