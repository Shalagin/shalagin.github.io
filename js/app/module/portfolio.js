/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/jqueryui.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />
define(["require", "exports", 'jquery'], function (require, exports, $) {
    var the; // context reference
    var Portfolio = (function () {
        function Portfolio() {
            this.$body = null;
            this.$modal = null;
            this.$thumb = null;
            this.$close = null;
            this.isModal = false;
            this.$body = $('body');
            this.$modal = $('#portfolio-modal');
            this.$thumb = $('#portfolio .thumb');
            this.$close = $('#portfolio-modal .close');
            this.$thumb.click(this.showModal);
            this.$close.click(this.hideModal);
            the = this;
        }
        Portfolio.prototype.showModal = function (event) {
            console.log($(this).data("id"));
            the.$body.addClass("modal");
            the.$modal.show("scale", 200);
        };
        Portfolio.prototype.hideModal = function (event) {
            the.$body.removeClass("modal");
            the.$modal.hide("scale", 200);
        };
        return Portfolio;
    })();
    return Portfolio;
});
//# sourceMappingURL=portfolio.js.map