(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getPassTypes: getPassTypes,
            getAnnouncementTypes: getAnnouncementTypes,
            getDanceRoles: getDanceRoles,
            getDanceLevels: getDanceLevels
        };

        function getPassTypes() {
            return [
                {
                    display: 'Clip',
                    value: 'clip'
                },
                {
                    display: 'Unlimited',
                    value: 'unlimited'
                },
            ];
        }

        function getAnnouncementTypes() {
            return [
                {
                    display: 'Dashboard Banner',
                    value: 'banner'
                },
                {
                    display: 'Email',
                    value: 'email'
                }
            ];
        }

        function getDanceRoles() {
            return [
                {
                    display: 'Lead',
                    value: 'lead'
                },
                {
                    display: 'Follow',
                    value: 'follow'
                }
            ];
        }

        function getDanceLevels() {
            return [
                {
                    display: 'Level 1: Beginner',
                    value: 'beginner'
                },
                {
                    display: 'Level 2: Intermediate',
                    value: 'intermediate'
                },
                {
                    display: 'Level 3: Advanced',
                    value: 'advanced'
                },
                {
                    display: 'Level 4: Advanced Plus',
                    value: 'advancedPlus'
                }
            ];
        }

        return service;
    }
})();
