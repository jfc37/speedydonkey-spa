(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('CreateBlock', CreateBlock);

    /* @ngInject */
    function CreateBlock(blockService, routehelper, settingsRepository, niceAlert) {
        var vm = this;

        vm.submit = function () {
            blockService.create(vm.block).then(function (validation) {
                if (!validation) {
                    niceAlert.success({
                        message: 'Block was successfully created.'
                    });
                    routehelper.redirectToRoute('manageBlocks');
                } else {
                    niceAlert.validationWarning();
                }

            }, function (errors) {
                niceAlert.error({
                    message: 'There was a problem creating the block.'
                });
            });
        };

        activate();

        function activate() {
            getBlock();
        }

        function getBlock() {
            settingsRepository.getAll().then(function (settings) {
                vm.block = {
                    startDate: moment().startOf('day').hour(18).minute(0).toDate(),
                    minutesPerClass: parseInt(settings.minutesPerClass),
                    numberOfClasses: parseInt(settings.numberOfClasses)
                };
            });
        }
    }
})();
