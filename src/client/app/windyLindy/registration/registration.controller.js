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
                name: 'The Heats',
                price: 10.00,
                id: 'Heats'
            },
            {
                name: 'The Grammy Awards',
                price: 20.00,
                id: 'GrammyAwards'
            },
            {
                name: 'Rock Stars Ball',
                price: 60.00,
                id: 'RockStarsBall'
            },
            {
                name: 'Groupies Private Party',
                price: 25.00,
                id: 'GroupiesPrivateParty'
            },
            {
                name: 'The Hard Rock Bus Tour',
                price: 30.00,
                id: 'HardRockBusTour'
            },
            {
                name: 'The Back Stage Party',
                price: 60.00,
                id: 'BackStageParty'
            },
            {
                name: 'Sunday Night After Party',
                price: 10.00,
                id: 'SundayNightAfterParty'
            },
            {
                name: 'Groupies Goodbye Jam',
                price: 25.00,
                id: 'GroupiesGoodbyeJam'
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