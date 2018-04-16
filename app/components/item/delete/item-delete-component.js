(function() {
    'use strict';

    angular.module('patternfly.app')
        .component('appItemDelete', {
            templateUrl: 'app/components/item/delete/item-delete.html',
            controller: 'ItemDeleteCtrl',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            }
        });
})();
