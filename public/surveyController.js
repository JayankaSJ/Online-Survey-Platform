"use strict";

angular.module('usurvey.controllers.survey', [])
.controller('surveyController', [
    '$scope',
    '$state',
    function($scope, $state){
        
    }
]);

angular.module('usurvey.controllers.createsurvey', [
    'mwFormBuilder'
])
.config(function($translateProvider){
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '/angular-surveys.json'
    });
    $translateProvider.preferredLanguage('en');
})
.controller('createsurveyController', [
    '$scope',
    '$state',
    'surveyService',
    function($scope, $state, surveyService){
        var ctrl = this;
        ctrl.headersWithQuestionNumber = true;
        ctrl.languages = ['en', 'pl'];
        
        ctrl.builderReadOnly = false;
        ctrl.viewerReadOnly = false;
        ctrl.formViewer = {};
        ctrl.formOptions = {
            autoStart: false
        };
        ctrl.builderReadOnly = false;
        ctrl.formBuilder = {};
        ctrl.formData = {};
        ctrl.formStatus = {};
        ctrl.responseData={};
        ctrl.showResponseRata=false;
        
        ctrl.save = function(){
            surveyService.create(ctrl.formData);
            $state.go("home");
        }
    }
]);

angular.module('usurvey.controllers.viewsurvey', [
    'mwFormViewer'
])
.config(function($translateProvider){
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '/angular-surveys.json'
    });
    $translateProvider.preferredLanguage('en');
})
.controller('viewsurveyController', [
    '$stateParams',
    'surveyService',
    function($stateParams, surveyService){
        var ctrl = this;
        ctrl.headersWithQuestionNumber = true;
        ctrl.builderReadOnly = false;
        ctrl.viewerReadOnly = false;
        ctrl.formViewer = {};
        ctrl.formOptions = {
            autoStart: false
        };
        ctrl.builderReadOnly = false;
        ctrl.formBuilder = {};
        ctrl.formData = {};
        ctrl.formStatus = {};
        ctrl.responseData={};
        ctrl.showResponseRata=false;
        
        ctrl.formData = surveyService.load($stateParams.id);
    }
]);

angular.module('usurvey.controllers.deploysurvey', [
    'mwFormBuilder',
    'mwFormViewer'
])
.config(function($translateProvider){
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '/angular-surveys.json'
    });
    $translateProvider.preferredLanguage('en');
})
.controller('deploysurveyController', [
    '$stateParams',
    'surveyService',
    function($stateParams, surveyService){
        var ctrl = this;
        ctrl.languages = ['en', 'pl'];
        ctrl.headersWithQuestionNumber = true;
        ctrl.builderReadOnly = false;
        ctrl.viewerReadOnly = false;
        ctrl.formViewer = {};
        ctrl.formOptions = {
            autoStart: false
        };
        ctrl.builderReadOnly = false;
        ctrl.formBuilder = {};
        ctrl.formData = {};
        ctrl.formStatus = {};
        ctrl.responseData={};
        ctrl.showResponseRata=false;
        
        
        ctrl.formData = surveyService.deploy;
        ctrl.saveResponse = function(){
            surveyService.saveResponce(ctrl.responseData);
        };
    }
]);


angular.module('usurvey.controllers.analysissurvey', [
    'mwFormViewer'
])
.config(function($translateProvider){
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '/angular-surveys.json'
    });
    $translateProvider.preferredLanguage('en');
})
.controller('analysissurveyController', [
    '$scope',
    '$stateParams',
    'surveyService',
    'c3SimpleService',
    function($scope, $stateParams, surveyService, c3SimpleService){
        var ctrl = this;
        /*
        ctrl.headersWithQuestionNumber = true;
        ctrl.builderReadOnly = false;
        ctrl.viewerReadOnly = false;
        ctrl.formViewer = {};
        ctrl.formOptions = {
            autoStart: false
        };
        ctrl.builderReadOnly = false;
        ctrl.formBuilder = {};
        ctrl.formData = {};
        ctrl.formStatus = {};
        ctrl.responseData={};
        ctrl.showResponseRata=false;
        
        ctrl.formData = surveyService.load($stateParams.id);
        */
        surveyService.getquestionsdata($stateParams.id)
        .then(function(questions){
            ctrl.questions = questions.data;
        });

        $scope.chart = {};

        this.getsummery = function(questionid){
            var questionsummery = surveyService.getquestiondata($stateParams.id, questionid);
            questionsummery.then(function(data){
                var result = [];
                for(var i in data.data){
                    var temp = [];
                    temp.push(i);
                    temp.push(data.data[i]);
                    result.push(temp);
                }
                
                $scope.chart = {
                    data : {
                        columns: result,
                         type: 'bar'
                    },
                    axis : {
                        x : {
                            type: 'category',
                            categories: ['0']
                        }
                    },
                    tooltip : {
                        format : {
                            value : function(value, ratio, id){
                                return value;
                            }
                        }
                    },
                    legend : {
                        show: false
                    }
                };
            });    
        }
        
    }
]);

