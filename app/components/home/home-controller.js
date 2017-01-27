(function() {
    'use strict';

    angular.module('jboss-client')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['$scope', 'HomeSrvc'];

    function Controller($scope, HomeSrvc) {
        $scope.status = {};

        $scope.check = function() {
            HomeSrvc.status().then(function(res) {
                $scope.status = res;
            }, function(err) {
                $scope.status = err;
            });
        }
    }
})();
