(function() {
    'use strict';

    angular.module('jboss-client')
        .factory('ItemSrvc', Service);

    Service.$inject = ['$resource'];

    function Service($resource) {
        return $resource('item-app/items/:id', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }
})();
