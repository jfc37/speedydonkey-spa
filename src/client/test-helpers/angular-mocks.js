var Spies = (function () {

    var service = {};

    service.routehelper = {
        configureRoutes: sinon.spy(),
        redirectToRoute: sinon.spy()
    };

    service.niceAlert = {
        success: sinon.spy(),
        error: sinon.spy()
    }

    return service;

}());

var AngularMock = (function () {

    var service = {};

    service.setup = function () {
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
            'routehelper': Spies.routehelper
        });
        angular.mock.module({
            'niceAlert': Spies.niceAlert
        });

        bard.inject('$http', '$httpBackend');
    };

    return service;

}());
