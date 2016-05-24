(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('teacherRateRepository', teacherRateRepository);

    /* @ngInject */
    function teacherRateRepository(simpleApiCaller, validationPromise) {

        var service = {
            getAll: getAll,
            get: get,
            update: update
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

        function update(teacher) {
            return simpleApiCaller.post(teacher, getOptions(teacher.id)).then(function (response) {
                return response.data;
            }).catch(function(response) {
                return validationPromise.reject(response);
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

