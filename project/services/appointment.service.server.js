module.exports = function (app, model) {
    app.get('/api/fitness/trainer/:trainerId/appointment', getAppointmentsOfTrainer);
    app.get('/api/fitness/member/:memberId/appointment', getAppointmentsOfMember);
    app.post('/api/fitness/trainer/:trainerId/member/:memberId/appointment', createPendingAppointment);
    app.put('/api/fitness/confirm_appointment/:appointmentId', confirmAppointment);
    app.put('/api/fitness/reject_appointment/:appointmentId', rejectAppointment);
    app.delete('/api/fitness/appointment/:appointmentId', deleteAppointment);

    function getAppointmentsOfTrainer(req, res) {
        var trainerId = req.params.trainerId;
        var status = req.query.status;
        model
            .appointmentModel
            .getAppointmentsOfTrainer(trainerId, status)
            .then(
                function (appointments) {
                    res.send(appointments);
                }
            );
    }

    function getAppointmentsOfMember(req, res) {
        var memberId = req.params.memberId;
        var status = req.query.status;
        model
            .appointmentModel
            .getAppointmentsOfMember(memberId, status)
            .then(
                function (appointments) {
                    res.send(appointments);
                }
            );
    }

    function createPendingAppointment(req, res) {
        var trainerId = req.params.trainerId;
        var memberId = req.params.memberId;
        var appointment = req.body;
        model
            .appointmentModel
            .createPendingAppointment(appointment, trainerId, memberId)
            .then(
                function (appointmentObj) {
                    res.send(appointmentObj);
                }
            );
    }

    function confirmAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        model
            .appointmentModel
            .confirmAppointment(appointmentId)
            .then(
                function (appointmentObj) {
                    res.send(appointmentObj);
                }
            );
    }

    function rejectAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        model
            .appointmentModel
            .rejectAppointment(appointmentId)
            .then(
                function (appointmentObj) {
                    res.send(appointmentObj);
                }
            );
    }

    function deleteAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        model
            .appointmentModel
            .deleteAppointment(appointmentId)
            .then(
                function () {
                    res.sendStatus(200);
                }
            );
    }
};