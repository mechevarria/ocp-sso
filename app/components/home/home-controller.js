(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['AuthSrvc', 'NotifySrvc'];

    function Controller(AuthSrvc, NotifySrvc) {
        var $ctrl = this;

        var name = '';
        if(AuthSrvc.loggedIn) {
            name = AuthSrvc.profile.firstName + ' ' + AuthSrvc.profile.lastName + ', ';
        } else {
            NotifySrvc.warning('You are not logged in');
        }

        $ctrl.config = {
            icon: 'fa fa-arrow-circle-left',
            title: 'Welcome ' + name + 'to the JBoss Client',
            info: 'Click one of the links on the left to get started.'
        };

    }
})();
