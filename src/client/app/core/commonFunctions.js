(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('commonFunctions', commonFunctions);

    commonFunctions.$inject = [];

    /* @ngInject */
    function commonFunctions() {
        var service = {
            isValidPass: isValidPass
        };

        return service;

        function isValidPass(pass) {
            return pass.valid;
        }
    }
})();