(function () {
    'use strict';

    angular
        .module('app.purchasePass')
        .factory('purchasePassService', purchasePassService);

    purchasePassService.$inject = ['$q', 'paypalExpressCheckout', 'dataservice', 'config'];

    /* @ngInject */
    function purchasePassService($q, paypalExpressCheckout, dataservice, config) {

        var service = {
            getPassOptions: getPassOptions,
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
