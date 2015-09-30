(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .controller('BlockEnrolment', BlockEnrolment);

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger, routehelper, config) {
        var vm = this;

        vm.title = 'Block Enrolment';
        vm.blocks = [];
        vm.blockGrouping = [];

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

        vm.isAnyBlocksSelected = function () {
            return getSelectedBlocks().length > 0;
        };

        vm.submit = function () {
            blockEnrolmentService.enrol(getSelectedBlocks()).then(function () {
                routehelper.redirectToRoute('dashboard');
                logger.success('Enrolled in selected blocks');
            }, function () {
                logger.error('Problem with enrolment');
            });
        };

        activate();

        function activate() {
            return getAllBlocks();
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocksForEnrolment().then(function (blocks) {
                vm.blocks = blocks;
                var flags = [],
                    l = blocks.length,
                    i;
                for (i = 0; i < l; i++) {
                    var displayDate = getGroupDateDisplay(blocks[i].startDate);
                    if (flags[displayDate]) {
                        continue;
                    }
                    flags[displayDate] = true;
                    vm.blockGrouping.push(displayDate);
                }
            });
        }

        function getSelectedBlocks() {
            return vm.blocks.filter(function (block) {
                return block.enrolIn;
            });
        }

        function getGroupDateDisplay(date) {
            return moment(date).format('dddd D/M');
        }

        function getGroupDate(display) {
            return moment(display, 'dddd D/M');
        }
    }
})();
