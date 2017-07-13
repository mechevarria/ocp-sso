(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('NavCtrl', Controller);

    Controller.$inject = ['$rootScope', 'Notifications'];

    function Controller($rootScope, Notifications) {
        var $ctrl = this;

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
        $ctrl.clear = function () {
            $ctrl.notifyCount = 0;
            $ctrl.menuItems = [];
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

        $ctrl.clear();

        $rootScope.$on('success', function (event, data) {
            notify('success', data);
        });

        $rootScope.$on('error', function (event, data) {
            notify('danger', data);
        });

        $rootScope.$on('info', function (event, data) {
            notify('info', data);
        });

        $rootScope.$on('warning', function (event, data) {
            notify('warning', data);
        });

        function notify(type, msg) {
            $ctrl.notifyCount++;
            $ctrl.menuItems.push({
                type: type,
                msg: msg
            });
            Notifications.message(type, '', msg);
        }

        $ctrl.notifications = Notifications.data;
    }
})();