(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks);

    ManageBlocks.$inject = ['$q', 'logger', 'manageBlocksService', 'blockUI'];

    /* @ngInject */
    function ManageBlocks($q, logger, manageBlocksService, blockUI) {
        /*jshint validthis: true */
        var vm = this;
        vm.blocks = [];

        activate();

        function activate() {
            blockUI.start();
            var promises = [getBlocks()];
            return $q.all(promises)
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Manage Blocks');
                });
        }

        function getBlocks() {
            manageBlocksService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
            }, function () {
                logger.error('Failed to get blocks');
            });
        }
    }
})();
