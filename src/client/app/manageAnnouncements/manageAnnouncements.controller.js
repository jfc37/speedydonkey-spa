(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .controller('ManageAnnouncements', ManageAnnouncements);

    /* @ngInject */
    function ManageAnnouncements(manageAnnouncementsService, blockService) {
        /*jshint validthis: true */
        var vm = this;

        vm.mail = {
            recipients: []
        };

        vm.send = function () {
            manageAnnouncementsService.send(vm.mail);
        };

        vm.blockGroupingFunction = function (block) {
            return block.status;
        };

        activate();

        function activate() {
            blockService.getBlocks().then(function (blocks) {
                vm.blocks = blocks.filter(function (block) {
                    return block.status !== 'Past';
                });
            });
        }
    }
})();
