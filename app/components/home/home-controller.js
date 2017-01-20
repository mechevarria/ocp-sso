(function() {
    'use strict';

    angular.module('jboss-client')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {
        $scope.welcome = 'Welcome to the jboss-client-app!';
    }
})();
