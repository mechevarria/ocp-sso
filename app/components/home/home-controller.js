(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['AuthSrvc'];

    function Controller(AuthSrvc) {
        var $ctrl = this;

        var name = AuthSrvc.profile.firstName + ' ' + AuthSrvc.profile.lastName;

        $ctrl.config = {
            icon: 'fa fa-arrow-circle-left',
            title: 'Welcome ' + name + ', to the JBoss Client',
            info: 'Click one of the links on the left to get started.'
        };

    }
})();
