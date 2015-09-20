/* globals describe, it, expect, beforeEach, bard, $controller */
describe('login.controller', function () {
    var controller;
    var routeHelper = {};
    var authService = {};

    beforeEach(function () {
        bard.appModule('app.logon', 'blocks.logger', 'app.core', 'app.apiCaller', 'blocks.router');
        bard.inject('$controller', '$q', '$rootScope', 'logger', 'routehelper', 'validationService', 'config');

        authService = {
            login: function () {
                return $q.when();
            }
        };

        controller = $controller('Login', {
            authService: authService,
            routehelper: routeHelper
        });
    });

    it('has correct register url', function () {
        expect(controller.registerUrl).to.exist;
        expect(controller.registerUrl).to.equal('#/register/user');
    });

    it('has correct forgotten password url', function () {
        expect(controller.forgottenPasswordUrl).to.exist;
        expect(controller.forgottenPasswordUrl).to.equal('#/forgottenPassword');
    });

    describe('after user tries to log in', function () {

        beforeEach(function () {
            authService.login = sinon.spy(authService.login);

            routeHelper.redirectToRoute = function () {};
            controller.email = 'email';
            controller.password = 'password';

            controller.submit();
            $rootScope.$apply();
        });

        it('then username and password are passed to authentication service', function () {
            expect(authService.login).to.have.been.calledWith(controller.email, controller.password);
        });

        describe('when login is sucessful', function () {

            beforeEach(function () {
                routeHelper.redirectToRoute = sinon.spy(routeHelper.redirectToRoute);

                controller.submit();
                $rootScope.$apply();
            });

            it('redirect to dashboard on sucessful login', function () {
                expect(routeHelper.redirectToRoute).to.have.been.calledWith('dashboard');
            });

        });
        describe('when login is unsucessful', function () {

            beforeEach(function () {
                validationService.applyServerSideErrors = sinon.spy();
                authService.login = $q.reject;

                controller.submit();
                $rootScope.$apply();
            });

            it('displays validation errors on failed login', function () {
                expect(validationService.applyServerSideErrors).to.have.been.called;
            });

        });
    });
});
