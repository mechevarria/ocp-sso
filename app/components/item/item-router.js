(function() {
    'use strict';

    angular.module('jboss-client')
        .config(Router);

    Router.$inject = ['$routeProvider'];
    
    function Router($routeProvider) {
        $routeProvider
            .when('/items', {
                templateUrl: 'app/components/item/items.html',
                controller: 'ItemCtrl'
            });
    }
})();
