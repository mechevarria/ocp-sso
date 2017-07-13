(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('StatusCtrl', Controller);

    Controller.$inject = ['$rootScope', 'StatusSrvc'];

    function Controller($rootScope, StatusSrvc) {
        var $ctrl = this;

        $ctrl.status = {};

        $ctrl.check = function() {

            StatusSrvc.status().then(function(res) {
                $ctrl.status = res;
                $rootScope.$emit('success', 'Successfully checked status');

            }, function(err) {
                $ctrl.status = err;
                $rootScope.$emit('error', 'Failed to check status');
            });
        };
    }
})();
