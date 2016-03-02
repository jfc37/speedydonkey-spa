(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('classRepository', classRepository);

    /* @ngInject */
    function classRepository(simpleApiCaller) {
        var service = {
            get: get
        };

        return service;

        function get(id) {
            return simpleApiCaller.get(getOptions(id)).then(function (response) {
                return response.data;
            });
        }

        function getOptions(id) {
            var options = {
                resource: 'classes',
                block: true
            };

            if (id) {
                options.id = id;
            }

            return options;
        }
    }
})();
