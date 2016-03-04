(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('doNotEmailRepository', doNotEmailRepository);

    /* @ngInject */
    function doNotEmailRepository(simpleApiCaller) {
        var service = {
            allowEmails: allowEmails,
            disallowEmails: disallowEmails
        };

        return service;

        function allowEmails(user) {
            return simpleApiCaller.delete(getOptions(user.id));
        }

        function disallowEmails(user) {
            return simpleApiCaller.post({}, getOptions(user.id));
        }

        function getOptions(id) {
            return {
                resource: 'users/' + id + '/do-not-email'
            };
        }
    }
})();
