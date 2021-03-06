/* global $httpBackend */

var Blocks = (function () {

    var service = {};

    service.blocksAvailable = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond(200, [{
            startDate: new moment().add('10', 'days'),
            endDate: new moment().add('20', 'days')
        }, {
            startDate: new moment().add('-20', 'days'),
            endDate: new moment().add('-10', 'days')
        }, {
            startDate: new moment().add('-5', 'days'),
            endDate: new moment().add('5', 'days')
        }]);
    };

    service.deleteBlocks = function () {
        $httpBackend.when('DELETE', 'https://api-speedydonkey.azurewebsites.net/api/blocks').respond(200);
    };
    return service;

}());

var Settings = (function () {

    var service = {};

    service.settingsAvailable = function () {
        $httpBackend.when('GET', 'https://api-speedydonkey.azurewebsites.net/api/settings').respond(200, [{
            name: 'logo',
            value: 'logoUrl'
        }, {
            name: 'numberOfClasses',
            value: '6'
        }, {
            name: 'minutesPerClass',
            value: '60'
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

var Teachers = (function () {

    var service = {};

    service.singleTeacher = function () {
        $httpBackend.expect('GET', 'https://api-speedydonkey.azurewebsites.net/api/teachers').respond(200, [{

        }]);
    };

    service.addNewTeacherSuccess = function () {
        $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/teachers/1').respond(200, {
            actionResult: {
                fullName: 'Jo Lo'
            }
        });
    };

    service.addNewTeacherValidation = function () {
        $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/teachers/1').respond(400, {
            validationResult: [{}]
        });
    };

    service.addNewTeacherError = function () {
        $httpBackend.expect('POST', 'https://api-speedydonkey.azurewebsites.net/api/teachers/1').respond(500);
    };

    return service;

}());

var MockHttp = (function () {

    var service = {
        BlockEnrolment: BlockEnrolment,
        Blocks: Blocks,
        Settings: Settings,
        Teachers: Teachers
    };

    return service;

}());
