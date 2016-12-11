(function () {
    angular
        .module("FitnessMaker")
        .factory("AppointmentService", AppointmentService);

    function AppointmentService($http) {
        var api = {
            getAppointmentsOfTrainer: getAppointmentsOfTrainer,
            getAppointmentsOfMember: getAppointmentsOfMember,
            createPendingAppointment: createPendingAppointment,
            confirmAppointment: confirmAppointment,
            rejectAppointment: rejectAppointment,
            deleteAppointment: deleteAppointment
        };

        return api;

        function getAppointmentsOfTrainer(trainerId, status) {
            return $http.get('/api/fitness/trainer/' + trainerId + '/appointment?status=' + status);
        }

        function getAppointmentsOfMember(memberId, status) {
            return $http.get('/api/fitness/member/' + memberId + '/appointment?status=' + status);
        }

        function createPendingAppointment(trainerId, memberId, appointment) {
            return $http.post('/api/fitness/trainer/' + trainerId + '/member/' + memberId + '/appointment', appointment);
        }

        function confirmAppointment(appointmentId) {
            return $http.put('/api/fitness/confirm_appointment/' + appointmentId);
        }

        function rejectAppointment(appointmentId) {
            return $http.put('/api/fitness/reject_appointment/' + appointmentId);
        }

        function deleteAppointment(appointmentId) {
            return $http.delete('/api/fitness/appointment/' + appointmentId);
        }
    }
})();