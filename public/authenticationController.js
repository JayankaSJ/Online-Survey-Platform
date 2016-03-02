"use strict";
angular.module('usurvey.controllers.authentication', [
    'ui.router'
])
.controller('authenticationController', [
    '$scope',
    '$state',
    'authenticationService',
    'configurationServeice',
    function($scope, $state, authenticationService, configurationServeice){
        
        //$scope.facultys = configurationServeice.faculties;
        configurationServeice.getfaculties()
        .then(function(response){
            var temp = [];
            response.data.forEach(function(element) {
                temp.push(element.name);
            }, this);
            $scope.facultys = temp;
        })
        
        $scope.user = {};
        $scope.$parent.administrator = {};
        
        $scope.register = function() {
            authenticationService.register($scope.user)
            .success(function(data) {
                $scope.$parent.administrator = data.administrator;
                $state.go("register.note");
            })
            .error(
                function(error) {
                    $scope.error = error;
                }).then(
                function() {
                    //$state.go("register");
                });
            //$state.go("register.note");
        }

      $scope.logIn = function() {
          authenticationService.login($scope.user).error(
              function(error) {
              $scope.error = error;
          }).then(function() {
              //$state.go("login");
          });
      }
    }
]).controller('registrationnoteController', [
    '$scope',
    function($scope){
        $scope.admin = $scope.$parent.administrator;
    }
]);