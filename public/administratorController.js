angular.module('usurvey.controllers.administrator', [
    'ui.router'
])
.controller('administratorController', [
    '$scope',
    'usersService',
    function($scope, usersService){
        //this.users = usersService.users;
        //$scope.users = usersService.getallusers()
        usersService.getallusers()
        .then(function(response){
            $scope.users = response.data;
        })
        
        usersService.getallnotifications()
        .then(function(response){
            $scope.notifications = response.data;
        })
        
        this.activateuser = function(userid){
            usersService.activateuser(userid)
            .then(function(response){
                var sss =0;
            })
        }
    }
]);