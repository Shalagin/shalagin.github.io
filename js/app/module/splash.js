/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/modernizr.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />
define(["require", "exports", 'jquery', 'utils/dispatcher', 'utils/viewport'], function (require, exports, $, Dispatcher, ViewportUtils) {
    var the; // context reference
    var Splash = (function () {
        function Splash() {
            this.$hb = null;
            this.$videoContainer = null;
            this.$coverContainer = null;
            this.$video = null;
            this.$logo = null;
            this.$arrow = null;
            this.dispatcher = null;
            this.viewport = null;
            this.autoplay = false;
            this.videoWidth = 1076;
            this.videoHeight = 606;
            console.log("new Splash");
            this.$hb = $('html, body');
            this.$videoContainer = $('#splash .video');
            this.$coverContainer = $('#splash .cover');
            this.$video = $('#splash video');
            this.$logo = $('#splash .logo');
            this.$arrow = $('#splash .arrow');
            this.$arrow.click(this.onClickArrow);
            this.dispatcher = Dispatcher.instance();
            this.viewport = ViewportUtils.instance();
            this.dispatcher.onResizeSignal().add(this.onResizeHandler);
            this.dispatcher.onScrollSignal().add(this.onScrollHandler);
            this.autoplay = Modernizr.videoautoplay;
            this.autoplay ? this.$videoContainer.show() : this.$coverContainer.show();
            the = this;
        }
        Splash.prototype.onResizeHandler = function () {
            var w = the.viewport.screenWidth(), h = the.viewport.screenHeight(), o = 64;
            the.autoplay && (the.videoWidth / w < the.videoHeight / h) ? the.$video.css({ 'width': w + o, 'height': 'auto' }) : the.$video.css({ 'width': 'auto', 'height': h + o });
        };
        Splash.prototype.onScrollHandler = function () {
            var h = the.viewport.screenHeight(), y = the.viewport.scrollY(), lt = 0.5, lo = 1.0, ao = 4.0, op = 0.6, to = 40; // default logo top
            if (y > h)
                return;
            the.$logo.css({
                'opacity': op * (1 - (y * lo) / h),
                'top': to / (1 - (y * lt) / h) + '%'
            });
            the.$arrow.css('opacity', op * (1 - (y * ao) / h));
        };
        Splash.prototype.onClickArrow = function () {
            the.$hb.stop().animate({ scrollTop: the.viewport.screenHeight() }, 250);
        };
        return Splash;
    })();
    return Splash;
});
//# sourceMappingURL=splash.js.map