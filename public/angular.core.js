angular.module('usurvey', [
    'usurvey.router',
    'usurvey.router.survey',
    'usurvey.controllers.main',
    'usurvey.controllers.survey',
    'usurvey.controllers.user',
    'usurvey.controllers.createsurvey',
    'usurvey.controllers.viewsurvey',
    'usurvey.controllers.analysissurvey',
    'usurvey.controllers.deploysurvey',
    'usurvey.controllers.nav',
    'usurvey.controllers.authentication',
    'usurvey.controllers.administrator',
    'usurvey.services.authentication',
    'usurvey.services.survey',
    'usurvey.services.configuration',
    'usurvey.services.users',
    
    
    'angular-c3-simple',
    
    'pascalprecht.translate',
    'monospaced.elastic',
    
    'ui.router'
])
.run([
    '$rootScope',
    '$state',
    '$stateParams',
    'authenticationService',
    function($rootScope, $state, $stateParams, authenticationService){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(authenticationService.loggedstatus() && toState.name=="home"){
                if(authenticationService.defaultsate()=="administrator"){
                    event.preventDefault();
                    $state.go("administrator");
                }
                if(authenticationService.defaultsate()=="user"){
                    event.preventDefault();
                    $state.go("user");
                }
            }
            if(!authenticationService.loggedstatus()){
                /*
                if(toState.parent=="root" && toState.name=="home" && fromState.parent=="root" && (fromState.name=="user" || fromState.name=="administrator")){
                    event.preventDefault();
                    $state.go("home");
                }
                */
                if(toState.name!="home" && toState.name!="login" && toState.name!="register" && toState.name!="register.note" && toState.name!="deploy" && toState.name!="gettingstarted" && toState.name!="aboutus"){
                    event.preventDefault();
                    $state.go("login");
                }
            }
        });
        
    }
]);
