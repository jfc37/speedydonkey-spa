/* globals describe, it, expect, assert, beforeEach, bard, $controller */
describe('Block Enrolment', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('BlockEnrolment');
        $httpBackend.flush();
    }

    beforeEach(module('app.blockEnrolment', 'blocks.router', 'app.core', 'app.apiCaller'));
    beforeEach(function () {
        AngularMock.setup();

        inject(function (_$controller_) {
            $controller = _$controller_;
        });
    });

    describe('display blocks to user', function () {

        describe('when no blocks are available for enrolment', function () {
            beforeEach(function () {
                MockHttp.BlockEnrolment.noBlocksAvailable();
                MockHttp.BlockEnrolment.notEnrolledInAny();
                kickOff();
            });

            it('should not display any blocks', function () {
                expect(controller.blocks.length).to.equal(0);
            });
        });

        describe('when a block is available for enrolment', function () {
            beforeEach(function () {
                MockHttp.BlockEnrolment.singleBlockAvailable();
            });

            describe('when the user is not enrolled', function () {
                beforeEach(function () {
                    MockHttp.BlockEnrolment.notEnrolledInAny();
                    kickOff();
                });

                it('should allow the user to enrol', function () {
                    expect(controller.blocks.length).to.equal(1);
                    expect(controller.blocks[0].isEnroled).to.equal(false);
                });

                it('should have enrol button disabled', function () {
                    expect(controller.isAnyBlocksSelected()).to.equal(false);
                });
            });

            describe('when the user is enrolled', function () {
                beforeEach(function () {
                    MockHttp.BlockEnrolment.enrolledInOne();
                    kickOff();
                });

                it('should not allow the user to enrol', function () {
                    expect(controller.blocks.length).to.equal(1);
                    expect(controller.blocks[0].isEnroled).to.equal(true);
                });

                it('should have enrol button disabled', function () {
                    expect(controller.isAnyBlocksSelected()).to.equal(false);
                });
            });
        });

        describe('when two blocks on the same day are available for enrolment', function () {
            beforeEach(function () {
                MockHttp.BlockEnrolment.twoBlocksAvailableOnSameDay();
                MockHttp.BlockEnrolment.notEnrolledInAny();
                kickOff();
            });

            it('should group the blocks together', function () {
                expect(controller.blockGrouping.length).to.equal(1);
            });
        });

        describe('when two blocks on different days are available for enrolment', function () {
            beforeEach(function () {
                MockHttp.BlockEnrolment.twoBlocksAvailableOnDifferentDays();
                MockHttp.BlockEnrolment.notEnrolledInAny();
                kickOff();

            });

            it('should not group the blocks together', function () {
                expect(controller.blockGrouping.length).to.equal(2);
            });
        });
    });

    describe('user selects block', function () {

        describe('when user selects block to enrol in', function () {
            beforeEach(function () {
                MockHttp.BlockEnrolment.singleBlockAvailable();
                MockHttp.BlockEnrolment.notEnrolledInAny();
                kickOff();
                controller.blocks[0].enrolIn = true;
            });

            it('should enable enrolment button', function () {
                expect(controller.isAnyBlocksSelected()).to.equal(true);
            });
        });

    });

    describe('when user enrols in block', function () {
        beforeEach(function () {
            MockHttp.BlockEnrolment.singleBlockAvailable();
            MockHttp.BlockEnrolment.notEnrolledInAny();
            kickOff();
            controller.blocks[0].enrolIn = true;
            $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/users/current/enrolment').respond('200');
            controller.submit();
            $httpBackend.flush();
        });

        it('should post enrolment request to server', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should redirect user to dashboard', function () {
            expect(Spies.routehelper.redirectToRoute.calledWith('dashboard')).to.equal(true);
        });
    });
});
