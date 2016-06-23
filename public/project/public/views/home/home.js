

app.controller("HomeController", function ($scope, $http, $modal, $routeParams, $rootScope) {
    
    //login modal 
    $scope.loginm = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/registeration/loginmodal.html',
            controller: 'LoginController'

        });
    };
    //signup Modal
    $scope.signupm = function () {
        $modal.open({
            templateUrl: 'views/registeration/signupmodal.html',
            controller: 'SignupController'

        });

    };
   

    // Web Page Autocomplete City in the Search Box
    $(function () {
        
        console.log("home");
        var options = {
            types: ['(cities)']

        };

        var input = document.getElementById('cityname');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    });
    
    $scope.getname = function () {
        var city = document.getElementById('cityname').value;
        $scope.name = city.substr(0, city.indexOf(','));
        
    }

    $scope.logout = function () {
        $rootScope.currentUser = null;
    }
   
   
});

//Login Controller
app.controller('LoginController', function ($scope, $modal, $http, $location, $rootScope, $modalInstance) {

    
    $scope.color = "btn btn-success";
    $scope.login = function (user) {
       
        $http.post("/login", user)
        .success(function (response) {
            console.log(response);
            if (response != null) {
                $rootScope.currentUser = response;
                $scope.color = "btn btn-success";
            }
            else {
                $scope.color = "btn btn-danger";
            }
            // $rootScope.currentUser = response;
            $modalInstance.close();
           $location.url("/home");
        });
    };

});
//SignUp Controller
app.controller('SignupController', function ($scope, $modal, $http, $location, $rootScope, $modalInstance, $timeout) {
    $scope.color = "btn btn-success";
    $rootScope.message = ""
    $scope.signup = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
            $rootScope.message = " passwords are not same";
            $scope.color = "btn btn-warning ";
        }
        else {
            $http.post("/register", user)
            .success(function (response) {
                //console.log(response);
                if (response != null) {
                    $rootScope.currentUser = response;
                    $scope.color = "btn btn-success";
                    $rootScope.message = "User Registered Successfully!"
                    var username = $rootScope.currentUser.username;
                    $location.url("/userprofile/"+username);
                   // $modalInstance.close();
                    $timeout(function () {
                        $modalInstance.close();
                    }, 500);
                }
            });
        }
    };
});

