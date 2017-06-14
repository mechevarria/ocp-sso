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
                controller: 'ItemCtrl',
                templateUrl: 'app/components/item/item.html'
            });

    }
})();
