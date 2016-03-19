/* global describe, it, expect, assert, beforeEach, bard, $controller, $httpBackend, AngularMock, inject, MockHttp */
describe('Manage Blocks', function () {
    var $controller;
    var controller;

    function kickOff() {
        controller = $controller('ManageBlocks');
        $httpBackend.flush();
    }

    beforeEach(module('app.manageBlocks', 'blocks.router', 'app.core', 'app.apiCaller'));
    beforeEach(function () {
        AngularMock.setup();

        inject(function (_$controller_) {
            $controller = _$controller_;
        });

        MockHttp.Blocks.blocksAvailable();
        kickOff();
    });

    describe('load blocks from server', function () {

        it('should get all blocks from server', function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should separate past blocks', function () {
            expect(controller.pastBlocks.length).to.equal(1);
        });

        it('should separate future blocks', function () {
            expect(controller.futureBlocks.length).to.equal(1);
        });

        it('should separate current blocks', function () {
            expect(controller.currentBlocks.length).to.equal(1);
        });
    });
});
