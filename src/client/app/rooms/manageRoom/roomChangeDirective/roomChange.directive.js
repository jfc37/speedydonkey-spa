(function () {
    'use strict';

    angular
        .module('app.rooms')
        .directive('roomChange', roomChange);

    /* @ngInject */
    function roomChange() {
        return {
            restrict: 'E',
            scope: {
                room: '='
            },
            templateUrl: 'app/rooms/manageRoom/roomChangeDirective/roomChange.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (pageReloader, roomRepository, niceAlert) {
                var vm = this;

                vm.cancel = function () {
                    pageReloader.reload();
                };

                vm.submit = function () {
                    roomRepository.update(vm.room).then(function () {
                        pageReloader.reload();
                        niceAlert.success({
                            message: 'Room was successfully updated.'
                        });
                    }, function (validation) {
                        if (validation) {
                            vm.serverValidation = validation;
                            niceAlert.validationWarning();
                        } else {
                            niceAlert.error({
                                message: 'There was a problem updating the room.'
                            });
                        }

                    });
                };
            }
        };
    }
})();
