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


var pathToJQuery:string  = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window)
                         ? '../lib/jquery' : '../lib/jquery.old';
var pathToSignals:string = '../lib/signals';

require.config({
    baseUrl: './js/app',

    paths: {
        jquery: pathToJQuery,
        signals: pathToSignals
    },

    shim: {
        jquery: {
            exports: '$'
        }
    }
});




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APPLICATION BOOTSTRAP                                                                   ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


require(
    ['main', 'jquery'], (Main, $) => {
        'use strict';
        $(() =>
        {
            // startup after async test
            var init:Function = function(result:boolean)
            {
                console.log("app startup");
                console.log("result:", result);
                console.log("Modernizr.autoplay:", Modernizr.videoautoplay);
                var main = new Main(result);
                    main.initialize();
            };

            // async test
            !(Modernizr.ie && Modernizr.ieold) ? Modernizr.on('videoautoplay', function(b:boolean) { init(b) }) : init(false);
        });
    }
);




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  OLD IOS DEVICE RESIZE FIX BUG                                                           ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


;(function(doc)
{
    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [],
        fix = function() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, fix, true);
        };

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }

}(document));