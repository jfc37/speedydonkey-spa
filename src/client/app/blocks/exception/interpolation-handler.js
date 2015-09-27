/*global Raygun*/
(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .config(interpolateDecorator);

    /* @ngInject */
    function interpolateDecorator($provide) {
        $provide.decorator('$interpolate', function ($delegate) {
            var interpolateWrap = function () {
                var interpolationFn = $delegate.apply(this, arguments);
                if (interpolationFn) {
                    return interpolationFnWrap(interpolationFn, arguments);
                }
            };

            var interpolationFnWrap = function (interpolationFn, interpolationArgs) {
                return function () {
                    var result = interpolationFn.apply(this, arguments);
                    var statement = interpolationArgs[0].trim();

                    if (!result && statement && doesStatementRequireLogging(statement)) {
                        var error = new Error('Interpolation issue. Couldn\'t bind to: ' + statement);
                        Raygun.send(error);
                    }
                    return result;
                };
            };

            angular.extend(interpolateWrap, $delegate);
            return interpolateWrap;
        });

        function doesStatementRequireLogging(statement) {
            var blah = [
                'vm.title',
                'placeholder',
                'message'
            ];

            return blah.filter(function (prop) {
                return statement.indexOf(prop) > -1;
            }).length < 1;
        }
    }

})();
