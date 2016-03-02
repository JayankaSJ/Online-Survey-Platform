angular.module('usurvey.controllers.nav', [
    'ui.router'
])
.controller('NavController', [
    '$scope',
    '$state',
    'authenticationService',
    function($scope, $state, authenticationService){
        
        $scope.loggedstatus = authenticationService.loggedstatus;
        $scope.user = authenticationService.user;
        $scope.logout = authenticationService.logout;
        $scope.createsurvey = function(){
            if((
                ($state.current.name == 'user') ||
                ($state.current.name == 'user.surveys') ||
                ($state.current.name == 'user.notifications') || 
                ($state.current.name == 'user.search')) && (authenticationService.loggedstatus())){
                return true;
            }
            return false;
        };
    }
]);