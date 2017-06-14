(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('ToastCtrl', Controller);

    Controller.$inject = ['$scope', 'Notifications'];

    function Controller($scope, Notifications) {

        $scope.$on('success', function (event, data) {
            notify('success', data);
        });

        $scope.$on('error', function (event, data) {
            notify('danger', data);
        });

        $scope.$on('info', function (event, data) {
            notify('info', data);
        });

        $scope.$on('warning', function (event, data) {
            notify('warning', data);
        });

        function notify(type, msg) {
            Notifications.message(type, '', msg);
        }

        $scope.notifications = Notifications.data;
    }
})();

