(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('eventChange', eventChange);

    /* @ngInject */
    function eventChange() {
        return {
            restrict: 'E',
            scope: {
                standAloneEvent: '='
            },
            templateUrl: 'app/standAloneEvents/manageStandAloneEvent/eventChangeDirective/eventChange.html',
            controllerAs: 'vm',
            bindToController: true,
            /* @ngInject */
            controller: function (standAloneEventService, pageReloader, niceAlert) {
                var vm = this;

                vm.cancel = function () {
                    pageReloader.reload();
                };

                vm.submit = function () {
                    standAloneEventService.update(vm.standAloneEvent).then(function () {
                            pageReloader.reload();
                            niceAlert.success({
                                message: 'Event was successfully updated.'
                            });
                        },
                        function (validation) {
                            if (validation) {
                                vm.serverValidation = validation;
                                niceAlert.validationWarning();
                            } else {
                                niceAlert.error({
                                    message: 'There was a problem updating the event.'
                                });
                            }
                        });
                };
            }
        };
    }
})();
