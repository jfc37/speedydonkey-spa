var jfc;
(function (jfc) {
    'use strict';
    var HttpService = (function () {
        function HttpService($http, config, blockUI) {
            this.$http = $http;
            this.config = config;
            this.blockUI = blockUI;
            this._baseUrl = 'https://' + config.apiUrl + '/api/';
        }
        HttpService.prototype.get = function (options) {
            var url = this.generateUrl(options);
            var request = this.$http.get(url);
            this.handleError(request);
            if (options.block) {
                this.handleBlocking(request);
            }
            return request;
        };
        HttpService.prototype.post = function (options, data) {
            var url = this.generateUrl(options);
            var request = this.$http.post(url, data);
            this.handleError(request);
            this.handleBlocking(request);
            return request;
        };
        HttpService.prototype.put = function (options, data) {
            var url = this.generateUrl(options);
            var request = this.$http.put(url, data);
            this.handleError(request);
            this.handleBlocking(request);
            return request;
        };
        HttpService.prototype.delete = function (options) {
            var url = this._baseUrl + options.resource;
            if (options.id) {
                url = url + '/' + options.id;
            }
            var request = this.$http.delete(url);
            this.handleError(request);
            if (options.block) {
                this.handleBlocking(request);
            }
            return request;
        };
        HttpService.prototype.generateUrl = function (options) {
            var url = this._baseUrl + options.resource;
            if (options.id) {
                url = url + '/' + options.id;
            }
            if (options.search) {
                this.formatDates(options.search);
                var q_1 = 'q=';
                options.search.forEach(function (search, index) {
                    if (index > 0) {
                        q_1 = q_1 + ',';
                    }
                    q_1 = q_1 + search.field + '_' + search.condition + '_' + search.value;
                });
                url = url + '?' + q_1;
            }
            if (options.parameters) {
                this.formatDates(options.parameters);
                url = url + '?' + this.toQueryString(options.parameters);
            }
            return url;
        };
        HttpService.prototype.formatDates = function (obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    var value = obj[i];
                    if (this.isDate(value) || moment.isMoment(value)) {
                        obj[i] = value.toISOString();
                    }
                    else if (this.isObject(value)) {
                        this.formatDates(obj[i]);
                    }
                }
            }
        };
        HttpService.prototype.isDate = function (value) {
            return value instanceof Date;
        };
        HttpService.prototype.isObject = function (value) {
            return value instanceof Object;
        };
        HttpService.prototype.toQueryString = function (obj) {
            var parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                }
            }
            return parts.join('&');
        };
        HttpService.prototype.handleBlocking = function (request) {
            this.blockUI.start();
            request.finally(function () {
                this.blockUI.stop();
            });
        };
        HttpService.prototype.handleError = function (request) {
            request.catch(function (response) { });
        };
        return HttpService;
    }());
    angular
        .module('app.apiCaller')
        .service('httpService', HttpService);
})(jfc || (jfc = {}));
