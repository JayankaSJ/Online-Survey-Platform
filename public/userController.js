angular.module('usurvey.controllers.user', [
    'ui.router'
])
.controller('userController', [
    '$scope',
    'surveyService',
    function($scope, surveyService){
        //$scope.surveys = surveyService.surveys;
        surveyService.getallsurveys()
        .then(function(response){
            if(response){
                response.data.forEach(function(element) {
                    element['link'] = "http://127.0.0.1:3000/#/deploy/" + element._id;
                }, this);
                $scope.surveys = response.data;
            }
        });
    }
]);