(function () {
    'use strict';

    angular.module('patternfly.app')
        .factory('StatusSrvc', Service);

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
