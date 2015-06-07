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

        vm.filterClasses = function () {
            var filter = [
                vm.filter.startTimeAfter,
                vm.filter.startTimeBefore,
                vm.filter.name
            ];
            manageClassesService.filterClasses(filter).then(function (filteredClasses) {
                vm.classes = filteredClasses;
            });
        };

        activate();

        function activate() {
            setupFilter();
            vm.filterClasses();
        }

        function getClasses() {
            manageClassesService.getClasses().then(function (classes) {
                vm.classes = classes;
            }, function () {
                logger.error('Failed to get classes');
            });
        }

        function setupFilter() {
            vm.filter = {
                startTimeAfter: {
                    field: 'starttime',
                    condition: 'gt',
                    value: moment().add(-7, 'day').format('YYYY-MM-DD')
                },
                startTimeBefore: {
                    field: 'starttime',
                    condition: 'lt',
                    value: moment().add(0, 'day').format('YYYY-MM-DD')
                },
                name: {
                    field: 'name',
                    condition: 'cont',
                    value: ''
                },
            };
        }
    }
})();
