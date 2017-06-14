(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('StatusCtrl', Controller);

    Controller.$inject = ['$scope', 'StatusSrvc'];

    function Controller($scope, StatusSrvc) {

        $scope.status = {};

        $scope.check = function() {

            StatusSrvc.status().then(function(res) {
                $scope.status = res;
                $scope.$emit('success', 'Successfully checked status');

            }, function(err) {
                $scope.status = err;
                $scope.$emit('error', 'Failed to check status');
            });
        };
    }
})();
