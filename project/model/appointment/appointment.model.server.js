module.exports = function (connection) {
    var model = {};
    var AppointmentSchema = require("./appointment.schema.server")();
    var AppointmentModel = connection.model("AppointmentModel", AppointmentSchema);

    var api = {
        setModel: setModel,
        createPendingAppointment: createPendingAppointment,
        confirmAppointment: confirmAppointment,
        rejectAppointment: rejectAppointment,
        deleteAppointment: deleteAppointment,
        getAppointmentsOfTrainer: getAppointmentsOfTrainer,
        getAppointmentsOfMember: getAppointmentsOfMember
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPendingAppointment(appointment, trainerId, memberId) {
        return AppointmentModel
            .create(appointment)
            .then(
                function (appointmentObj) {
                    appointmentObj._trainer = trainerId;
                    appointmentObj._member = memberId;
                    appointmentObj.status = 'Pending';
                    appointmentObj.save();
                    return appointmentObj;
                }
            );
    }

    function confirmAppointment(appointmentId) {
        return AppointmentModel
            .update(
                {_id: appointmentId},
                {status: 'Accepted'}
            );
    }

    function rejectAppointment(appointmentId) {
        return AppointmentModel
            .update(
                {_id: appointmentId},
                {status: 'Rejected'}
            );
    }

    function deleteAppointment(appointmentId) {
        return AppointmentModel.remove({_id: appointmentId});
    }

    function getAppointmentsOfTrainer(trainerId, status) {
        return AppointmentModel
            .find({_trainer: trainerId, status: status})
            .populate('_member')
            .exec(
                function (err, appointments) {
                    return appointments;
                }
            );
    }

    function getAppointmentsOfMember(memberId, status) {
        return AppointmentModel
            .find({_member: memberId, status: status})
            .populate(_member)
            .exec(
                function (err, appointments) {
                    return appointments;
                }
            );
    }
};