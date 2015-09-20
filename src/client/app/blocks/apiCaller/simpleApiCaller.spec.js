/* globals describe, it, expect, beforeEach, bard, $controller */
describe('simpleApiCaller', function () {

    beforeEach(function () {
        bard.appModule('app.core', 'app.apiCaller');
        bard.inject('$http', '$httpBackend', '$q', '$rootScope', 'logger', 'config', 'simpleApiCaller');
    });

    it('exists', function () {
        expect(simpleApiCaller).to.exist;
    });

    describe('when get is called', function () {

        it('then something is returned', function () {
            $httpBackend.when('GET', '').respond(200);

            simpleApiCaller.get({}).then(function (response) {
                console.log('reponse is:' + response);
                expect(response).to.exist;
            });

            $httpBackend.flush();
        });

        describe('when blocking is requested', function () {
            it.skip('then the screen shoud be blocked', function () {

            });

            describe('when call is successful', function () {
                it.skip('then blocking should stop when request is completed', function () {

                });
            });

            describe('when call errors', function () {
                it.skip('then blocking should stop', function () {

                });
            });
        });

        describe('when response is a server error', function () {

            it.skip('then an error is logged', function () {
                $httpBackend.when('GET', '').respond(500);

                simpleApiCaller.get({}).catch(function (response) {
                    expect(response.status).to.equal(500);
                });

                $httpBackend.flush();
            });

        });

    });


});
