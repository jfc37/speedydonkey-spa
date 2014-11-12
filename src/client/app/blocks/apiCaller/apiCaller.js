(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$q', '$http', 'logger'];

    /* @ngInject */
    function apiCaller($q, $http, logger) {
        var service = {
            user : user
        };

        var baseUrl = 'http://studybuddyapi.azurewebsites.net/api/';

        return service;
    }
})();