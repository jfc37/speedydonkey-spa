(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .directive('blockForm', blockForm);

    /* @ngInject */
    function blockForm() {
        return {
            restrict: 'E',
            require: ['^form'],
            scope: {
                block: '='
            },
            templateUrl: 'app/manageBlocks/blockFormDirective/blockForm.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function () {

            }
        };
    }
})();
