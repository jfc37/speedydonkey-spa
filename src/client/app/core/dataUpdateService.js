(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataUpdateService($q, apiCaller) {
        var service = {
            enrolInBlock: enrolInBlock
        };

        return service;

        function enrolInBlock(parameters) {
            return $q(function (resolve, revoke) {
                apiCaller.postBlockEnrolment(parameters).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }
    }
})();