/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/modernizr.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />
define(["require", "exports", 'jquery', 'utils/dispatcher', 'utils/viewport'], function (require, exports, $, Dispatcher, ViewportUtils) {
    var the; // context reference
    var Sticky = (function () {
        function Sticky() {
            this.$body = null;
            this.$sticky = null;
            this.$tint = null;
            this.$button = null;
            this.isOpen = false;
            this.dispatcher = null;
            this.viewport = null;
            console.log("new Sticky");
            this.$body = $('body');
            this.$sticky = $('#sticky');
            this.$tint = $('#sticky .tint');
            this.$button = $('#sticky .btn');
            this.$button.click(this.onClickButton);
            this.dispatcher = Dispatcher.instance();
            this.viewport = ViewportUtils.instance();
            this.dispatcher.onScrollSignal().add(this.onScrollHandler);
            this.dispatcher.onMobileSignal().add(this.onMobileChange);
            the = this;
        }
        Sticky.prototype.onScrollHandler = function () {
            var h = the.viewport.screenHeight(), y = the.viewport.scrollY(), min = 0.00, max = 0.98; // final opacity
            if (y > h)
                return;
            the.$tint.css('opacity', min + (max - min) * (y / h));
        };
        Sticky.prototype.onMobileChange = function () {
            the.viewport.isDesktop && the.isOpen && the.onHideMenu();
        };
        Sticky.prototype.onClickButton = function () {
            !the.isOpen ? the.onShowMenu() : the.onHideMenu();
        };
        Sticky.prototype.onShowMenu = function () {
            the.$button.addClass('open');
            the.$body.addClass('modal');
            the.isOpen = true;
        };
        Sticky.prototype.onHideMenu = function () {
            the.$button.removeClass('open');
            the.$body.removeClass('modal');
            the.isOpen = false;
        };
        return Sticky;
    })();
    return Sticky;
});
//# sourceMappingURL=sticky.js.map