/* globals describe, it, expect, beforeEach, bard, $controller */
describe('displayAnnouncements.directive', function () {
    var element;
    var scope;
    var dashboardServiceSpy;

    beforeEach(function () {
        bard.appModule('app.dashboard', 'app.core', 'app.apiCaller');
        bard.inject('$rootScope', '$compile', '$q', 'dashboardService', 'config');

        dashboardServiceSpy = {
            getAnnouncements: sinon.spy(function () {
                return $q.when(['a'])
            })
        };
        bard.mockService(dashboardService, dashboardServiceSpy);

        scope = $rootScope.$new();
        element = '<display-announcements></display-announcements>';
        element = $compile(element)(scope);
        scope.$digest();
    });

    it('gets announcements on activation', function () {
        expect(dashboardServiceSpy.getAnnouncements).to.have.been.called;
    });

    describe('when announcements are retrieved', function () {
        it('puts annoucements against vm.announcements', function () {
            expect(scope.vm.announcements).to.exist;
            expect(scope.vm.announcements).to.have.length(1);
        });
    })
});
