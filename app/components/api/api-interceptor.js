(function() {
    'use strict';

    angular.module('patternfly.app')
        .config(Interceptor);

    Interceptor.$inject = ['$httpProvider'];

    function Interceptor($httpProvider) {
        $httpProvider.interceptors.push('ApiHeaderSrvc');
    }
})();