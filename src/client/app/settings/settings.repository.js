(function () {
    'use strict';

    angular
        .module('app.settings')
        .factory('settingsRepository', settingsRepository);

    /* @ngInject */
    function settingsRepository(simpleApiCaller) {

        var service = {
            getAll: getAll,
            get: get,
            update: update
        };

        function getAll() {
            var options = {
                resource: 'settings'
            };

            return simpleApiCaller.get(options).then(function (response) {
                var settings = {};

                response.data.forEach(function (setting) {
                    settings[camelize(setting.name)] = setting.value;
                });

                return settings;
            });
        }

        function camelize(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        }

        function get(settingType) {
            var options = {
                resource: 'settings',
                id: settingType
            };

            return simpleApiCaller.get(options).then(function (response) {
                return response.data.value;
            });
        }

        function update(settings) {
            var options = {
                resource: 'settings'
            };

            var completeSettings = {
                settings: []
            };

            settings.forEach(function (setting) {
                for (var prop in setting) {
                    if (setting.hasOwnProperty(prop)) {
                        completeSettings.settings.push({
                            name: prop,
                            value: setting[prop]
                        });
                    }
                }
            });

            return simpleApiCaller.post(completeSettings, options);
        }

        return service;

    }
})();
