(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getGradeTypes: getGradeTypes
        };

        function getGradeTypes() {
            return [
                {
                    display: 'Letter',
                    value: 'Letter'
                },
                {
                    display: 'Percentage',
                    value: 'Percentage'
                },
            ];
        }

        return service;
    }
})();