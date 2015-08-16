/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('filter', filter);

    function filter() {
        var directive = {
            templateUrl: 'app/core/directives/filterDirective.html',
            require: ['ngModel'],
            scope: {
                ngModel: '=',
                options: '='
            },
            link: function (scope, element, attrs) {
                var original = scope.ngModel;
            }
        };
        return directive;
    }

})();
