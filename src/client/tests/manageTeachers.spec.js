/* global describe, it, expect, assert, beforeEach, bard, $controller, $httpBackend, AngularMock, inject, MockHttp, Spies */
describe('Manage Teachers', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('ManageTeachers');
        $httpBackend.flush();
    }

    beforeEach(module('app.manageTeachers', 'blocks.router', 'app.core', 'app.apiCaller'));
    beforeEach(function () {
        AngularMock.setup();

        inject(function (_$controller_) {
            $controller = _$controller_;
        });
    });

    beforeEach(function () {
        MockHttp.Teachers.singleTeacher();
        kickOff();
    });

    describe('display teachers to user', function () {
        it('should get teachers from server', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should display teachers to user', function () {
            expect(controller.teachers.length).to.equal(1);
        });
    });

    describe('user adds teacher', function () {

        describe('when user adds a teacher successfully', function () {

            beforeEach(function () {
                MockHttp.Teachers.addNewTeacherSuccess();
                controller.selectedUser = {
                    id: 1
                };
                controller.addTeacher();
                $httpBackend.flush();
            });

            it('should send message to server', function () {
                $httpBackend.verifyNoOutstandingExpectation();
            });

            it('should show nice success alert', function () {
                expect(Spies.niceAlert.success.calledOnce);
            });

        });

        describe('when user adds a teacher with validation error', function () {

            beforeEach(function () {
                MockHttp.Teachers.addNewTeacherValidation();
                controller.selectedUser = {
                    id: 1
                };
                controller.addTeacher();
                $httpBackend.flush();
            });

            it('should send message to server', function () {
                $httpBackend.verifyNoOutstandingExpectation();
            });

            it('should show nice validation alert', function () {
                expect(Spies.niceAlert.validationWarning.calledOnce);
            });

        });

        describe('when user adds a teacher with server error', function () {

            beforeEach(function () {
                MockHttp.Teachers.addNewTeacherError();
                controller.selectedUser = {
                    id: 1,
                    fullName: 'Jo Lo'
                };
                controller.addTeacher();
                $httpBackend.flush();
            });

            it('should send message to server', function () {
                $httpBackend.verifyNoOutstandingExpectation();
            });

            it('should show nice error alert', function () {
                expect(Spies.niceAlert.error.calledOnce);
            });

        });
    });

    describe('user removes teacher', function () {

        beforeEach(function () {
            controller.confirmDelete();
        });

        it('should show nice success alert', function () {
            expect(Spies.niceAlert.confirm.calledOnce);
        });

    });
});
