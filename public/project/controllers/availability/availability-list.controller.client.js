(function () {
    angular
        .module("FitnessMaker")
        .controller("AvailabilityList", AvailabilityList);

    function AvailabilityList($routeParams, AvailabilityService) {
        var vm = this;
        vm.trainerId = $routeParams["userId"];
        function init() {
            AvailabilityService
                .findAllAvailabilitiesForTrainer(vm.trainerId)
                .success(
                    function (availabilities) {
                        vm.availability_list = availabilities;
                    }
                );
        }

        init();
        // vm.availability_list = [
        //     {
        //         day: 'Thursday',
        //         start: 15,
        //         end: 18
        //     },
        //     {
        //         day: 'Friday',
        //         start: 15,
        //         end: 18
        //     },
        //     {
        //         day: 'Monday',
        //         start: 12,
        //         end: 18
        //     }
        // ];
    }
})();