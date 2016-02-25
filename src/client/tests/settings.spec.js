/* globals describe, it, expect, assert, beforeEach, bard, $controller */
describe('Settings', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('Settings');
        $httpBackend.flush();
    }

    beforeEach(module('app.settings', 'blocks.router', 'app.core', 'app.apiCaller'));
    beforeEach(function () {
        AngularMock.setup();

        inject(function (_$controller_) {
            $controller = _$controller_;
        });

        MockHttp.Settings.settingsAvailable();
        kickOff();
    });

    describe('display settings to user', function () {

        it('should get all settings from server', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should set logo url', function () {
            controller.logo = 'logoUrl';
        });
    });

    describe('update logo url', function () {

        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/settings', {
                "settings": [{
                    "name": "logo",
                    "value": "newLogoUrl"
                }]
            }).respond('200');
            controller.logo = 'newLogoUrl';
            controller.submitLogo();
            $httpBackend.flush();
        });

        it('should update logo url', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});
