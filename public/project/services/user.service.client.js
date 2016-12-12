(function() {
    angular
        .module("FitnessMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            findUserById: findUserById,
            getAllTrainers: getAllTrainers
        };

        return api;

        function createUser(user) {
            return $http.post('/api/fitness/user', user);
        }

        function login(username, password) {
            var user = {username: username, password: password};
            return $http.post('/api/fitness/login', user);
        }

        function findUserById(userId) {
            return $http.get('/api/fitness/user/' + userId);
        }

        function getAllTrainers() {
            return $http.get('/api/fitness/trainer');
        }
    }
})();