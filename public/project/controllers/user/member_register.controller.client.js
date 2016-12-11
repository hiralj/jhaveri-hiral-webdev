(function () {
    angular
        .module("FitnessMaker")
        .controller("MemberRegister", MemberRegister);

    function MemberRegister(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(member) {
            // Use vm.member
            member.role = "Member";
            UserService
                .createUser(member)
                .success(
                    function (memberObj) {
                        console.log(memberObj._id);
                        $location.url("/member_dashboard");
                    }
                );
        }
    }
})();