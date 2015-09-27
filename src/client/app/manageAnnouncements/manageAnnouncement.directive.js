(function () {
    'use strict';

    angular
        .module('app.manageAnnouncements')
        .directive('manageAnnouncement', manageAnnouncement);

    /* @ngInject */
    function manageAnnouncement($q, logger, manageAnnouncementsService, blockUI, selectOptionService, dataservice) {
        var directive = {
            templateUrl: 'app/manageAnnouncements/announcement.html',
            require: ['ngModel'],
            scope: {
                ngModel: '=',
                options: '='
            },
            link: function ($scope) {
                $scope.vm = $scope.vm || {};
                $scope.ngModel.receivers = $scope.ngModel.receivers || [];
                $scope.vm.announcementTypes = selectOptionService.getAnnouncementTypes();
                $scope.vm.toggleReceiver = function (block) {
                    if ($scope.ngModel.receivers.contains(block)) {
                        $scope.ngModel.receivers.remove(block);
                    } else {
                        $scope.ngModel.receivers.push(block);
                    }
                };
                $scope.vm.toggleAllReceivers = function (block) {
                    if ($scope.ngModel.notifyAll.contains(block)) {
                        $scope.ngModel.receivers.remove(block);
                    } else {
                        $scope.ngModel.receivers.push(block);
                    }
                };

                dataservice.getAllActiveBlocks().then(function (blocks) {
                    $scope.vm.blocks = blocks;
                }, function () {
                    logger.error('Issue getting blocks');
                });
            }
        };
        return directive;
    }
})();
