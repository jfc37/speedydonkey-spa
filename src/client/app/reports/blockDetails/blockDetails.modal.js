(function () {
    'use strict';

    angular
        .module('app.reports')
        .factory('blockDetailsModal', blockDetailsModal);

    /* @ngInject */
    function blockDetailsModal($uibModal, $q, blockDetailsRepository, niceAlert) {
        var modalInstance;

        var viewModel = {
            downloadCsv: downloadCsv
        };

        var service = {
            open: openModal
        };

        return service;

        function openModal(block) {

            var deferred = $q.defer();

            viewModel.reportFilter = {
                blockId: block.blockId
            };

            blockDetailsRepository.get(viewModel.reportFilter).then(function (report) {

                viewModel.block = block;
                viewModel.report = report;

                modalInstance = $uibModal.open({
                    templateUrl: 'app/reports/blockDetails/blockDetails.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: function () {
                            return viewModel;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            }).catch(onReportError);

            return deferred.promise;
        }

        function downloadCsv() {
            blockDetailsRepository.getCsv(viewModel.reportFilter).catch(onReportError);
        }

        function onReportError(validationMessage) {
            if (validationMessage) {
                niceAlert.validationWarning(validationMessage);
            } else {
                niceAlert.error('Something went wrong running the report.');
            }
        }
    }
})();
