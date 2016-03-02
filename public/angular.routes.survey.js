angular.module('usurvey.router.survey', [
    'ui.router',
    'ui.bootstrap'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('survey', {
                abstract: true,
                parent: "user",
                url : 'survey',
                views : {
                    'main@' : {
                        templateUrl: 'partials/survey/index',
                        controller: 'surveyController',
                        controllerAs: 'ctrl',
                    }
                },
            })
            .state('survey.create', {
                parent: "survey",
                url : '/create',
                views : {
                    'main@' : {
                        templateUrl: 'partials/survey/create',
                        controller: 'createsurveyController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('survey.view', {
                parent: "survey",
                url : '/view/{id}',
                views : {
                    'main@' : {
                        templateUrl: 'partials/survey/view',
                        controller: 'viewsurveyController',
                        controllerAs: 'ctrl',
                    }
                }
            })
            /*
            .state('survey.edit', {
                parent: "survey",
                url : '/edit/{id}',
                views : {
                    'surveystates@survey' : {
                        templateUrl: 'partials/survey/edit',
                        controller: 'editsurveyController',
                        controllerAs: 'ctrl',
                    }
                },
            })
            */
            .state('survey.analysis', {
                parent: "survey",
                url : '/analysis/{id}',
                views : {
                    'main@' : {
                        templateUrl: 'partials/survey/analysis',
                        controller: 'analysissurveyController',
                        controllerAs: 'ctrl'
                    }
                },
                resolve : {
                    getdeploySurvey : [
                        'surveyService',
                        '$stateParams',
                        function(surveyService, $stateParams){
                            surveyService.getquestionsdata($stateParams.id);
                        }
                    ]
                }
            })
            /*
            .state('survey.delete', {
                parent: "survey",
                url : '/delete',
                views : {
                    'surveystates@home.survey' : {
                        templateUrl: 'partials/survey/delete'
                    }
                },
            });
            */
    }
])