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

        vm.submit = function() {
            var blocksToEnrolIn = vm.blocks.filter(function (block) {
                return block.enrolIn;
            });

            blockEnrolmentService.enrol(blocksToEnrolIn).then(function (){
                logger.success("Enroled in selected blocks");
            }, function () {
                logger.error("Problem with enrolment");
            });
        };

        activate();

        function activate() {
            return $q(getAllBlocks)
            .then(function(){
                logger.info('Activated Block Enrolment View');
            });
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
            }, function (){
                logger.error("Issue getting blocks...");
            });
        }
    }
})();