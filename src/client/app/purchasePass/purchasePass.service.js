(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .factory('purchasePassService', purchasePassService);

    purchasePassService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function purchasePassService($q, logger, dataservice, dataUpdateService, authService) {

        var service = {
            getPassOptions: getPassOptions,
            purchasePass: purchasePass,
            prepurchasePass: prepurchasePass
        };

        function getPassOptions(showAllPasses) {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions) {
                    if (!showAllPasses) {
                        passOptions = passOptions.filter(function (pass) {
                            return pass.available_for_purchase;
                        });
                    }

                    resolve(passOptions);
                }, function (error) {
                    if (error.status === 404) {
                        error.displayMessage = 'No pass options found';
                    }
                    revoke(error);
                });
            });
        }

        function purchasePass(passOption) {
            return $q(function (resolve, revoke) {
                if (!passOption) {
                    resolve();
                } else {
                    var pass = {
                        payment_status: 'pending'
                    };
                    dataUpdateService.assignPassToCurrentUser(passOption.id, pass).then(resolve, revoke);
                }
            });
        }

        function prepurchasePass(passOption) {
            return $q(function (resolve, revoke) {
                if (!passOption) {
                    resolve();
                } else {
                    var pass = {
                        payment_status: 'prepurchase'
                    };
                    dataUpdateService.assignPrepurchasePassToCurrentUser(passOption.id, pass).then(function (response) {
                        if (!response || !response.data) {
                            revoke();
                        } else if (!response.data.validation_result.is_valid) {
                            revoke(response.data.validation_result);
                        } else {
                            resolve(response.data.action_result);
                        }
                    });
                }
            });
        }

        return service;

    }
})();
