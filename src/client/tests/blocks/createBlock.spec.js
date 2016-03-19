/* global describe, it, expect, assert, beforeEach, bard, $controller, $httpBackend, AngularMock, inject, MockHttp, Spies */
describe('Create Block', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('CreateBlock');
        $httpBackend.flush();
    }

    beforeEach(module('app.manageBlocks', 'blocks.router', 'app.core', 'app.apiCaller', 'app.settings'));
    beforeEach(function () {
        AngularMock.setup();

        inject(function (_$controller_) {
            $controller = _$controller_;
        });

        MockHttp.Settings.settingsAvailable();
        kickOff();
    });

    describe('load block settings from server', function () {

        it('should get block settings from server', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should get default minutes per class', function () {
            expect(controller.block.minutesPerClass).to.equal(60);
        });

        it('should get default number of classes', function () {
            expect(controller.block.numberOfClasses).to.equal(6);
        });
    });

    describe('when user submits block', function () {
        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond('200');
            controller.submit();
            $httpBackend.flush();
        });

        it('should call server to create block', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });

    describe('when block submission is successful', function () {
        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond('200');
            controller.submit();
            $httpBackend.flush();
        });

        it('should show nice success alert', function () {
            expect(Spies.niceAlert.success.calledOnce);
        });

        it('should redirect user to manage blocks page', function () {
            expect(Spies.routehelper.redirectToRoute.calledWith('manageBlocks')).to.equal(true);
        });
    });

    describe('when block submission has validation errors', function () {
        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond('400', {
                validationResult: {
                    validationErrors: []
                }
            });
            controller.submit();
            $httpBackend.flush();
        });

        it('should show nice validation warning alert', function () {
            expect(Spies.niceAlert.validationWarning.calledOnce);
        });

        it('should stay on the page', function () {
            expect(Spies.routehelper.redirectToRoute.calledNever);
        });
    });

    describe('when block submission fails', function () {
        beforeEach(function () {
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond('500');
            controller.submit();
            $httpBackend.flush();
        });

        it('should show nice validation error alert', function () {
            expect(Spies.niceAlert.error.calledOnce);
        });

        it('should stay on the page', function () {
            expect(Spies.routehelper.redirectToRoute.calledNever);
        });
    });
});
