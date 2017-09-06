(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .controller('BlockEnrolment', BlockEnrolment);

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger, routehelper, config, niceAlert) {
        var vm = this;

        vm.title = 'Block Enrolment';

        vm.blocksByDays = [];

        vm.anyBlocks = function () {
            return vm.blocksByDays.length > 0;
        };

        vm.isAnyBlocksSelected = function () {
            return getSelectedBlocks().length > 0;
        };

        vm.submit = function () {
            blockEnrolmentService.enrol(getSelectedBlocks()).then(function () {
                niceAlert.success({
                    message: 'You\'re now enrolled!'
                });
                routehelper.redirectToRoute('dashboard');
            }, function () {
                niceAlert.error({
                    message: 'Something went wrong when we tried to enrol you. Please try again.'
                });
            });
        };

        activate();

        function activate() {
            return getAllBlocks();
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocksForEnrolment().then(function (blocks) {
                blocks.forEach(function (block) {
                    block.startTimeDisplay = moment(block.startDate).format('h:mmA');
                    block.endTimeDisplay = moment(block.startDate).add(block.minutesPerClass, 'minutes').format('h:mmA');
                });

                var days = getDaysBlocksRunOver(blocks);
                days.forEach(function (day) {
                    var blocksOnDay = blocks.filter(function (block) {
                        return isBlockOnDay(block, day);
                    });

                    vm.blocksByDays.push({
                        day: day,
                        blocks: blocksOnDay,
                        title: day.format('dddd, Do of MMMM')
                    });
                });
            });
        }

        function getDaysBlocksRunOver(blocks) {
            return blocks.map(function (block) {
                return moment(block.startDate).startOf('day');
            }).distinct();
        }

        function isBlockOnDay(block, day) {
            return moment(block.startDate).isSame(day, 'day');
        }

        function getSelectedBlocks() {
            var selectedBlocks = [];

            vm.blocksByDays.forEach(function (blocksByDay) {
                selectedBlocks = selectedBlocks.concat(blocksByDay.blocks.filter(function (block) {
                    return block.enrolIn;
                }));
            });

            return selectedBlocks;
        }
    }
})();
