(function () {
    'use strict';

    angular
        .module('app.paypal')
        .directive('paypalButton', function (config) {
            return {
                restrict: 'E',
                scope: {},
                compile: function (element, attrs) {
                    var languageCodes = [ // PayPal allowed language codes
                    'en_US',
                    'es_ES',
                    'fr_FR',
                    'it_IT',
                    'de_DE'
                ];
                    var currencyCodes = [ // PayPal allowed currency codes
                    'AUD',
                    'CAD',
                    'CZK',
                    'DKK',
                    'EUR',
                    'HKD',
                    'HUF',
                    'ILS',
                    'JPY',
                    'MXN',
                    'NOK',
                    'NZD',
                    'PHP',
                    'PLN',
                    'GBP',
                    'RUB',
                    'SGD',
                    'SEK',
                    'CHF',
                    'TWD',
                    'THB',
                    'USD'
                ];
                    var buttonSizes = [ // PayPal allowed button sizes
                    'SM', // small
                    'LG' // large
                ];
                    var name = this.name;

                    function err(reason) {
                        element.replaceWith('<span style="background-color:red; color:black; padding:.5em;">' + name + ': ' + reason + '</span>');
                        console.log(element.context);
                    }
                    var action = attrs.action || 'https://www.sandbox.paypal.com/us/cgi-bin/webscr';
                    var business = attrs.business;
                    var languageCode = attrs.languageCode || 'en_US';
                    var currencyCode = attrs.currencyCode || 'USD';
                    var itemName = attrs.itemName;
                    var amount = attrs.amount;
                    var buttonSize = attrs.buttonSize || 'SM';
                    var notifyUrl = 'https://' + config.apiUrl + config.paypal.notifyRoute + attrs.passId;
                    var imgAlt = attrs.imgAlt || 'Make payments with PayPal - it\'s fast, free and secure!';
                    var imgSrc = 'http://www.paypalobjects.com/' + languageCode + '/i/btn/btn_buynow_' + buttonSize + '.gif';
                    var template =
                        '<form name="_xclick" action="' + action + '" method="post">' +
                        '<input type="hidden" name="button" value="buynow">' +
                        '<input type="hidden" name="business" value="' + business + '">' +
                        '<input type="hidden" name="item_name" value="' + itemName + '">' +
                        '<input type="hidden" name="amount" value="' + amount + '">' +
                        '<input type="hidden" name="currency_code" value="' + currencyCode + '">' +
                        '<input type="hidden" name="notify_url" value="' + notifyUrl + '">' +
                        '<input type="hidden" name="cmd" value="_xclick">' +
                        '<input type="image" src="' + imgSrc + '" border="0" name="submit" alt="' + imgAlt + '">' +
                        '<input type="hidden" name="env" value="www.sandbox">' +
                        '</form>';
                    //element.replaceWith(template);
                    element.append(template);
                }
            };
        });
})();
