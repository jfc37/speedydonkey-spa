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
            controller: function ($route, roomService, validationService) {
                var vm = this;

                vm.cancel = function () {
                    $route.reload();
                };

                vm.submit = function (form) {
                    roomService.update(vm.room).then(function () {
                        $route.reload();
                    }, function (errors) {
                        validationService.applyServerSideErrors(form, errors);
                    });
                };
            }
        };
    }
})();
