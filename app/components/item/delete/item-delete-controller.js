(function() {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemDeleteCtrl', Controller);

    function Controller() {
        var $ctrl = this;

        $ctrl.item = $ctrl.resolve.item;

        $ctrl.ok = function() {
            $ctrl.close({$value: $ctrl.item});
        };

        $ctrl.cancel = function() {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
})();
