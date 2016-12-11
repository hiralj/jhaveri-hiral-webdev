module.exports = function (app, model) {
    app.post('/api/fitness/trainer/:trainerId/availability', createAvailability);
    app.get('/api/fitness/availability/:availabilityId', getAvailabilityById);
    app.get('/api/fitness/trainer/:trainerId/availability', findAllAvailabilitiesForTrainer);
    app.put('/api/fitness/availability/:availabilityId', updateAvailability);
    app.delete('/api/fitness/availability/:availabilityId', deleteAvailability);

    function createAvailability(req, res) {
        var trainerId = req.params.trainerId;
        var availability = req.body;
        model
            .availabilityModel
            .createAvailability(trainerId, availability)
            .then(
                function (availabilityObj) {
                    res.send(availabilityObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAvailabilityById(req, res) {
        var availabilityId = req.params.availabilityId;
        model
            .availabilityModel
            .getAvailabilityById(availabilityId)
            .then(
                function (availabilityObj) {
                    res.send(availabilityObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllAvailabilitiesForTrainer(req, res) {
        var trainerId = req.params.trainerId;
        model
            .availabilityModel
            .findAllAvailabilitiesForTrainer(trainerId)
            .then(
                function (availabilities) {
                    res.send(availabilities);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateAvailability(req, res) {
        var availabilityId = req.params.availabilityId;
        var availability = req.body;
        model
            .availabilityModel
            .updateAvailability(availabilityId, availability)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteAvailability(req, res) {
        var availabilityId = req.params.availabilityId;
        model
            .availabilityModel
            .deleteAvailability(availabilityId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};