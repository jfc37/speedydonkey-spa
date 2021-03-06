(function () {
    'use strict';

    if (!Array.prototype.any) {
        Array.prototype.any = function () {
            return this.length > 0;
        };
    }

    if (!Array.prototype.distinct) {
        Array.prototype.distinct = function () {
            var u = {},
                a = [];
            for (var i = 0, l = this.length; i < l; ++i) {
                if (u.hasOwnProperty(this[i])) {
                    continue;
                }
                a.push(this[i]);
                u[this[i]] = 1;
            }
            return a;
        }
    }

    if (!Array.prototype.contains) {
        Array.prototype.contains = function (item) {
            var index = this.indexOf(item);
            return index > -1;
        };
    }

    if (!Array.prototype.remove) {
        Array.prototype.remove = function (item) {
            var index = this.indexOf(item);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    if (!Array.prototype.getFirstOrDefault) {
        Array.prototype.getFirstOrDefault = function (prop, value) {
            var matchingItem = this.filter(function (item) {
                return item[prop] === value;
            })[0];
            return matchingItem;
        };
    }

    if (!Array.prototype.select) {
        Array.prototype.select = function (prop) {
            return this.map(function (item) {
                return item[prop];
            });
        };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }

    angular
        .module('app.core')
        .factory('commonFunctions', commonFunctions);

    /* @ngInject */
    function commonFunctions() {

        var service = {
            isValidPass: isValidPass,
            isPaidPass: isPaidPass
        };

        return service;

        function isValidPass(pass) {
            return pass.valid;
        }

        function isPaidPass(pass) {
            return pass.paymentStatus && pass.paymentStatus.toLowerCase() === 'paid';
        }
    }
})();
