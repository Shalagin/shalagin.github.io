/// <reference path="../../dts/signals.d.ts" />
define(["require", "exports", "signals"], function (require, exports, signals) {
    var Signal = signals.Signal;
    var Dispatcher = (function () {
        function Dispatcher() {
            this._onResizeSignal = null;
            this._onScrollSignal = null;
            this._onMobileSignal = null;
            if (!Dispatcher._instance) {
                Dispatcher._instance = this;
            }
        }
        Dispatcher.instance = function () {
            !Dispatcher._instance && new Dispatcher();
            return Dispatcher._instance;
        };
        Dispatcher.prototype.onResizeSignal = function () {
            if (!this._onResizeSignal) {
                this._onResizeSignal = new Signal();
            }
            return this._onResizeSignal;
        };
        Dispatcher.prototype.onScrollSignal = function () {
            if (!this._onScrollSignal) {
                this._onScrollSignal = new Signal();
            }
            return this._onScrollSignal;
        };
        Dispatcher.prototype.onMobileSignal = function () {
            if (!this._onMobileSignal) {
                this._onMobileSignal = new Signal();
            }
            return this._onMobileSignal;
        };
        Dispatcher._instance = null;
        return Dispatcher;
    })();
    return Dispatcher;
});
//# sourceMappingURL=dispatcher.js.map