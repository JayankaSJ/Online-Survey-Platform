'use strict';
angular.module("usurvey.services.configuration", [])
.factory("configurationServeice", [
    '$http',
    'authenticationService',
    function($http, authenticationService) {
        var faculties = [];
        return {
            faculties : faculties,
            getfaculties : function(){
                return $http.get("/config/faculties")
                    .success(function(response) {
                        response.forEach(function(element) {
                            faculties.push(element.name);
                        }, this);
                        return response;
                    });
            }
        }
    }
]);
