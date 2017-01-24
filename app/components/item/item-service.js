(function() {
    'use strict';

    angular.module('jboss-client')
        .factory('ItemSrvc', Service);

    Service.$inject = ['$resource'];

    function Service($resource) {
        return $resource('jboss-api/item/:id', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }
})();
