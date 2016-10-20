(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var next_website_id = 900;
        var websites = [
            { "_id": 123, "name": "Facebook",    "developerId": 456, "description": "Lorem" },
            { "_id": 234, "name": "Tweeter",     "developerId": 456, "description": "Lorem" },
            { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description": "Lorem" },
            { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description": "Lorem" },
            { "_id": 678, "name": "Checkers",    "developerId": 123, "description": "Lorem" },
            { "_id": 789, "name": "Chess",       "developerId": 234, "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website._id = next_website_id;
            website.developerId = userId;
            next_website_id += 111;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            result = []
            for(var w in websites) {
                if(websites[w].developerId === userId)
                    result.push(websites[w])
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId)
                    return websites[w];
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if (websites[w]._id == websiteId) {
                    websites.splice(w, 1);
                    break;
                }
            }
        }
    }
})();