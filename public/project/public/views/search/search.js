
app.controller("SearchController", function ($scope, $http, $routeParams) {
    
    //Search Tourist Destinations in A City
    var name = $routeParams.name;
    $scope.destinations = [];
    $(function () {
       
        console.log(name);

        // $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+name+"&radius=40733.60&client_id=DSXNCN1JEQ35TPMGFF0Z2MVDTM22OD0QEZPYRCQMDLLM5D11&client_secret=LS1AMD30R5WH1DHBTEZ0IFY31QJFYWCSYNRHQFEYNCRWBFDD&v=20111115&limit=5")
        
        $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+name+"&radius=40233.60&client_id=DSXNCN1JEQ35TPMGFF0Z2MVDTM22OD0QEZPYRCQMDLLM5D11&client_secret=LS1AMD30R5WH1DHBTEZ0IFY31QJFYWCSYNRHQFEYNCRWBFDD&v=20120630")
        .success(function (places) {
            var groups = places.response.groups;
            var destinations = groups[0].items;
            console.log(places);
            $scope.destinations = destinations;

        })
    })

    $scope.$watch("currentPage + numPerPage", function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    $scope.filteredVenues = $scope.destinations.slice(begin, end);
  });


  $scope.addVenue = function(){        
      console.log
      
      
        var venue = 
      {
        // name: $scope.venue.name, 
        // location: $scope.venue.location,
        // verified: $scope.venue.verified,
        // checkinsCount: $scope.venue.checkinsCount,
        // usersCount: $scope.venue.usersCount,
        // tipsCount: $scope.venue.tipCount,
        // contact: $scope.venue.contact.phone,
          rating: $scope.dest.venue.rating,
          name: $scope.dest.venue.name,
          cat: $scope.dest.venue.categories[0].name,
          tip: $scope.dest.tips[0].text,
          url: $scope.dest.venue.url,
      };
      
    
       
      console.log(venue.name);
      console.log(venue.rating);
      console.log(venue.cat);
      console.log(venue.tip);
      console.log(venue.url);
      alert(venue.name);
      $scope.destinations.push(venue);
    

    };

    $scope.removeObject = function(index){
      console.log("remove destinations"+ index);
      $scope.destinations.splice(index, 1);
    }
    $scope.selectObject = function(dest){
       
      $scope.dest=dest;
    }
    $scope.updateDest = function(dest){
       
      alert( "updated" + $scope.dest.venue.name);
    }
});


