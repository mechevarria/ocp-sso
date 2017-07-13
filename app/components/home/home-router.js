(function() {
    'use strict';

    angular.module('patternfly.app')
        .config(Router);

    Router.$inject = ['$stateProvider','$urlRouterProvider'];

    function Router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state({
                name: 'home',
                url:'/home',
                component: 'appHome',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            });

    }
})();
