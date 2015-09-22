(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .filter('matchingBlockGrouping', matchingBlockGroupingFilter)
        .filter('viewableBlocks', viewableBlocksFilter);

    function getGroupDateDisplay(date) {
        return moment(date).format('dddd D/M');
    }

    function getGroupDate(display) {
        return moment(display, 'dddd D/M');
    }

    function matchingBlockGroupingFilter() {
        return function (blocks, group) {
            return blocks.filter(function (block) {
                return getGroupDateDisplay(block.start_date) === group;
            });
        };
    }

    function viewableBlocksFilter() {
        return function (blockGroups) {

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
})();
