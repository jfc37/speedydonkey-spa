var Spies = (function () {

    var service = {};

    service.routehelper = {
        configureRoutes: sinon.spy(),
        redirectToRoute: sinon.spy()
    };

    return service;

}());
