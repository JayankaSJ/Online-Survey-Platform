angular.module('usurvey.router', [
    'ui.router'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
            
        $stateProvider
            .state('root',{
                abstract: true,
                views : {
                    'header@' : {
                        templateUrl : 'partials/header',
                        controller : 'NavController'
                    },
                    'main@' : {
                        templateUrl: 'partials/home',
                        controller: 'mainController'
                    }
                },
            })
            .state('home',{
                parent : 'root',
                url : '/',
                views : {
                    'main@' : {
                        templateUrl: 'partials/home',
                        controller: 'mainController'
                    }
                }
            })
            .state('user',{
                parent : 'root',
                url : '/',
                views : {
                    'main@' : {
                        templateUrl: 'partials/user/index',
                        controller: 'userController'
                    }
                },
                /*
                resolve : [
                    'authenticationService',
                    'surveyService',
                    function(authenticationService, surveyService){
                        if(authenticationService.loggedstatus()){
                            surveyService.getallsurveys();
                        }
                    }
                ]
                */
            })
            .state('user.surveys',{
                parent : 'user',
                url : '/surveys',
                views : {
                    'user.surveys@user' : {
                        templateUrl: 'partials/user/surveys',
                        controller: 'userController'
                    }
                }
            })
            .state('user.notifications',{
                parent : 'user',
                url : '/notifications',
                views : {
                    'user.notifications@user' : {
                        templateUrl: 'partials/user/notifications',
                        controller: 'userController'
                    }
                }
            })
            .state('user.search',{
                parent : 'user',
                url : '/search',
                views : {
                    'user.search@user' : {
                        templateUrl: 'partials/user/search',
                        controller: 'userController'
                    }
                }
            })
            .state('login', {
                parent : 'root',
                url : '/login',
                views : {
                    "authenticationform@root" : {
                        templateUrl: 'partials/login',
                        controller: 'authenticationController'
                    }
                }
            })
            .state('register', {
                parent : 'root',
                url : '/register',
                views : {
                    "authenticationform@root" : {
                        templateUrl: 'partials/register',
                        controller: 'authenticationController'
                    }
                }
                /*,
                resolve : [
                    'configurationServeice',
                    function(configurationServeice){
                        configurationServeice.getfaculties();
                    }
                ]
                */
            })
            .state('register.note', {
                parent : 'register',
                url : '/register/note',
                views : {
                    'authenticationform@root' : {
                        templateUrl: 'partials/registernote',
                        controller: 'registrationnoteController'
                    }
                }
            })
            .state('administrator', {
                parent : 'root',
                url: '/administrator',
                views : {
                    'main@' : {
                        templateUrl: 'partials/administrator/index',
                        controller: 'administratorController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('administrator.users', {
                parent : 'administrator',
                url: '/users',
                views : {
                    "administrator.users@administrator" : {
                        templateUrl: 'partials/administrator/users',
                        controller: 'administratorController',
                        controllerAs: 'ctrl'
                    }
                }
                /*,
                resolve : {
                    getUserPromise : [
                        'usersService',
                        function(usersService){
                            usersService.getallusers();
                        }
                    ]
                }
                */
            })
            .state('administrator.notifications', {
                parent : 'administrator',
                url: '/notifications',
                views : {
                    "administrator.notifications@administrator" : {
                        templateUrl: 'partials/administrator/notifications',
                        controller: 'administratorController',
                        controllerAs: 'ctrl'
                    }
                },
                resolve : {
                    getUserPromise : [
                        'usersService',
                        function(usersService){
                            usersService.getallnotifications();
                        }
                    ]
                }
            })
            .state('deploy', {
                parent: "root",
                url : '/deploy/{id}',
                views : {
                    'main@' : {
                        templateUrl: 'partials/survey/deploy',
                        controller: 'deploysurveyController',
                        controllerAs: 'ctrl'
                    }
                },
                resolve : {
                    getdeploySurvey : [
                        'surveyService',
                        '$stateParams',
                        function(surveyService, $stateParams){
                            surveyService.getdeploydata($stateParams.id);
                        }
                    ]
                }
            })
            .state('gettingstarted', {
                parent: "root",
                url : '/gettingstarted',
                views : {
                    'main@' : {
                        templateUrl: 'partials/gettingstarted'
                    }
                }
            })
            .state('aboutus', {
                parent: "root",
                url : '/aboutus',
                views : {
                    'main@' : {
                        templateUrl: 'partials/aboutus'
                    }
                }
            })
        $urlRouterProvider
            .otherwise('/');
    }
])