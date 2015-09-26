(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .factory('blockEnrolmentService', blockEnrolmentService);

    blockEnrolmentService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function blockEnrolmentService($q, logger, dataservice, dataUpdateService, authService) {

        var service = {
            getBlocks: getBlocks,
            getPassOptions: getPassOptions,
            enrol: enrol,
            purchasePass: purchasePass
        };

        function getBlocks() {
            return $q(function (resolve, revoke) {
                var allBlocks = [];
                dataservice.getAllBlocks().then(function (blocks) {
                    blocks.forEach(function (block) {
                        block.isEnroled = false;
                    });

                    allBlocks = blocks;
                }, function (error) {
                    if (error.status === 404) {
                        error.displayMessage = 'No blocks found';
                    }
                    revoke(error);
                }).then(function () {
                    if (allBlocks.length === 0) {
                        return;
                    }
                    dataservice.getUserEnroledBlocks().then(function (blocks) {
                        var enroledBlockIds = blocks.map(function (block) {
                            return block.id;
                        });
                        allBlocks.forEach(function (block) {
                            if (enroledBlockIds.indexOf(block.id) > -1) {
                                block.isEnroled = true;
                            }
                        });
                    }, revoke);
                }).then(function () {
                    resolve(allBlocks.filter(function (block) {
                        return block.isEnroled === false;
                    }));
                });
            });
        }

        function getPassOptions(showAllPasses) {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions) {
                    if (!showAllPasses) {
                        passOptions = passOptions.filter(function (pass) {
                            return pass.availableForPurchase;
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

        function enrol(blocks) {
            return $q(function (resolve, revoke) {
                if (!blocks.any()) {
                    resolve();
                } else {
                    var enrolment = {
                        userId: authService.getUserIdentity().userId,
                        blockIds: blocks.map(function (block) {
                            return block.id;
                        })
                    };
                    dataUpdateService.enrolInBlock(enrolment).then(resolve, revoke);
                }
            });
        }

        function purchasePass(passOption) {
            return $q(function (resolve, revoke) {
                if (!passOption) {
                    resolve();
                } else {
                    var pass = {
                        paymentStatus: 'pending'
                    };
                    dataUpdateService.assignPassToCurrentUser(passOption.id, pass).then(resolve, revoke);
                }
            });
        }

        return service;

    }
})();
