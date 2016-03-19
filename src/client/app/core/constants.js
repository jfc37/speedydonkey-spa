/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('uiDatetimePickerConfig', {
            dateFormat: 'yyyy-MM-dd HH:mm',
            defaultTime: '00:00:00',
            html5Types: {
                date: 'yyyy-MM-dd',
                'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
                'month': 'yyyy-MM'
            },
            initialPicker: 'date',
            reOpenDefault: false,
            enableDate: true,
            enableTime: true,
            buttonBar: {
                show: true,
                now: {
                    show: true,
                    text: 'Now'
                },
                today: {
                    show: true,
                    text: 'Today'
                },
                clear: {
                    show: true,
                    text: 'Clear'
                },
                date: {
                    show: true,
                    text: 'Date'
                },
                time: {
                    show: true,
                    text: 'Time'
                },
                close: {
                    show: true,
                    text: 'Close'
                }
            },
            closeOnDateSelection: true,
            appendToBody: false,
            altInputFormats: [],
            ngModelOptions: {}
        });
})();
