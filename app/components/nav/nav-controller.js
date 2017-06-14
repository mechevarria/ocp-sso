(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('NavCtrl', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {

        $scope.navItems = [
            {
                title: "Status",
                iconClass: "fa fa-thumbs-up",
                uiSref: "status"
            },
            {
                title: "Cars",
                iconClass : "fa fa-car",
                uiSref: "item"
            }
        ];
    }
})();