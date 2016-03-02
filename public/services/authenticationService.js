'use strict';

  var app = angular.module("usurvey.services.authentication", []);

  app.factory("authenticationService", [
    "$http",
    '$state',
    "$window",
    function($http, $state, $window){
        return {
            
            register : function(user){
                return $http.post("/register", user)
                .success(function(data) {
                    //$window.localStorage["usurvey"] = data.token;
                    //$window.localStorage["defaultstate"] = data.redirectTo;
                    //$state.go(data.redirectTo);
                });
            },
            
            login : function(user){
                return $http.post("/login", user)
                .success(function(data) {
                    $window.localStorage["usurvey"] = data.token;
                    $window.localStorage["defaultstate"] = data.redirectTo;
                    $state.go(data.redirectTo);
                });
            },
            
            logout : function(){
                $window.localStorage.removeItem("usurvey");
                $window.localStorage.removeItem("defaultstate");
                $state.go('home');
            },
            
            gettoken : function() {
                return $window.localStorage["usurvey"];
            },
            
            loggedstatus : function(){
                var token = $window.localStorage["usurvey"];
                if (token) {
                    var payload = JSON.parse($window.atob(token.split(".")[1]));
                     return payload.exp > Date.now() / 1000;
                }
                else {
                    return false;
                }
            },
            defaultsate : function(){
                var token = $window.localStorage["defaultstate"];
                if (token) {
                    return $window.localStorage["defaultstate"];
                }
                else {
                    return 'home';
                }
            },
            
            user : function(){
                var token = $window.localStorage["usurvey"];
                if (token) {
                    var payload = JSON.parse($window.atob(token.split(".")[1]));
                     return payload.displayname;
                }
            },
        }
    }
  ]);
