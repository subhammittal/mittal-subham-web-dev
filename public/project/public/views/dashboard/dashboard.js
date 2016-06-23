
app.controller("DashboardController", function ($scope, $http, $routeParams, $rootScope, $location) {
    
    $(function () {
        var name = $routeParams.username;
        
        $http.get('/userdetails/' + name)
        .success(function (response) {
            $scope.user = response;
        });

        $http.get('/userreviews/' + name)
        .success(function (response) {
            $scope.reviews = response;
        });

        $http.get('/getlikedplaces/' + name)
        .success(function (response) {
            $scope.likes = response;
        });
        var usernow;
        if (!$rootScope.currentUser) {
            usernow = " ";
        }
        else {
            usernow = $rootScope.currentUser.username;
        }

        if (name != usernow)
            $scope.show = true;
        else
            $scope.show = false;
    })
    $scope.follow = function () {
        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Please Login to Follow User!');
            $location.url('/home');
        }
        else {
            console.log("inside follow");
            $scope.show = false;
            $scope.hide = true;
            var data = {
                sup: $routeParams.username,
                sub: $rootScope.currentUser.username
            }
            $http.post('/follow', data)
            .success(function (resp) {

            });
        }
    }
    $scope.unfollow = function () {
        console.log("inside unfollow");
        $scope.show = true;
        $scope.hide = false;
    }
});