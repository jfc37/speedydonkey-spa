(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .controller('BlockEnrolment', BlockEnrolment);

    BlockEnrolment.$inject = ['blockEnrolmentService', '$q', 'logger'];

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Block Enrolment';
        vm.blocks = [];
        vm.passOptions = [];
        vm.areBlocksLoading = true;
        vm.arePassesLoading = true;

        vm.submit = function() {
            var blocksToEnrolIn = vm.blocks.filter(function (block) {
                return block.enrolIn;
            });

            blockEnrolmentService.enrol(blocksToEnrolIn, vm.selectedPass).then(function (){
                logger.success("Enroled in selected blocks");
            }, function () {
                logger.error("Problem with enrolment");
            });
        };

        activate();

        function activate() {
            var promises = [getAllBlocks(), getPassOptions()];
            return $q.all(getAllBlocks)
            .then(function(){
                logger.info('Activated Block Enrolment View');
            });
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
                vm.areBlocksLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting blocks..."
                }
                logger.error(error.displayMessage);
                vm.areBlocksLoading = false;
            });
        }

        function getPassOptions() {
            return blockEnrolmentService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
;                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.arePassesLoading = "Issue getting pass options..."
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();