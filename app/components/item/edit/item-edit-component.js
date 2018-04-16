(function() {
    'use strict';

    angular.module('patternfly.app')
        .component('appItemEdit', {
            templateUrl: 'app/components/item/edit/item-edit.html',
            controller: 'ItemEditCtrl',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            }
        });
})();
