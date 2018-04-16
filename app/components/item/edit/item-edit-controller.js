(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemEditCtrl', Controller);

    function Controller() {
        var $ctrl = this;

        $ctrl.item = $ctrl.resolve.item;

        $ctrl.ok = function () {
            $ctrl.close({$value: $ctrl.item});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };

        $ctrl.$onInit = function() {
            var year = new Date().getFullYear();
            var range = [];
            range.push(year.toString());
            for (var i = 1; i < 30; i++) {
                range.push((year - i).toString());
            }
            $ctrl.years = range;
        }

    }
})();
