/* globals describe, it, expect, beforeEach, bard, $controller */
describe('login.controller', function () {
    var controller;

    beforeEach(function () {
        bard.appModule('app.logon');
        bard.appModule('blocks.logger');
        bard.appModule('app.core');
        bard.appModule('blocks.router');
        bard.inject('$controller', 'logger', 'authService', 'routehelper', 'validationService', 'config');
        controller = $controller('Login');
    });

    it('has correct register url', function () {

    });

    it('has correct forgotten password url', function () {

    });
});
