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
            enrol: enrol
        };

        function getBlocks() {
            return $q(function (resolve, revoke) {
                var allBlocks;
                dataservice.getAllBlocks().then(function(blocks) {
                    blocks.forEach(function(block){
                        block.isEnroled = false;
                    });

                    allBlocks = blocks;
                }, revoke).then(function () {
                    dataservice.getUser(authService.getUserIdentity().userId).then(function (user) {
                        var enroledBlockIds = user.enroled_blocks.map(function(block){
                            return block.id;
                        });
                        allBlocks.forEach(function(block){
                            if (enroledBlockIds.indexOf(block.id) > -1) {
                                block.isEnroled = true;
                            }
                        });
                    }, revoke);
                }).then(function () {
                    resolve(allBlocks);
                });
            });
        }

        function enrol(blocks) {
            return $q(function (resolve, revoke) {
                var promises = [];
                blocks.forEach(function (block) {
                    promises.push(dataUpdateService.enrolInBlock({userId: authService.getUserIdentity().userId, blockId: block.id}).then(function(){

                    }, function (){
                        revoke();
                    }));

                    $q.all(promises).then(function () {
                        resolve();
                    }, revoke)
                });
            });
        }

        return service;

    }
})();