/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../../dts/google.maps.d.ts" />
define(["require", "exports", 'utils/dispatcher'], function (require, exports, Dispatcher) {
    var the; // context reference
    var Maps = (function () {
        function Maps() {
            this.canvas = null;
            this.dispatcher = null;
            console.log("new Maps");
            this.canvas = document.getElementById('map-canvas');
            this.options = {
                zoom: 16,
                center: { lat: 55.716186, lng: 37.619300 },
                disableDefaultUI: true,
                //panControl: false,
                //zoomControl: false,
                //scaleControl: false,
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            };
            this.map = new google.maps.Map(this.canvas, this.options);
            this.dispatcher = Dispatcher.instance();
            this.dispatcher.onResizeSignal().add(this.onResizeHandler);
            the = this;
        }
        Maps.prototype.onResizeHandler = function () {
            var center = the.map.getCenter();
            google.maps.event.trigger(the.map, "resize");
            the.map.setCenter(center);
        };
        return Maps;
    })();
    return Maps;
});
//# sourceMappingURL=maps.js.map