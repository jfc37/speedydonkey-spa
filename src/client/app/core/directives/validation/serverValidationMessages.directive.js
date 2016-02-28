(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('serverValidationMessages', serverValidationMessages);

    function serverValidationMessages() {
        var directive = {
            templateUrl: 'app/core/directives/validation/serverValidationMessages.html',
            replace: true,
            scope: {
                'inputName': '@',
                'messages': '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function () {
                var vm = this;

                vm.getMessages = function () {
                    if (!vm.messages) {
                        return [];
                    }

                    return vm.messages.filter(function (error) {
                        return error.propertyName.toLowerCase() === vm.inputName.toLowerCase();
                    }).map(function (validationMessage) {
                        return validationMessage.errorMessage;
                    });
                };
            }
        };
        return directive;
    }

})();
