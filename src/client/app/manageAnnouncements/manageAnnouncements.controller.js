(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .controller('ManageAnnouncements', ManageAnnouncements);

    /* @ngInject */
    function ManageAnnouncements(manageAnnouncementsService, blockService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.mail = {
            receivers: []
        };

        vm.send = function () {
            manageAnnouncementsService.send(vm.mail).then(function () {
                routehelper.redirectToRoute('dashboard');
            });
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
