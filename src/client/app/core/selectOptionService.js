(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getGradeTypes: getGradeTypes,
            getOccurences: getOccurences
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

        function getOccurences() {
            return [
                {
                    display: 'Daily',
                    value: 'Daily'
                },
                {
                    display: 'Weekly',
                    value: 'Weekly'
                },
                {
                    display: 'Fortnightly',
                    value: 'Fortnightly'
                },
                {
                    display: 'Monthly',
                    value: 'Monthly'
                },
            ];
        }

        return service;
    }
})();