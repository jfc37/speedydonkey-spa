(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('workingModelService', workingModelService);

    /* @ngInject */
    function workingModelService() {

        var service = {
            create: create
        };

        function create(original) {
            var copy = angular.copy(original);

            var workingModel = {
                original: original,
                copy: copy,
                commitChanges: function () {
                    var self = this;

                    for (var prop in self.copy) {
                        if (self.copy.hasOwnProperty(prop)) {
                            self.original[prop] = self.copy[prop];
                        }
                    }
                }
            };

            return workingModel;
        }

        return service;
    }
})();
