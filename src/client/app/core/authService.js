(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$q', '$http', '$cookieStore', 'base64Service', 'logger', 'dataservice'];

    /* @ngInject */
    function authService($q, $http, $cookieStore, base64Service, logger, dataservice){

        var userIdentity = {
            isLoggedIn: false
        }

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity,
            setUserIdentityProperty: setUserIdentityProperty
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

        function getUserIdentity() {
            return userIdentity;
        }

        function setUserIdentityProperty(propertyName, propertyValue) {
            userIdentity[propertyName] = propertyValue;
            $cookieStore.put('authuser', userIdentity);
        }

        function login(username, password) {
            var encoded = base64Service.encode(username + ':' + password);
            addBasicAuthorisation(encoded);

            return $q(function (resolve, reject) {
                dataservice.searchForUser({username: username}).then(function (response) {
                    if (response === null){
                        authService.logout();
                        logger.warning("Login failed");
                    } else {

                        userIdentity.isLoggedIn = true;
                        userIdentity.username = username;
                        var person = response.data[0].person;
                        if (person !== undefined || person !== null) {
                            userIdentity.role = person.role.toLowerCase();
                        }

                        $cookieStore.put('authdata', encoded);
                        $cookieStore.put('authuser', userIdentity);

                        logger.success("Login successful");
                        resolve();
                    }
                }, function(response){
                    if (response.status === 401){
                        logger.warning("Incorrect login details");
                    } else {
                        logger.error("Login failed");
                    }
                    logout();
                    reject();
                });
            })
        };

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

            logger.success('Successfully logged out');
        };

    }
})();