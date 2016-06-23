


app.factory("ProfileServices", function ($http, $rootScope) {
    var updateCurrentUser = function (password, email, firstName, lastName, username, photo) {
     var currentUser = {
            username: username,
            password: password,
            email: email,
            lastName: lastName,
            firstName: firstName,
            photo: photo
     }
    
        $http.post('/update', currentUser)
        .success(function (response) {
            $rootScope.currentUser = response;
         });

    }
    var updatePhoto = function (photo) {
        $rootScope.currentUser.photo = photo;
    }
        return {
            
            updateCurrentUser: updateCurrentUser,
            updatePhoto : updatePhoto
            
        }

});

app.controller("ProfileController", function ($scope, $routeParams, $http, $rootScope, ProfileServices) {
    var username = $routeParams.username;
    $(function () {
        $http.get('/userprofile/' + username)
        .success(function (res) {
           
            $rootScope.currentUser = res;
            var userinfo = $rootScope.currentUser;
            $scope.new_fn = userinfo.firstName;
            $scope.new_ln = userinfo.lastName;
            $scope.new_mail = userinfo.email;
            
            $scope.new_pwd = userinfo.password;
            $scope.re_pwd = userinfo.password2;
            if (userinfo.photo == null)
                $scope.loc = "../images/dp.jpg";
            else
                $scope.loc = userinfo.photo;

        });
    })

    $scope.mismatch = false;
    $scope.save = false;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        console.log("inside handle file select evt");
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                var photo = $scope.loc;
                ProfileServices.updatePhoto($scope.loc);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("File picked");
        document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }


    $scope.saveChanges = function () {
        var username = $rootScope.currentUser.username;
        var password = $scope.new_pwd;
        var repassword = $scope.re_pwd;
        var email = $scope.new_mail;
        var firstName = $scope.new_fn;
        var lastName = $scope.new_ln;
        var photo = $scope.loc;

        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            ProfileServices.updateCurrentUser(password, email, firstName, lastName, username, photo);
        }
    }
    
});