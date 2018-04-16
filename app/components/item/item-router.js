(function() {
    'use strict';

    angular.module('patternfly.app')
        .config(Router);

    Router.$inject = ['$stateProvider'];

    function Router($stateProvider) {
        $stateProvider
            .state({
                name: 'item',
                url:'/item',
                component: 'appItem',
                ncyBreadcrumb: {
                    label: 'Cars',
                    parent: 'home'
                }
            });

    }
})();
