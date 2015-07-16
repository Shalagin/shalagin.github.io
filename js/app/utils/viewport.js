//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  VIEWPORT UTILS                                                                          ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
define(["require", "exports"], function (require, exports) {
    var ViewportUtils = (function () {
        function ViewportUtils() {
            this._getScreenWidth = null;
            this._getScreenHeight = null;
            this.isDesktop = false;
            if (!ViewportUtils._instance) {
                ViewportUtils._instance = this;
                console.log("new ViewportUtils");
                this.setScreenSize();
            }
        }
        ViewportUtils.instance = function () {
            !ViewportUtils._instance && new ViewportUtils();
            return ViewportUtils._instance;
        };
        ViewportUtils.prototype.setScreenSize = function () {
            var mm = window['matchMedia'] || window['msMatchMedia'];
            var mq = mm ? function (q) {
                return !!mm.call(window, q)['matches'];
            } : function () {
                return false;
            };
            var f = function (d, i, c) {
                return document.documentElement[c] < window[i] && mq('(min-' + d + ':' + window[i] + 'px)') ? function () {
                    return window[i];
                } : function () {
                    return document.documentElement[c];
                };
            };
            this._getScreenWidth = f('width', 'innerWidth', 'clientWidth');
            this._getScreenHeight = f('height', 'innerHeight', 'clientHeight');
        };
        ViewportUtils.prototype.screenWidth = function () {
            return ViewportUtils.instance()._getScreenWidth();
        };
        ViewportUtils.prototype.screenHeight = function () {
            return ViewportUtils.instance()._getScreenHeight();
        };
        ViewportUtils.prototype.screenAspectRatio = function () {
            return ViewportUtils.instance().screenWidth() / ViewportUtils.instance().screenHeight();
        };
        ViewportUtils.prototype.screenOrientation = function () {
            return ViewportUtils.instance().screenAspectRatio() > 1 ? 0 : 1; // ? "landscape 0" : "portrait 1"
        };
        ViewportUtils.prototype.documentWidth = function () {
            var db = document.body, de = document.documentElement;
            return Math.max(db.scrollWidth, de.scrollWidth, db.offsetWidth, de.offsetWidth, db.clientWidth, de.clientWidth);
        };
        ViewportUtils.prototype.documentHeight = function () {
            var db = document.body, de = document.documentElement;
            return Math.max(db.scrollHeight, de.scrollHeight, db.offsetHeight, de.offsetHeight, db.clientHeight, de.clientHeight);
        };
        ViewportUtils.prototype.scrollX = function () {
            return window.pageXOffset || document.documentElement.scrollLeft;
        };
        ViewportUtils.prototype.scrollY = function () {
            return window.pageYOffset || document.documentElement.scrollTop;
        };
        ViewportUtils._instance = null;
        return ViewportUtils;
    })();
    return ViewportUtils;
});
//# sourceMappingURL=viewport.js.map