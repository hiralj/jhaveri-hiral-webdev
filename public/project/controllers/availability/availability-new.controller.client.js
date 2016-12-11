(function () {
    angular
        .module("FitnessMaker")
        .controller("AvailabilityNew", AvailabilityNew);

    function AvailabilityNew($routeParams, AvailabilityService, $location) {
        var vm = this;
        vm.trainerId = $routeParams["userId"];
        vm.addAvailability = addAvailability;

        function init() {
            vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            vm.hours = [];
            for(var i = 0; i <= 24; i++) {
                vm.hours.push(i);
            }
        }

        function addAvailability() {
            if(!vm.day || !vm.start || !vm.end) {
                vm.error = "Please provide day, start time and end time!";
                return;
            }
            startTime = parseInt(vm.start);
            endTime = parseInt(vm.end);
            if(startTime >= endTime) {
                vm.error = "Start time must be less than end time";
                return;
            }
            var availability = {
                day: vm.day,
                start: startTime,
                end: endTime
            };
            console.log(availability);
            AvailabilityService
                .createAvailability(vm.trainerId, availability)
                .success(
                    function () {
                        $location.url('/fitness/trainer/' + vm.trainerId + '/availability');
                    }
                );
        }

        init();
    }
})();