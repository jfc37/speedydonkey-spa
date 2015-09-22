(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('simpleApiCaller', simpleApiCaller);

    /* @ngInject */
    function simpleApiCaller($http, config, blockUI, logger) {
        var service = {
            get: get,
            post: post
        };
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        function get(options) {
            var url = baseUrl + options.resource;

            if (options.id) {
                url = url + '/' + options.id;
            }

            var request = $http.get(url);

            handleError(request);

            if (options.block) {
                handleBlocking(request);
            }

            return request;
        }

        function post(data, options) {
            var url = baseUrl + options.resource;

            var request = $http.post(url, data);

            handleError(request);
            handleBlocking(request);

            return request;
        }

        function handleBlocking(request) {
            blockUI.start();

            request.finally(function () {
                blockUI.stop();
            });
        }

        function handleError(request) {
            request.catch(function (response) {
                logger.error('Issue with ' + response.config.method + ' : ' + response);
            });
        }

        return service;

    }
})();
