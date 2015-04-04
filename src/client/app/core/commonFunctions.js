(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('commonFunctions', commonFunctions);

    commonFunctions.$inject = [];

    /* @ngInject */
    function commonFunctions() {
        var service = {
            isValidPass: isValidPass,
            isPaidPass: isPaidPass
        };

        return service;

        function isValidPass(pass) {
            return pass.valid;
        }

        function isPaidPass(pass) {
            return pass.payment_status && pass.payment_status.toLowerCase() === 'paid';
        }
    }
})();