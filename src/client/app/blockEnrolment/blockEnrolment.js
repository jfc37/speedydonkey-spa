(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .filter('matchingBlockGrouping', matchingBlockGroupingFilter)
        .filter('viewableBlocks', viewableBlocksFilter)
        .controller('BlockEnrolment', BlockEnrolment);

        function getGroupDateDisplay(date) {
            return moment(date).format("dddd D/M");
        }

        function getGroupDate(display) {
            return moment(display, "dddd D/M");
        }


    function matchingBlockGroupingFilter(){
        return function (blocks, group){
            return blocks.filter(function (block) {
                return getGroupDateDisplay(block.start_date) === group;
            });
        };
    }

    function viewableBlocksFilter(){
        return function (blockGroups){

            var today = new Date();
            var setOfBlocksInFirstWeek = blockGroups.filter(function (blockGroup) {
                var startOfBlockSet = getGroupDate(blockGroup).startOf('week');
                return startOfBlockSet.startOf('week') <= today && startOfBlockSet.endOf('week') >= today;
            });

            if (setOfBlocksInFirstWeek && setOfBlocksInFirstWeek.any()) {
                return setOfBlocksInFirstWeek;
            }

            return blockGroups.filter(function (blockGroup) {
                return getGroupDate(blockGroup).endOf('week') > new Date();
            });
        };
    }

    BlockEnrolment.$inject = ['blockEnrolmentService', '$q', 'logger', 'routehelper'];

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Block Enrolment';
        vm.blocks = [];
        vm.passOptions = [];
        vm.areBlocksLoading = true;
        vm.arePassesLoading = true;
        vm.blockGrouping = [];
        vm.selectedPass = "";

        vm.getClassType = function(block) {
            var blockName = block.name.toLowerCase();
            if (blockName.indexOf('charleston') > -1) {
                return 'charleston';
            }
            if (blockName.indexOf('lindy') > -1) {
                return 'lindy';
            }
            if (blockName.indexOf('tap') > -1) {
                return 'tap';
            }
            if (blockName.indexOf('blues') > -1) {
                return 'blues';
            }
            if (blockName.indexOf('balboa') > -1) {
                return 'balboa';
            }
            return '';
        };

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
            var promises = [blockEnrolmentService.enrol(getSelectedBlocks()), blockEnrolmentService.purchasePass(vm.selectedPass)];
            $q.all(promises).then(function (){
                routehelper.redirectToRoute('dashboard');
                logger.success("Enroled in selected blocks");
            }, function () {
                logger.error("Problem with enrolment");
            });
        };

        activate();

        function activate() {
            var promises = [getAllBlocks(), getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Block Enrolment View');
            });
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
                var flags = [], l = blocks.length, i;
                for( i=0; i<l; i++) {
                    var displayDate = getGroupDateDisplay(blocks[i].start_date);
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