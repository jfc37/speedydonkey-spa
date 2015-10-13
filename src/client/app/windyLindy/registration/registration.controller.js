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
                id: 'Heats',
                day: 'Friday',
                where: 'Mac\'s Function Centre',
                when: '6pm - 8pm'
            },
            {
                name: 'The Grammy Awards',
                price: 20.00,
                id: 'GrammyAwards',
                day: 'Friday',
                where: 'Mac\'s Function Centre',
                when: '8pm - 12.30am'
            },
            {
                name: 'Rock Stars Ball',
                price: 60.00,
                id: 'RockStarsBall',
                day: 'Saturday',
                where: 'Mac\'s Function Centre',
                when: '8pm - Midnight'
            },
            {
                name: 'Groupies Private Party',
                price: 25.00,
                id: 'GroupiesPrivateParty',
                day: 'Saturday',
                where: 'Full Swing Studios (Cuba Mall)',
                when: 'Midnight - 3am'
            },
            {
                name: 'The Hard Rock Bus Tour',
                price: 30.00,
                id: 'HardRockBusTour',
                day: 'Sunday',
                where: 'TBA',
                when: '3.45pm - 6pm'
            },
            {
                name: 'The Back Stage Party',
                price: 60.00,
                id: 'BackStageParty',
                day: 'Sunday',
                where: 'Mac\'s Function Centre',
                when: '8pm - Midnight'
            },
            {
                name: 'Sunday Night After Party',
                price: 10.00,
                id: 'SundayNightAfterParty',
                day: 'Sunday',
                where: 'Full Swing Studios  (Cuba Mall)',
                when: 'Midnight - 4am'
            },
            {
                name: 'Groupies Goodbye Jam',
                price: 25.00,
                id: 'GroupiesGoodbyeJam',
                day: 'Monday',
                where: 'Rogue and Vagabond',
                when: '6pm - Late'
            }
        ];
        vm.registration = {
            classes: [],
            events: [],
            competitions: [],
            fullPass: false
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
