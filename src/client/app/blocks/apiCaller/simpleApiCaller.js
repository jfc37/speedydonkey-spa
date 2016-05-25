(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('simpleApiCaller', simpleApiCaller);

    /* @ngInject */
    function simpleApiCaller($http, config, blockUI, logger) {
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        var service = {
            get: get,
            post: post,
            put: put,
            delete: remove,
            baseUrl: baseUrl
        };

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
            if (!options) {
                options = data;
                data = {};
            }

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

            if (options.parameters) {
                url = url + '?' + toQueryString(options.parameters);
            }

            return url;
        }

        function toQueryString(obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                }
            }
            return parts.join('&');
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
