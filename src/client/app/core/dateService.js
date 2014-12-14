(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dateService', dateService);

    dateService.$inject = [];

    /* @ngInject */
    function dateService() {
        var service = {

            convertStringsToDates: convertStringsToDates
        };

        return service;

        function convertStringsToDates(object) {
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (isDateProperty(prop)){
                        var stringValue = object[prop];
                        var dateValue = new Date(stringValue);
                        object[prop] = dateValue;
                    }
                }
            }
        }
    }

    function isDateProperty(propertyName) {
        return propertyName.toLowerCase().indexOf('date') > -1;
    }
})();