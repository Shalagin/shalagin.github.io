/// <reference path="dts/require.d.ts" />
/// <reference path="dts/modernizr.d.ts" />
/// <reference path="app/main.ts" />
//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  CONFIGURATION DECLARATION                                                               ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
var condition = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
var pathToJQuery = condition ? '../lib/jquery/jquery' : '../lib/jquery/jquery.old';
var pathtuJQueryUI = '../lib/jquery/jquery-ui';
var pathToSignals = '../lib/signals';
require.config({
    baseUrl: './js/app',
    paths: {
        jquery: pathToJQuery,
        jqueryui: pathtuJQueryUI,
        signals: pathToSignals
    },
    shim: {
        jqueryui: ['jquery']
    }
});
//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APPLICATION BOOTSTRAP                                                                   ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
require(['main', 'jquery', 'jqueryui'], function (Main, $) {
    'use strict';
    $(function () {
        // startup after async test
        var init = function (result) {
            console.log("app startup");
            console.log("result:", result);
            console.log("Modernizr.autoplay:", Modernizr.videoautoplay);
            var main = new Main(result);
            main.initialize();
        };
        // async test
        !(Modernizr.ie && Modernizr.ieold) ? Modernizr.on('videoautoplay', function (b) {
            init(b);
        }) : init(false);
    });
});
;
(function (doc) {
    var addEvent = 'addEventListener', type = 'gesturestart', qsa = 'querySelectorAll', scales = [1, 1], meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [], fix = function () {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    };
    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }
}(document));
//# sourceMappingURL=app.js.map