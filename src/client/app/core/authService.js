(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$q', '$http', '$cookieStore', 'base64Service', 'dataservice'];

    /* @ngInject */
    function authService($q, $http, $cookieStore, base64Service, dataservice){

        var userIdentity = {
            isLoggedIn: false
        };

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity,
            setUserIdentityProperty: setUserIdentityProperty,
            hasClaim: hasClaim
        };
        init();
        return service;

        function init() {
            var userCookie = $cookieStore.get('authuser');
            if (userCookie !== undefined){
                userIdentity = userCookie;
            }
            var authDataCookie = $cookieStore.get('authdata');
            if (authDataCookie !== undefined){
                addBasicAuthorisation(authDataCookie);
            }

        }

        function hasClaim(claim) {
            if (!userIdentity.claims) {
                return false;
            }

            return userIdentity.claims.filter(function (userClaim) {
                return userClaim === claim;
            }).length > 0;
        }

        function getUserIdentity() {
            return userIdentity;
        }

        function setUserIdentityProperty(propertyName, propertyValue) {
            userIdentity[propertyName] = propertyValue;
            $cookieStore.put('authuser', userIdentity);
        }

        function login(email, password, userId) {
            var encoded = base64Service.encode(email + ':' + password);
            addBasicAuthorisation(encoded);

            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {
                    userIdentity.isLoggedIn = true;
                    userIdentity.username = email;

                    userIdentity.userId = user.id;
                    userIdentity.name = user.full_name;

                    dataservice.getUserClaims(user.id).then(function (claims) {
                        userIdentity.claims = claims;

                        $cookieStore.put('authdata', encoded);
                        $cookieStore.put('authuser', userIdentity);

                        resolve();
                    }, function () {
                        userIdentity.claims = [];
                        resolve();
                    });
                }, function(response){
                    logout();
                    if (response.status === 404){
                        revoke([{property_name: "global", error_message: "Invalid email or password"}]);
                    }
                });
            });
        }

        function addBasicAuthorisation(encoded) {
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        }

        function logout() {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $cookieStore.remove('authuser');
            $http.defaults.headers.common.Authorization = 'Basic ';

            userIdentity = {
                isLoggedIn: false
            };
        }

    }
})();