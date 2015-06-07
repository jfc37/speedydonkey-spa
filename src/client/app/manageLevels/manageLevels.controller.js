(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .controller('ManageLevels', ManageLevels);

    ManageLevels.$inject = ['$q', 'logger', 'manageLevelsService'];

    /* @ngInject */
    function ManageLevels($q, logger, manageLevelsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.levels = [];

        vm.generateForAllLevels = function () {
            manageLevelsService.generateAllBlocks().then(function () {
                logger.success('All blocks generated');
            }, function () {
                logger.error('Problem generating blocks');
            });
        };

        activate();

        function activate() {
            var promises = [getLevels()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage Levels');
                });
        }

        function getLevels() {
            manageLevelsService.getLevels().then(function (levels) {
                vm.levels = levels;
            }, function () {
                logger.error('Failed to get levels');
            });
        }
    }
})();
