(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .controller('BlockEnrolment', BlockEnrolment);

    function getGroupDateDisplay(date) {
        return moment(date).format('dddd D/M');
    }

    function getGroupDate(display) {
        return moment(display, 'dddd D/M');
    }

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger, routehelper, blockUI, config) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Block Enrolment';
        vm.blocks = [];
        vm.areBlocksLoading = true;
        vm.blockGrouping = [];

        vm.paypalConfig = config.paypal;

        vm.getClassType = function (block) {
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

        vm.isAnythingToSubmit = function () {
            return isAnyBlocksSelected();
        };

        function isAnyBlocksSelected() {
            return getSelectedBlocks().length > 0;
        }

        function getSelectedBlocks() {
            return vm.blocks.filter(function (block) {
                return block.enrolIn;
            });
        }

        vm.submit = function () {
            blockUI.start();
            blockEnrolmentService.enrol(getSelectedBlocks()).then(function () {
                blockUI.stop();
                routehelper.redirectToRoute('dashboard');
                logger.success('Enrolled in selected blocks');
            }, function () {
                blockUI.stop();
                logger.error('Problem with enrolment');
            });
        };

        activate();

        function activate() {
            blockUI.start();
            return getAllBlocks()
                .then(function () {
                    blockUI.stop();
                    logger.info('Activated Block Enrolment View');
                });
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
                var flags = [],
                    l = blocks.length,
                    i;
                for (i = 0; i < l; i++) {
                    var displayDate = getGroupDateDisplay(blocks[i].start_date);
                    if (flags[displayDate]) {
                        continue;
                    }
                    flags[displayDate] = true;
                    vm.blockGrouping.push(displayDate);
                }

                vm.areBlocksLoading = false;
            }, function (error) {
                if (!error.displayMessage) {
                    error.displayMessage = 'Issue getting blocks...';
                }
                logger.error(error.displayMessage);
                vm.areBlocksLoading = false;
            });
        }
    }
})();
