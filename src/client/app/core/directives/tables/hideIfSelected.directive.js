(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('hideIfSelected', hideIfSelected)
        .directive('hideIfNotSelected', hideIfNotSelected);

    /*@ngInject*/
    function hideIfSelected(ngIfDirective) {
        var ngIf = ngIfDirective[0];

        var directive = {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: {
                'items': '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
            },
            link: function (scope, element, attr) {
                attr.ngIf = function () {
                    if (!scope.vm.items) {
                        return true;
                    }

                    return scope.vm.items.filter(function (item) {
                        return item.selected;
                    }).length === 0;
                };
                ngIf.link.apply(ngIf, arguments);
            }
        };
        return directive;
    }

    /*@ngInject*/
    function hideIfNotSelected(ngIfDirective) {
        var ngIf = ngIfDirective[0];

        var directive = {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: {
                'items': '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
            },
            link: function (scope, element, attr) {
                attr.ngIf = function () {
                    if (!scope.vm.items) {
                        return true;
                    }

                    return scope.vm.items.filter(function (item) {
                        return item.selected;
                    }).length > 0;
                };
                ngIf.link.apply(ngIf, arguments);
            }
        };
        return directive;
    }

})();
