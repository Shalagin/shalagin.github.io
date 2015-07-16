/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/modernizr.d.ts" />
/// <reference path="utils/dispatcher.ts" />
/// <reference path="utils/fallbacks.ts" />
/// <reference path="module/splash.ts" />
/// <reference path="module/sticky.ts" />
define(["require", "exports", 'jquery', 'utils/dispatcher', 'utils/viewport', 'utils/fallbacks', 'module/splash', 'module/maps'], function (require, exports, $, Dispatcher, ViewportUtils, Fallbacks, Splash, Maps) {
    var the; // context reference
    var Main = (function () {
        function Main(bool) {
            this.$win = null;
            this.$body = null;
            this.$fsw = null;
            this.$fsh = null;
            this.dispatcher = null;
            this.viewport = null;
            this.splashModule = null;
            this.mapsModule = null;
            console.log("new Main");
            Modernizr.videoautoplay = bool;
            Modernizr.svg || Fallbacks.svgTo("png");
            this.$win = $(window);
            this.$body = $('body');
            this.$fsw = $('.fullWidth');
            this.$fsh = $('.fullHeight');
            this.dispatcher = Dispatcher.instance();
            this.viewport = ViewportUtils.instance();
            this.dispatcher.onMobileSignal().add(this.onChangeVersion);
            this.$win.resize(this.onResizeHandler);
            this.$win.scroll(this.onScrollHandler);
            the = this;
        }
        Main.prototype.initialize = function () {
            the.splashModule = new Splash();
            the.mapsModule = new Maps();
            this.onResizeHandler();
            this.onScrollHandler();
        };
        Main.prototype.onResizeHandler = function () {
            var w = the.viewport.screenWidth(), h = the.viewport.screenHeight(), d = the.viewport.isDesktop;
            the.viewport.isDesktop = the.viewport.screenWidth() > (16 * 60);
            the.viewport.isDesktop !== d && the.dispatcher.onMobileSignal().dispatch(!d);
            console.log(the.$fsh, h);
            the.$fsw.css('width', w);
            the.$fsh.css('height', h);
            the.dispatcher.onResizeSignal().dispatch();
        };
        Main.prototype.onScrollHandler = function () {
            the.dispatcher.onScrollSignal().dispatch();
        };
        Main.prototype.onChangeVersion = function (isDesktop) {
            isDesktop ? the.$body.addClass('desktop') : the.$body.removeClass('desktop');
        };
        return Main;
    })();
    return Main;
});
//# sourceMappingURL=main.js.map