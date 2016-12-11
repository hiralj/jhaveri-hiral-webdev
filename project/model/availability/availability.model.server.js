module.exports = function (connection) {
    var model = {};
    var AvailabilitySchema = require("./availability.schema.server")();
    var AvailabilityModel = connection.model("AvailabilityModel", AvailabilitySchema);

    var api = {
        setModel: setModel,
        createAvailability: createAvailability,
        getAvailabilityById: getAvailabilityById,
        findAllAvailabilitiesForTrainer: findAllAvailabilitiesForTrainer,
        updateAvailability: updateAvailability,
        deleteAvailability: deleteAvailability
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createAvailability(trainerId, availability) {
        return AvailabilityModel
            .create(availability)
            .then(
                function (availabilityObj) {
                    availabilityObj._trainer = trainerId;
                    availabilityObj.save();
                    return availabilityObj;
                }
            );
    }

    function getAvailabilityById(availabilityId) {
        return AvailabilityModel.findById(availabilityId);
    }

    function findAllAvailabilitiesForTrainer(trainerId) {
        return AvailabilityModel.find({_trainer: trainerId});
    }

    function updateAvailability(availabilityId, availability) {
        return AvailabilityModel
            .update(
                {_id: availabilityId},
                availability
            );
    }

    function deleteAvailability(availabilityId) {
        return AvailabilityModel
            .remove({_id: availabilityId});
    }
};