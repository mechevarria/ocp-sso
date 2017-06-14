(function() {
    'use strict';

    angular.module('patternfly.app')
        .config(Router);

    Router.$inject = ['$stateProvider','$urlRouterProvider'];

    function Router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('status');

        $stateProvider
            .state({
                name: 'status',
                url:'/status',
                controller: 'StatusCtrl',
                templateUrl: 'app/components/status/status.html'
            });

    }
})();
