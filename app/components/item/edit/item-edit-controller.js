(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemEditCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModalInstance', 'item'];

    function Controller($scope, $uibModalInstance, item) {
        $scope.item = item;

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function activate() {
            var year = new Date().getFullYear();
            var range = [];
            range.push(year.toString());
            for (var i = 1; i < 30; i++) {
                range.push( (year - i).toString() );
            }
            $scope.years = range;
        }

        activate();
    }
})();
