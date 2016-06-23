
app.controller("DetailsController", function ($scope, $http, $routeParams, $rootScope, $location) {
    var cat;
    var place = $routeParams.name;
    console.log(place);

    $(function () {
        $scope.placename = place;
        var username;
        if(!$rootScope.currentUser)
            username = "" 
        else
            username = $rootScope.currentUser.username;
        var data = {
            username: username,
            place: place
            
        }
        $http.post('/getlike', data)
        .success(function (resp) {
            console.log(resp);
            if (resp == null) {
                $scope.show = true;
                $scope.hide = false;
            } 
            else {
                if (resp.like == 'l') {
                    $scope.show = false;
                    $scope.hide = true;
                }
                else {
                    $scope.show = true;
                    $scope.hide = false;
                }

                
            }
        });



        var details = null;
        var lname = place.toLowerCase();
        var removed = lname.replace("the ", "");
        var replaced = removed.replace(/ /g, "_");
        console.log(replaced);
        $http.get("https://www.googleapis.com/freebase/v1/text/en/" + replaced + "?key=AIzaSyDoDjvyo5Yn_kvSJ8Z2F6dQpHe5xBvO2CQ")
        .success(function (res) {
            $scope.details = res.result;

        })
        $http.jsonp("https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + place +"&callback=JSON_CALLBACK")
        .success(function (result) {
            var photos = result.responseData.results;
            $('#Photo').css({
                "max-height": '50px',
                "max-width": '50px'
            });
            $scope.results = photos;
           
        });
        $(".fancybox").fancybox();

        $http.get('/getreviews/' + place)
        .success(function (res) {
            
            $scope.comments = res;
        });

    })


    $scope.like = function () {
        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Please Login to Bookmark Page!');
            $location.url('/home');
        }
        else {
            var username = $rootScope.currentUser.username;
            var place = $routeParams.name;
            
            console.log('PLACE');
            console.log(place);
            
            $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+place+"&radius=40733.60&client_id=DSXNCN1JEQ35TPMGFF0Z2MVDTM22OD0QEZPYRCQMDLLM5D11&client_secret=LS1AMD30R5WH1DHBTEZ0IFY31QJFYWCSYNRHQFEYNCRWBFDD&v=20121115")
            .success(function (places) {
                var groups = places.response.groups;
                var dest = groups[0].items[0];
                var cat = dest.venue.categories[0].name;
                var url = dest.venue.url;
                var tip = dest.tips[0].text;
                var like = 'l';
                var likedata = {
                    username: username,
                    place: place,
                    like: like,
                    cat: cat,
                    tip: tip,
                    url: url

                }
                console.log(likedata);
                $http.post('/like', likedata)
                .success(function (response) {
                    $scope.show = false;
                    $scope.hide = true;
                });

            });

            
        }
    }
    $scope.unlike = function () {
        var username = $rootScope.currentUser.username;
        var place = $routeParams.name;
        var like = 'u';
        var likedata = {
            username: username,
            place: place,
            like : like
        }

        $http.put('/unlike', likedata)
        .success(function (response) {
            $scope.show = true;
            $scope.hide = false;
        });
    }







    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / 5);
    };
    
    $scope.addreview = function () {
        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Please Login to add review!');
            $location.url('/home');
        }
       
    }
    $scope.postreview = function () {
    
        var rate = $scope.rate;
        var comment = $scope.comment;
        var review = {
            place: place,
            username: $rootScope.currentUser.username,
            userphoto: $rootScope.currentUser.photo,
            rate: rate,
            comment : comment
        }
        $http.post('/review', review)
        .success(function (response) {
            
        });
        $scope.pressed = true;
    }

   
});