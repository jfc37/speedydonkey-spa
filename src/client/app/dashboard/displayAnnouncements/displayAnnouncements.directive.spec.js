///* globals sinon, $q, describe, it, expect, beforeEach, bard, $controller */
//describe('displayAnnouncements.directive', function () {
//    var element;
//    var scope;
//    var announcementsServiceSpy;
//
//    beforeEach(function () {
//        bard.appModule('app.dashboard', 'app.core', 'app.apiCaller');
//        bard.inject('$rootScope', '$compile', '$q', 'announcementsService', 'config');
//        announcementsServiceSpy = {
//            getAnnouncements: sinon.spy(function () {
//                return $q.when(['a']);
//            })
//        };
//        bard.mockService(announcementsService, announcementsServiceSpy);
//
//        scope = $rootScope.$new();
//        element = '<display-announcements></display-announcements>';
//        element = $compile(element)(scope);
//        scope.$digest();
//    });
//
//    it('gets announcements on activation', function () {
//        expect(announcementsServiceSpy.getAnnouncements).to.have.been.called;
//    });
//
//    describe('when announcements are retrieved', function () {
//        it('puts annoucements against vm.announcements', function () {
//            expect(scope.vm.announcements).to.exist;
//            expect(scope.vm.announcements).to.have.length(1);
//        });
//    });
//});
