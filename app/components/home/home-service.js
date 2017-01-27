(function () {
    'use strict';

    angular.module('jboss-client')
        .factory('HomeSrvc', Service);

    Service.$inject = ['$http'];

    function Service($http) {
        var methods = {
            status: status
        };
        return methods;

        //////////////////////
        function status() {
            return $http.get('jboss-api/status');
        }
    }
})();
