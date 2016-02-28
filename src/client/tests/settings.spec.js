/* global describe, it, expect, assert, beforeEach, bard, $controller, $httpBackend, AngularMock, inject, MockHttp, Spies */
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
            expect(controller.logo).to.equal('logoUrl');
        });

        it('should set minutes per class', function () {
            expect(controller.minutesPerClass).to.equal(60);
        });

        it('should set number of classes', function () {
            expect(controller.numberOfClasses).to.equal(6);
        });
    });

    describe('update site settings', function () {
        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/settings', {
                'settings': [{
                    'name': 'logo',
                    'value': 'newLogoUrl'
                }]
            }).respond('200');
            controller.logo = 'newLogoUrl';
            controller.submitSiteSettings();
            $httpBackend.flush();
        });

        it('should update logo url', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });it('should show nice success alert', function () {
    expect(Spies.niceAlert.success.calledOnce);
});
    });
});
