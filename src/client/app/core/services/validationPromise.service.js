var jfc;
(function (jfc) {
    'use strict';
    var ValidationPromise = (function () {
        /* @ngInject */
        function ValidationPromise($q) {
            this.$q = $q;
        }
        ValidationPromise.prototype.reject = function (response) {
            if (response.data && response.data.validationResult) {
                return this.$q.reject(response.data.validationResult.validationErrors);
            }
            else {
                return this.$q.reject();
            }
        };
        ValidationPromise.prototype.rejectWithFirstMessage = function (response) {
            if (response.data && response.data.validationErrors) {
                return this.$q.reject(response.data.validationErrors[0].errorMessage);
            }
            else {
                return this.$q.reject();
            }
        };
        return ValidationPromise;
    }());
    angular
        .module('app.core')
        .service('validationPromise', ValidationPromise);
})(jfc || (jfc = {}));
