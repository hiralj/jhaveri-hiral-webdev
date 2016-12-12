module.exports = function (app, model) {
    app.post('/api/fitness/user', createUser);
    app.post('/api/fitness/login', login);
    app.get('/api/fitness/user/:userId', findUserById);
    app.get('/api/fitness/trainer', getAllTrainers);
    app.put('/api/fitness/user/:userId', updateUser);

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        model
            .userModel
            .updateUser(userId, user)
            .then(
                function (userObj) {
                    res.send(userObj);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        model.userModel
            .createUser(user)
            .then(
                function (userObj) {
                    res.send(userObj);
                }
            );
    }

    function login(req, res) {
        var user = req.body;
        model.userModel
            .findUserByCredentials(user.username, user.password)
            .then(
                function (userObj) {
                    res.send(userObj);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (userObj) {
                    res.send(userObj);
                }
            );
    }

    function getAllTrainers(req, res) {
        model.userModel
            .getAllTrainers()
            .then(
                function (trainers) {
                    res.send(trainers);
                }
            );
    }
};