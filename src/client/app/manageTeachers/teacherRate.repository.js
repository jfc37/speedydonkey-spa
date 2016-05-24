(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('teacherRateRepository', teacherRateRepository);

    /* @ngInject */
    function teacherRateRepository($q, simpleApiCaller) {

        var service = {
            getAll: getAll,
            get: get
        };

        function getAll() {
            return simpleApiCaller.get(getOptions()).then(function (response) {
                return response.data;
            });
        }

        function get(id) {
            return simpleApiCaller.get(getOptions(id)).then(function (response) {
                return response.data;
            });
        }

        function getOptions(id) {
            return {
                resource: 'teacher-rates',
                id: id
            };
        }

        return service;

    }
})();

