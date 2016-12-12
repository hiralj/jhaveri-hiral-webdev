(function () {
    angular
        .module("FitnessMaker")
        .controller("AppointmentSchedule", AppointmentSchedule);

    function AppointmentSchedule($routeParams, UserService, AvailabilityService, AppointmentService, $location) {
        var vm = this;
        vm.memberId = $routeParams["userId"];
        vm.populateFreeSlots = populateFreeSlots;
        vm.requestAppointment = requestAppointment;
        vm.showTime = showTime;

        function init() {
            UserService
                .getAllTrainers()
                .success(
                    function (trainers) {
                        vm.trainers = trainers;
                    }
                );
        }

        function populateFreeSlots() {
            var availabilities;
            var appointments;
            AvailabilityService
                .findAllAvailabilitiesForTrainer(vm.appointment.trainerId)
                .success(
                    function (result) {
                        availabilities = result;
                    }
                );
            AppointmentService
                .getAppointmentsOfTrainer(vm.appointment.trainerId, "Accepted")
                .success(
                    function (result) {
                        appointments = result;
                        vm.freeSlots = computeFreeSlots(availabilities, appointments);
                    }
                );
        }

        function computeFreeSlots(availabilities, appointments) {
            var choppedAvailabilities = [];
            for(var i in availabilities) {
                var cur = availabilities[i].start;
                while(cur < availabilities[i].end) {
                    choppedAvailabilities.push(
                        {
                            day: availabilities[i].day,
                            start: cur,
                            end: cur + 1
                        }
                    );
                    cur++;
                }
            }
            var freeSlots = [];
            for(var i in choppedAvailabilities) {
                var flag = true;
                for(var j in appointments) {
                    if(appointments[j].day === choppedAvailabilities[i].day
                    && appointments[j].start === choppedAvailabilities[i].start) {
                        flag = false;
                        break;
                    }
                }
                if(flag) {
                    freeSlots.push(choppedAvailabilities[i]);
                }
            }
            return compressTimeSlots(freeSlots);
        }

        /*
        Input format of timeSlots: List of following type:
                day:
                start:
                end:
         */
        function compressTimeSlots(timeSlots) {
            var result = [];
            var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for(var d in days) {
                var list = [];
                for(var i in timeSlots) {
                    if(timeSlots[i].day === days[d]) {
                        list.push({
                            start: timeSlots[i].start,
                            end: timeSlots[i].end
                        });
                    }
                }
                if(list.length > 0) {
                    result.push({
                        day: days[d],
                        slots: list
                    });
                }
            }
            return result;
        }

        function requestAppointment() {
            if(!vm.appointment || !vm.appointment.trainerId || !vm.appointment.slot) {
                vm.error = "Please select a trainer and a slot for appointment";
                return;
            }
            var slotElements = vm.appointment.slot.split(" ");
            var day = slotElements[0];
            var start = parseInt(slotElements[1]);
            var end = parseInt(slotElements[2]);
            // get trainer ID from vm.appointment.trainerObj -- todo
            var newAppointment = {
                day: day,
                start: start,
                end: end
            };
            AppointmentService
                .createPendingAppointment(vm.appointment.trainerId, vm.memberId, newAppointment)
                .success(
                    function () {
                        $location.url('/fitness/member/' + vm.memberId + '/dashboard');
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