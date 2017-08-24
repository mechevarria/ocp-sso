(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('NavCtrl', Controller);

    Controller.$inject = ['$rootScope', 'NotifySrvc', 'AuthSrvc'];

    function Controller($rootScope, NotifySrvc, AuthSrvc) {
        var $ctrl = this;

        $ctrl.logoutUrl = AuthSrvc.logoutUrl;

        $ctrl.navItems = [{
            title: "Status",
            iconClass: "fa fa-thumbs-up",
            uiSref: "status"
        }, {
            title: "Cars",
            iconClass: "fa fa-car",
            uiSref: "item"
        }];

        // Notifications
        $ctrl.notifications = NotifySrvc.data;
        $ctrl.menuItems = [];

        $ctrl.clear = function () {
            NotifySrvc.clear();
            refresh();
        };

        $ctrl.getClass = function (type) {
            switch (type) {
                case 'success':
                    return 'pficon-ok';
                case 'warning':
                    return 'pficon-warning-triangle-o';
                case 'danger':
                    return 'pficon-error-circle-o';
                default:
                    return 'pficon-info';
            }
        };

        $rootScope.$on('notificiation.new', function () {
            refresh();
        });

        function refresh() {
            $ctrl.menuItems = NotifySrvc.notifications;
            $ctrl.notifyCount = $ctrl.menuItems.length;
        }

    }
})();