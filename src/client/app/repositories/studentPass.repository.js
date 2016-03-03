(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('studentPassRepository', studentPassRepository);

    /* @ngInject */
    function studentPassRepository(simpleApiCaller) {
        var service = {
            get: get,
            purchase: purchase
        };

        return service;

        function get(student) {
            var options = {
                resource: 'users/' + student.id + '/passes',
                block: true
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data;
            }, function (response) {
                if (response.status === 404) {
                    return [];
                }
            });
        }

        function purchase(student, passOption) {
            var options = {
                resource: 'users/' + student.id + '/pass-templates/' + passOption.id,
                block: true
            };

            var pass = {
                paymentStatus: 'paid'
            };

            return simpleApiCaller.post(pass, options).then(function (response) {
                return response.data.actionResult.passes.sort(function (pass) {
                    return pass.id;
                })[0];
            });
        }
    }
})();
