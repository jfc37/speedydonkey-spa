(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .factory('managePassOptionsService', managePassOptionsService);

    managePassOptionsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService'];

    /* @ngInject */
    function managePassOptionsService($q, logger, dataservice, dataUpdateService){

        var service = {
        };


        return service;

    }
})();