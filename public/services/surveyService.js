'use strict';
angular.module("usurvey.services.survey", [])
.factory("surveyService", [
    "$http",
    'authenticationService',
    function($http, authenticationService) {
        var surveys = [];
        var deploy = [];
        var question = [];
        var questions = [];
        return {
            surveys: surveys,
            deploy : deploy,
            question : question,
            questions : questions,
            save : function(survey){
                survey.pages = JSON.stringify(survey.pages);
                $http.post("survey/edit", survey,{
                    headers: {
                        Authorization: "Bearer " + authenticationService.gettoken()
                    }
                }).success(function(data) {
                    surveys.push(data);
                });
            },
            create : function(survey){
                survey.pages = JSON.stringify(survey.pages);
                $http.post("survey/create", survey,{
                    headers: {
                        Authorization: "Bearer " + authenticationService.gettoken(),
                        'Content-Type': 'application/json'
                    }
                }).success(function(data) {
                    surveys.push(data);
                });
            },
            load : function(id){
                var ret = null;
                surveys.forEach(function(element) {
                    if(element._id == id){
                        ret = element;
                    }
                }, this);
                return ret;
            },
            getallsurveys : function(){
                if(authenticationService.loggedstatus()){
                    return $http.get("survey", {
                        headers: {
                            Authorization: "Bearer " + authenticationService.gettoken()
                        }
                    }).then(function(response) {
                        response.data.forEach(function(element) {
                            element.pages = JSON.parse(element.pages);
                        }, this);
                        angular.copy(response.data, surveys);
                        return response;
                    });
                }
            },
            getdeploydata : function(id){
                $http.get("/deploy/" + id)
                .then(function(response) {
                    response.data.pages = JSON.parse(response.data.pages);
                    angular.copy(response.data, deploy);
                });
            },
            saveResponce : function(data){
                data = JSON.stringify(data);
                $http.post("/deploy/" + deploy._id, data)
                .success(function(data) {
                    //var r = data;
                });
            },
            
            getquestionsdata : function(id){
                return $http.get("survey/questions/" + id ,{
                        headers: {
                            Authorization: "Bearer " + authenticationService.gettoken()
                        }
                    })
                .success(function(response) {
                    for(var i in response){
                        response[i].id = i;
                        questions.push(response[i]);
                    }
                    return questions;
                });
            },
            getquestiondata : function(surveyid, questionid){
                return $http.get("survey/question/" + surveyid + "/" + questionid,{
                         headers: {
                            Authorization: "Bearer " + authenticationService.gettoken()
                         }
                    })
                .success(function(response) {
                    return response;
                });
            }
        };
    }
]);
