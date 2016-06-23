var app = angular.module("NavApp", ["ngRoute", "ui.bootstrap"]);

app.controller("NavController", function () {
    // Closes the sidebar menu
    // $("#menu-close").click(function (e) {
    //     e.preventDefault();
    //     $("#sidebar-wrapper").toggleClass("active");
    // });

    // Opens the sidebar menu
    $("#menu-toggle").click(function (e) {
       
         e.preventDefault();
         $("#sidebar-wrapper").toggleClass("active");
     });

    // Scrolls to the selected menu item on the page
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'
           
        }).
        when('/about', {
            templateUrl: 'views/About.html'

        }).
        when('/browse', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'

        }).
        when('/search/:name', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchController'
        }).
        when('/details/:name', {
            templateUrl: 'views/details/details.html',
            controller: 'DetailsController'
        }).
        when('/userprofile/:username', {
             templateUrl: 'views/profile/edit_profile.html',
             controller: 'ProfileController'
        }).
        when('/dashboard/:username', {
             templateUrl: 'views/dashboard/dashboard.html',
             controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

