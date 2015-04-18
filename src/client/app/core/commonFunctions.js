(function () {
    'use strict';

        if (!Array.prototype.any) {
            Array.prototype.any = function() {
               return this.length > 0;
            };
        }

        if (!Array.prototype.remove) {
            Array.prototype.remove = function(item) {
               var index = this.indexOf(item);
               if (index > -1) {
                this.splice(index, 1);
               }
            };
        }

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