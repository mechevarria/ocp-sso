(function() {
    'use strict';

    angular.module('patternfly.app')
        .config(Router);

    Router.$inject = ['$stateProvider'];

    function Router($stateProvider) {

        $stateProvider
            .state({
                name: 'status',
                url:'/status',
                component: 'appStatus',
                ncyBreadcrumb: {
                    label: 'Status',
                    parent: 'home'
                }
            });

    }
})();
