(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('validationPromise', validationPromise);

    /* @ngInject */
    function validationPromise($q) {

        var service = {
            reject: reject,
            rejectWithFirstMessage: rejectWithFirstMessage
        };

        function reject(response) {
            if (response.data && response.data.validationResult) {
                return $q.reject(response.data.validationResult.validationErrors);
            } else {
                return $q.reject();
            }
        }

        function rejectWithFirstMessage(response) {
            if (response.data && response.data.validationErrors) {
                return $q.reject(response.data.validationErrors[0].errorMessage);
            } else {
                return $q.reject();
            }
        }

        return service;

    }
})();
