var Settings = (function () {

    var service = {};

    service.settingsAvailable = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/settings').respond(200, [{
            name: 'logo',
            value: 'logoUrl'
        }]);
    };
    return service;

}());

var BlockEnrolment = (function () {

    var service = {};

    service.singleBlockAvailable = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'name',
            id: 1
        }]);
    };

    service.noBlocksAvailable = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(404);
    };

    service.twoBlocksAvailableOnSameDay = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'block 1',
            id: 1,
            startDate: new Date(2015, 11, 3, 18, 0)
        }, {
            name: 'block 2',
            id: 2,
            startDate: new Date(2015, 11, 3, 20, 0)
        }]);
    };

    service.twoBlocksAvailableOnDifferentDays = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks/for-enrolment').respond(200, [{
            name: 'block 1',
            id: 1,
            startDate: new Date(2015, 11, 3, 18, 0)
        }, {
            name: 'block 2',
            id: 2,
            startDate: new Date(2015, 11, 4, 20, 0)
        }]);
    };

    service.notEnrolledInAny = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, []);
    };

    service.enrolledInOne = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/users/current/blocks').respond(200, [{
            name: 'name',
            id: 1
        }]);
    };

    return service;

}());

var MockHttp = (function () {

    var service = {
        BlockEnrolment: BlockEnrolment,
        Settings: Settings
    };

    return service;

}());
