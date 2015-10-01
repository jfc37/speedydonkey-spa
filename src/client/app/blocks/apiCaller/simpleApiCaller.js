(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('simpleApiCaller', simpleApiCaller);

    /* @ngInject */
    function simpleApiCaller($http, config, blockUI, logger) {
        var service = {
            get: get,
            post: post,
            put: put,
            delete: remove
        };
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        function get(options) {
            var url = generateUrl(options);
            var request = $http.get(url);

            handleError(request);

            if (options.block) {
                handleBlocking(request);
            }

            return request;
        }

        function post(data, options) {
            var url = generateUrl(options);
            var request = $http.post(url, data);

            handleError(request);
            handleBlocking(request);

            return request;
        }

        function put(data, options) {
            var url = generateUrl(options);

            var request = $http.put(url, data);

            handleError(request);
            handleBlocking(request);

            return request;
        }

        function remove(options) {
            var url = baseUrl + options.resource;

            if (options.id) {
                url = url + '/' + options.id;
            }

            var request = $http.delete(url);

            handleError(request);

            if (options.block) {
                handleBlocking(request);
            }

            return request;
        }

        function generateUrl(options) {
            var url = baseUrl + options.resource;

            if (options.id) {
                url = url + '/' + options.id;
            }

            if (options.search) {
                var q = 'q=';
                options.search.forEach(function (search, index) {
                    if (index > 0) {
                        q = q + ',';
                    }
                    q = q + search.field + '_' + search.condition + '_' + search.value;
                });
                url = url + '?' + q;
            }

            return url;
        }

        function handleBlocking(request) {
            blockUI.start();

            request.finally(function () {
                blockUI.stop();
            });
        }

        function handleError(request) {
            request.catch(function (response) {});
        }

        return service;

    }
})();
