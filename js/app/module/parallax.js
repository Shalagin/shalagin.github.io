/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />
define(["require", "exports", 'jquery', 'utils/dispatcher', 'utils/viewport'], function (require, exports, $, Dispatcher, ViewportUtils) {
    var the; // context reference
    var Parallax = (function () {
        function Parallax() {
            //private $n1:JQuery = null;
            this.n1 = null;
            this.n2 = null;
            this.dispatcher = null;
            console.log("new Parallax");
            this.n1 = new ParallaxNode('#parallax-n1');
            //this.viewport = ViewportUtils.instance();
            this.dispatcher = Dispatcher.instance();
            this.dispatcher.onScrollSignal().add(this.onScrollHandler);
            the = this;
        }
        Parallax.prototype.onScrollHandler = function () {
            the.n1.update();
        };
        return Parallax;
    })();
    //┐
    //│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
    //│  ║                                                                                          ║
    //╠──╢  PARALLAX NODE                                                                           ║
    //│  ║                                                                                          ║
    //│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
    //┘
    var ParallaxNode = (function () {
        function ParallaxNode(n) {
            this.$container = null;
            this.$img = null;
            this.imgWidth = 0;
            this.imgHeight = 0;
            this.viewport = null;
            this.$container = $(n).children('.parallax');
            this.$img = this.$container.children('img');
            this.imgWidth = this.$img.width();
            this.imgHeight = this.$img.height();
            this.viewport = ViewportUtils.instance();
        }
        ParallaxNode.prototype.resie = function () {
        };
        ParallaxNode.prototype.update = function () {
            var scrollY = this.viewport.scrollY();
            var screenHeight = this.viewport.screenHeight();
            var containerWidth = this.$container.width();
            var containerHeight = this.$container.height();
            var containerOffsetTop = this.$container.offset().top;
            // вычисляет процент прокрутки
            var percent = 0;
            var top = containerOffsetTop - screenHeight;
            var bottom = containerOffsetTop + containerHeight;
            if (scrollY >= top && scrollY <= bottom) {
                percent = this.deround((scrollY - top) / (bottom - top), 1000);
            }
            // фактор высоты
            var factor = 1.2;
            var factorHeight = containerHeight + containerHeight * factor;
            // вычисляет scale factor
            var scale = Math.max(containerWidth / this.imgWidth, factorHeight / this.imgHeight);
            var imgWidth = this.imgWidth * scale;
            var imgHeight = this.imgHeight * scale;
            this.$img.width(imgWidth);
            this.$img.height(imgHeight);
            // вычисляет текущую позицию y
            var min = 0;
            var max = Math.max(factorHeight, this.$img.height()) - containerHeight;
            var curtop = 1 - (min + (max - min) * percent);
            // меняет координаты
            this.$img.css({
                "left": (containerWidth - this.$img.width()) * 0.5,
                "top": curtop
            });
            //console.log(containerHeight, factorHeight);
            //console.log(this.$container.attr('data-factor'));
        };
        ParallaxNode.prototype.deround = function (p, n) {
            return Math.ceil((p) * n) / n;
        };
        return ParallaxNode;
    })();
    return Parallax;
});
//# sourceMappingURL=parallax.js.map