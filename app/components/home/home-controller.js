(function() {
    'use strict';

    angular.module('jboss-client')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['$scope', 'HomeSrvc', 'toaster'];

    function Controller($scope, HomeSrvc, toaster) {
        $scope.status = {};

        $scope.check = function() {

            HomeSrvc.status().then(function(res) {
                $scope.status = res;
                toaster.pop('success', '', 'Status check successful');

            }, function(err) {
                $scope.status = err;
                toaster.pop('error', '', 'There was an error checking the status');
            });
        }
    }
})();
