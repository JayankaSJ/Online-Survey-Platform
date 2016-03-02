angular.module('usurvey.controllers.main', [
    'ui.router'
])
.controller('mainController', [
    '$scope',
    'surveyService',
    'authenticationService',
    function($scope, surveyService, authenticationService){
        if(authenticationService.loggedstatus()){
            surveyService.getallsurveys()
            .then(function(surveys){
                $scope.surveys = surveys;
            });
        }
    }
]);