/* globals describe, it, expect, assert, beforeEach, bard, $controller */
describe('Block Enrolment', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('BlockEnrolment');
        $httpBackend.flush();
    }

    function singleBlockAvailable() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'name',
            id: 1
        }]);
    }

    function noBlocksAvailable() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(404);
    }

    function twoBlocksAvailableOnSameDay() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'block 1',
            id: 1,
            startDate: new Date(2015, 11, 3, 18, 0)
        }, {
            name: 'block 2',
            id: 2,
            startDate: new Date(2015, 11, 3, 20, 0)
        }]);
    }

    function twoBlocksAvailableOnDifferentDays() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'block 1',
            id: 1,
            startDate: new Date(2015, 11, 3, 18, 0)
        }, {
            name: 'block 2',
            id: 2,
            startDate: new Date(2015, 11, 4, 20, 0)
        }]);
    }

    function notEnrolledInAny() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);
    }

    function enrolledInOne() {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, [{
            name: 'name',
            id: 1
        }]);
    }

    beforeEach(module('app.blockEnrolment', 'blocks.router', 'app.core', 'app.apiCaller'));
    beforeEach(function () {
        angular.mock.module({
            'jwtHelper': {
                isTokenExpired: function () {
                    return false;
                }
            }
        });
        angular.mock.module({
            'auth': {
                hookEvents: function () {
                    return false;
                }
            }
        });
        angular.mock.module({
            'routehelper': {
                configureRoutes: function () {}
            }
        });

        bard.inject('$http', '$httpBackend');

        inject(function (_$controller_) {
            $controller = _$controller_;
        });
    });

    describe('display blocks to user', function () {

        describe('when no blocks are available for enrolment', function () {
            beforeEach(function () {
                noBlocksAvailable();
                notEnrolledInAny();
                kickOff();
            });

            it('should not display any blocks', function () {
                expect(controller.blocks.length).to.equal(0);
            });
        });

        describe('when a block is available for enrolment', function () {
            beforeEach(function () {
                singleBlockAvailable();
            });

            describe('when the user is not enrolled', function () {
                beforeEach(function () {
                    notEnrolledInAny();
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
                    enrolledInOne();
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
                twoBlocksAvailableOnSameDay();
                notEnrolledInAny();
                kickOff();
            });

            it('should group the blocks together', function () {
                expect(controller.blockGrouping.length).to.equal(1);
            });
        });

        describe('when two blocks on different days are available for enrolment', function () {
            beforeEach(function () {
                twoBlocksAvailableOnDifferentDays();
                notEnrolledInAny();
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
                singleBlockAvailable();
                notEnrolledInAny();
                kickOff();
                controller.blocks[0].enrolIn = true;
            });

            it('should enable enrolment button', function () {
                expect(controller.isAnyBlocksSelected()).to.equal(true);
            });
        });

    });
});
