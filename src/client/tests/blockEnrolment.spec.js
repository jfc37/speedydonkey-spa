/* globals describe, it, expect, assert, beforeEach, bard, $controller */
describe('Block Enrolment', function () {
    var $controller;

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
    });

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('display blocks to user', function () {
        describe('when no blocks are available for enrolment', function () {
            it('should not display any blocks', function () {
                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(404);
                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);

                var controller = $controller('BlockEnrolment');

                $httpBackend.flush();

                expect(controller.blocks.length).to.equal(0);
            });
        });

        describe('when a block is available for enrolment', function () {

            beforeEach(function () {
                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
                    name: 'name',
                    id: 1
                }]);
            });

            describe('when the user is not enrolled', function () {

                it('should allow the user to enrol', function () {
                    $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);
                    var controller = $controller('BlockEnrolment');

                    $httpBackend.flush();

                    expect(controller.blocks.length).to.equal(1);
                    expect(controller.blocks[0].isEnroled).to.equal(false);
                });
            });

            describe('when the user is enrolled', function () {

                it('should not allow the user to enrol', function () {
                    $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, [{
                        name: 'name',
                        id: 1
                    }]);
                    var controller = $controller('BlockEnrolment');

                    $httpBackend.flush();

                    expect(controller.blocks.length).to.equal(1);
                    expect(controller.blocks[0].isEnroled).to.equal(true);
                });
            });

        });

        describe('when two blocks on the same day are available for enrolment', function () {
            beforeEach(function () {
                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
                    name: 'block 1',
                    id: 1,
                    startDate: new Date(2015, 11, 3, 18, 0)
                }, {
                    name: 'block 2',
                    id: 2,
                    startDate: new Date(2015, 11, 3, 20, 0)
                }]);

                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);

            });

            it('should group the blocks together', function () {
                var controller = $controller('BlockEnrolment');

                $httpBackend.flush();

                expect(controller.blockGrouping.length).to.equal(1);
            });
        });

        describe('when two blocks on different days are available for enrolment', function () {
            beforeEach(function () {
                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
                    name: 'block 1',
                    id: 1,
                    startDate: new Date(2015, 11, 3, 18, 0)
                }, {
                    name: 'block 2',
                    id: 2,
                    startDate: new Date(2015, 11, 4, 20, 0)
                }]);

                $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);

            });

            it('should not group the blocks together', function () {
                var controller = $controller('BlockEnrolment');

                $httpBackend.flush();

                expect(controller.blockGrouping.length).to.equal(2);
            });
        });
    });
});
