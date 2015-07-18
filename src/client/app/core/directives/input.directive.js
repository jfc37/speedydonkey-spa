/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('inputBlock', inputBlock)
        .directive('validation', validation);

    function inputBlock() {
        var directive = {
            templateUrl: function (elem, attrs) {
                var path = 'app/core/directives/';
                if (attrs.checkbox !== undefined) {
                    return path + 'inputBlock-checkbox.html';
                }
                return path + 'inputBlock.html';
            },
            transclude: true,
            require: ['^form'],
            scope: true,
            link: function (scope, element, attrs, ctrl) {
                var form = ctrl[0];
                var name = attrs.name;

                scope.label = attrs.label;

                scope.hasError = function () {
                    var formElement = form[name];
                    return formElement.$invalid && formElement.$touched;
                };
            }
        };
        return directive;
    }

    function validation() {
        var directive = {
            template: '<div class="help-block has-error" ng-show="hasError()" ng-transclude></div>',
            transclude: true,
            scope: true,
            require: ['^form'],
            link: function (scope, element, attrs, ctrl) {
                var form = ctrl[0];
                var name = attrs.name;
                var errorType = attrs.error;

                scope.hasError = function () {
                    var formElement = form[name];
                    return formElement.$error[errorType] && formElement.$touched;
                };
            }
        };
        return directive;
    }

})();
