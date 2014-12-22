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
            if (isArray(object)){
                object.forEach(function (item) {
                    convertStringsToDates(item);
                });
            } else {
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        if (isDateProperty(prop)){
                            var stringValue = object[prop];
                            var dateValue = new Date(stringValue);
                            object[prop] = dateValue;
                        } else if (typeof object[prop] === 'object') {
                            convertStringsToDates(object[prop]);
                        }
                    }
                }
            }
        }
    }

    function isDateProperty(propertyName) {
        return propertyName.toLowerCase().indexOf('date') > -1 || propertyName.toLowerCase().indexOf('time') > -1;
    }

    function isArray(object) {
        if (Array.isArray) {
            return Array.isArray(object);
        }
        return object instanceof Array;
    }
})();