(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .factory('purchasePassService', purchasePassService);

    purchasePassService.$inject = ['$q', 'paypalExpressCheckout', 'dataservice', 'dataUpdateService', 'config'];

    /* @ngInject */
    function purchasePassService($q, paypalExpressCheckout, dataservice, dataUpdateService, config) {

        var service = {
            getPassOptions: getPassOptions,
            purchasePass: purchasePass,
            beginPurchase: beginPurchase
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

        function beginPurchase(passOption) {
            return $q(function (resolve, revoke) {
                paypalExpressCheckout.begin(passOption).then(function (response) {
                    window.location = config.paypal.paymentUrl + response.data.action_result.token;
                });
            });
        }

        return service;

    }
})();
