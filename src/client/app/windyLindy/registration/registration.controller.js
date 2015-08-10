(function () {
    'use strict';

    angular
        .module('app.windyLindy')
        .controller('Registration', Registration);

    Registration.$inject = ['selectOptionService', 'validationService', 'windyLindyService', 'routehelper'];

    /* @ngInject */
    function Registration(selectOptionService, validationService, windyLindyService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.danceRoles = selectOptionService.getDanceRoles();
        vm.danceLevels = selectOptionService.getDanceLevels();
        vm.classes = [
            'Saturday 10:00 - 11:15',
            'Saturday 11:30 - 12:45',
            'Saturday 14:00 - 15:15',
            'Saturday 15:30 - 16:45',
            'Sunday 10:00 - 11:15',
            'Sunday 11:30 - 12:45',
            'Sunday 14:00 - 15:15',
            'Monday 10:00 - 11:15',
            'Monday 11:30 - 12:45',
            'Monday 14:00 - 15:15',
            'Monday 15:30 - 16:45'
        ];
        vm.socialEvents = [
            {
                name: 'Special Event',
                price: 10.99
            },
            {
                name: 'Love Making',
                price: 1.99
            },
            {
                name: 'The Michael Special',
                price: 0.99
            }
        ];
        vm.registration = {
            classes: [],
            events: [],
            competitions: []
        };

        vm.submit = function (form) {
            if (validationService.passesValidationCheck(form)) {
                windyLindyService.submitRegistration(vm.registration).then(function (id) {
                    routehelper.redirectToRoute('windy-lindy-payment', {
                        id: id
                    });
                });
            }
        };

        vm.toggleSelection = function (itemArray, item) {
            var idx = itemArray.indexOf(item);

            // is currently selected
            if (idx > -1) {
                itemArray.splice(idx, 1);
            }

            // is newly selected
            else {
                itemArray.push(item);
            }
        };
    }
})();
