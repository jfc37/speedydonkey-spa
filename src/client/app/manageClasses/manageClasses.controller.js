(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .controller('ManageClasses', ManageClasses);

    ManageClasses.$inject = ['$q', 'logger', 'manageClassesService'];

    /* @ngInject */
    function ManageClasses($q, logger, manageClassesService) {
        /*jshint validthis: true */
        var vm = this;
        vm.classes = [];

        activate();

        function activate() {
            setupFilter();
            var promises = [getClasses()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage Classes');
                });
        }

        function getClasses() {
            manageClassesService.getClasses().then(function (classes) {
                vm.classes = classes;
            }, function () {
                logger.error('Failed to get classes');
            });
        }

        function setupFilter() {
            vm.filterOptions = {
                fields: [
                    {
                        name: 'Name',
                        type: 'text'
                    }
                ]
            }
        }
    }
})();
