(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"

            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedin()
                .then(
                    function(res) {
                        var user = res.data;
                        if (user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(error) {
                        deferred.reject();
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }

})();