/**
 * Created by SubhamMittal on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var dummyWebsites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    var websites = dummyWebsites;

    function WebsiteService() {
        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if (websites[i]._id == websiteId) {
                    websites.splice(i, 1);
                }
            }
        }

        return {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
    }
})();