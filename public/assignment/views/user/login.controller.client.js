/**
 * Created by SubhamMittal on 6/19/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.submitted = false;

        vm.login = function login(username, password) {
            vm.submitted = true;
            if (username != null) {
                UserService
                    .login(username.toLowerCase(), password)
                    .then(
                        function(response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                                vm.submitted = false;
                            }
                        },
                        function(error) {
                            vm.error = "Incorrect Username or Password";
                        }
                    );
            }
            else {
                vm.error = "Please enter a username";
            }
        }
    }

})();