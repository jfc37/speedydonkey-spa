(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .factory('blockEnrolmentService', blockEnrolmentService);

    blockEnrolmentService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function blockEnrolmentService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getBlocks : getBlocks,
            getPassOptions : getPassOptions,
            enrol: enrol
        };

        function getBlocks() {
            return $q(function (resolve, revoke) {
                var allBlocks = [];
                dataservice.getAllBlocks().then(function(blocks) {
                    blocks.forEach(function(block){
                        block.isEnroled = false;
                    });

                    allBlocks = blocks;
                }, function(error) {
                    if (error.status === 404){
                        error.displayMessage = 'No blocks found';
                    }
                    revoke(error);
                }).then(function () {
                    if (allBlocks.length === 0){
                        return;
                    }
                    dataservice.getUserEnroledBlocks().then(function (blocks) {
                        var enroledBlockIds = blocks.map(function(block){
                            return block.id;
                        });
                        allBlocks.forEach(function(block){
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

        function getPassOptions() {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions){
                    resolve(passOptions);
                }, function (error) {
                    if (error.status === 404) {
                        error.displayMessage = 'No pass options found';
                    }
                    revoke(error);
                });
            });
        }

        function enrol(blocks, pass) {
            return $q(function (resolve, revoke) {
                var enrolment = {
                    user_id: authService.getUserIdentity().userId,
                    block_ids: blocks.map(function (block) {
                        return block.id;
                    })
                };
                if (pass) {
                    enrolment.pass_types = [
                        pass.name
                    ];
                }
                dataUpdateService.enrolInBlock(enrolment).then(resolve, revoke);
            });
        }

        return service;

    }
})();