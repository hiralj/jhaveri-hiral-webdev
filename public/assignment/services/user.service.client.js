(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        next_id = 567;
        var users = [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alicew@gmail.com"  },
            {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bobm@gmail.com"    },
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charlyg@gmail.com" },
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "josea@gmail.com"  }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            existing_user = false;
            for(var u in users) {
                if(users[u].username === user.username)
                    existing_user = true;
            }
            if(existing_user)
                return null;
            user._id = next_id;
            next_id += 111;
            users.push(user)
            return user;
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId)
                    return user;
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username)
                    return user;
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(user.username === username && user.password === password)
                    return user;
            }
            return null;
        }

        function updateUser(userId, newuser) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    user.firstName = newuser.firstName;
                    user.lastName = newuser.lastName;
                    user.email = newuser.email;
                }
            }
        }

        function deleteUser(userId) {
            for(var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    break;
                }
            }
        }
    }
})();