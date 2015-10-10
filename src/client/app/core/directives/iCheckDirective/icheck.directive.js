/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('iCheck', iCheck);

    function iCheck() {
        return {
            restrict: 'EA',
            transclude: true,
            require: 'ngModel',
            replace: true,
            template: '<div class="angular-icheck">\n    <div class="checkbox"></div>\n    <div class="label" ng-transclude></div>\n</div>',
            link: function (scope, ele, attrs, ctrl) {
                var box = angular.element(ele[0].querySelector('.checkbox'));
                ele.bind("click", function () {
                    box.toggleClass("checked");
                    ctrl.$setViewValue(box.hasClass("checked"));

                });
                ctrl.$render = function () {
                    if (ctrl.$viewValue) {
                        box.addClass("checked");
                    } else {
                        box.removeClass("checked");
                    }
                };
            }
        }
    }

})();
