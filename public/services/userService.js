'use strict';
angular.module("usurvey.services.users", [])
.factory("usersService", [
    '$http',
    'authenticationService',
    function($http, authenticationService) {
        var users = [];
        var notifications = [];
        return {
            users : users,
            notifications : notifications,
            getallusers : function(){
                return $http.get("/administrator/users", {
                        headers: {
                            Authorization: "Bearer " + authenticationService.gettoken()
                        }
                    }).then(function(response) {
                        angular.copy(response.data, users);
                        return response;
                    });
            },
            getallnotifications : function(){
                return $http.get("/administrator/notifications", {
                        headers: {
                            Authorization: "Bearer " + authenticationService.gettoken()
                        }
                    }).then(function(response) {
                        angular.copy(response.data, notifications);
                        return response;
                    });
            },
            activateuser : function(userid){
                return $http.post("/administrator/activateuser", userid,{
                    headers: {
                            Authorization: "Bearer " + authenticationService.gettoken(),
                            'Content-Type': 'application/json'
                    }
                }).success(function(data) {
                    return data;
                });
            }
        }
    }
]);
