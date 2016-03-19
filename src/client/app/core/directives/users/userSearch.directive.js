/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('userSearch', userSearch);

    function userSearch(simpleApiCaller, $q) {
        var directive = {
            templateUrl: 'app/core/directives/users/userSearch.html',
            require: ['ngModel'],
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                scope.placeholder = attrs.placeholder;

                scope.searchUsers = function (name) {
                    return $q(function (resolve, reject) {
                        var search = [
                            {
                                field: 'fullname',
                                condition: 'cont',
                                value: name
                            },
                            {
                                field: 'orderby',
                                condition: 'fullname'
                            }
                        ];

                        var options = {
                            resource: 'users',
                            search: search
                        };

                        simpleApiCaller.get(options).then(function (response) {
                            resolve(response.data);
                        }, function (response) {
                            if (response.status === 404) {
                                response.displayMessage = 'No users found...';
                            }
                            reject(response);
                        });
                    });
                };
            }
        };
        return directive;
    }

})();
