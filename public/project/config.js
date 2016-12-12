(function () {
    angular
        .module("FitnessMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/fitness/trainer/:userId", {
                templateUrl: "views/user/trainer_profile.view.client.html",
                controller: "TrainerProfileController",
                controllerAs: "model"
            })
            .when("/fitness/member/:userId", {
                templateUrl: "views/user/member_profile.view.client.html",
                controller: "MemberProfileController",
                controllerAs: "model"
            })
            .when("/member_register", {
                templateUrl: "views/user/member_register.view.client.html",
                controller: "MemberRegister",
                controllerAs: "model"
            })
            .when("/trainer_register", {
                templateUrl: "views/user/trainer_register.view.client.html",
                controller: "TrainerRegister",
                controllerAs: "model"
            })
            .when("/fitness/member/:userId/dashboard", {
                templateUrl: "views/dashboard/member_dashboard.view.client.html",
                controller: "MemberDashboard",
                controllerAs: "model"
            })
            .when("/fitness/trainer/:userId/dashboard", {
                templateUrl: "views/dashboard/trainer_dashboard.view.client.html",
                controller: "TrainerDashboard",
                controllerAs: "model"
            })
            .when("/fitness/member/:userId/appointment_schedule", {
                templateUrl: "views/appointment/appointment-schedule.view.client.html",
                controller: "AppointmentSchedule",
                controllerAs: "model"
            })
            .when("/fitness/member/:userId/manage_calories/:date", {
                templateUrl: "views/food/manage_calories.view.client.html",
                controller: "ManageCalories",
                controllerAs: "model"
            })
            .when("/fitness/trainer/:userId/availability", {
                templateUrl: "views/availability/availability-list.view.client.html",
                controller: "AvailabilityList",
                controllerAs: "model"
            })
            .when("/fitness/trainer/:userId/availability/new", {
                templateUrl: "views/availability/availability-new.view.client.html",
                controller: "AvailabilityNew",
                controllerAs: "model"
            })
            .when("/fitness/trainer/:userId/availability/:availabilityId", {
                templateUrl: "views/availability/availability-edit.view.client.html",
                controller: "AvailabilityEdit",
                controllerAs: "model"
            })
    }
})();