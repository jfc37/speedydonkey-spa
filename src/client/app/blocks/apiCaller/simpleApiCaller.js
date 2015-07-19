(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('simpleApiCaller', simpleApiCaller);

    simpleApiCaller.$inject = ['$http', 'config', 'blockUI', 'logger'];

    /* @ngInject */
    function simpleApiCaller($http, config, blockUI, logger) {
        var service = {
            post: post
        };
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        function post(data, options) {
            var url = baseUrl + options.resource;
            blockUI.start();

            return $http.post(url, data).catch(function (response) {
                logger.error('Issue with POST: ' + response);
            }).finally(function () {
                blockUI.stop();
            });
        }

        return service;

    }
})();
