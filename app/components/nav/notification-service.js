(function () {
    'use strict';

    angular.module('patternfly.app')
        .factory('NotifySrvc', Service);

    Service.$inject = ['$rootScope', 'Notifications'];

    function Service($rootScope, Notifications) {

        var factory = {};

        factory.data = Notifications.data;

        factory.clear = function() {
          factory.notifications = [];
        };

        // initialize vars
        factory.clear();

        factory.success = function(msg) {
            notify('success', msg);
        };

        factory.error = function(msg) {
            notify('danger', msg);
        };

        factory.info = function(msg) {
            notify('info', msg);
        };

        factory.warning = function(msg) {
            notify('warning', msg);
        };

        function notify(type,msg) {
            factory.notifications.push({
                type: type,
                msg: msg
            });
            Notifications.message(type, '', msg);
            $rootScope.$emit('notificiation.new');
        }

        return factory;
    }
})();