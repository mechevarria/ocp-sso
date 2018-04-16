(function () {
    'use strict';

    angular.module('patternfly.app')
        .factory('StatusSrvc', Service);

    Service.$inject = ['$http'];

    function Service($http) {
        return {
            status: status
        };

        function status() {
            return $http.get('jboss-api/status');
        }
    }
})();
