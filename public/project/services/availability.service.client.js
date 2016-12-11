(function () {
    angular
        .module("FitnessMaker")
        .factory("AvailabilityService", AvailabilityService);

    function AvailabilityService($http) {
        var api = {
            createAvailability: createAvailability,
            getAvailabilityById: getAvailabilityById,
            findAllAvailabilitiesForTrainer: findAllAvailabilitiesForTrainer,
            updateAvailability: updateAvailability,
            deleteAvailability: deleteAvailability
        };

        return api;

        function createAvailability(trainerId, availability) {
            return $http.post('/api/fitness/trainer/' + trainerId + '/availability', availability);
        }

        function getAvailabilityById(availabilityId) {
            return $http.get('/api/fitness/availability/' + availabilityId);
        }

        function findAllAvailabilitiesForTrainer(trainerId) {
            return $http.get('/api/fitness/trainer/' + trainerId + '/availability');
        }

        function updateAvailability(availabilityId, availability) {
            return $http.put('/api/fitness/availability/' + availabilityId, availability);
        }

        function deleteAvailability(availabilityId) {
            return $http.delete('/api/fitness/availability/' + availabilityId);
        }
    }
})();