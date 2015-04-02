(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .filter('matchingBlockGrouping', matchingBlockGroupingFilter)
        .controller('BlockEnrolment', BlockEnrolment);


    function matchingBlockGroupingFilter(){
        return function (blocks, group){
            return blocks.filter(function (block) {
                return moment(block.start_date).format("dddd MMMM D") === group;
            });
        };
    }

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
        vm.blockGrouping = [];

        vm.isAnythingToSubmit = function() {
            return isAnyBlocksSelected() || isAnyPassesSelected();
        };

        function isAnyBlocksSelected() {
            return getSelectedBlocks().length > 0;
        }
        function getSelectedBlocks() {
            return vm.blocks.filter(function (block) {
                return block.enrolIn;
            });
        }

        function isAnyPassesSelected() {
            return vm.selectedPass;
        }

        vm.submit = function() {
            blockEnrolmentService.enrol(getSelectedBlocks(), vm.selectedPass).then(function (){
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

                // var flags = [], l = blocks.length, i;
                // for( i=0; i<l; i++) {
                //     var date = new Date(blocks[i].start_date);
                //     date.setHours(0,0,0,0);
                //     if(flags[date]) {
                //         continue;
                //     }
                //     flags[date] = true;
                //     vm.blockGrouping.push(date);
                // }
                var flags = [], l = blocks.length, i;
                for( i=0; i<l; i++) {
                    var displayDate = moment(blocks[i].start_date).format("dddd MMMM D");
                    if(flags[displayDate]) {
                        continue;
                    }
                    flags[displayDate] = true;
                    vm.blockGrouping.push(displayDate);
                }

                vm.areBlocksLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting blocks...";
                }
                logger.error(error.displayMessage);
                vm.areBlocksLoading = false;
            });
        }

        function getPassOptions() {
            return blockEnrolmentService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.arePassesLoading = "Issue getting pass options...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();