/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../../dts/google.maps.d.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  GOOGLE MAPS                                                                             ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import Dispatcher = require('utils/dispatcher');


var the:Maps; // context reference

class Maps
{
	private map:google.maps.Map;
	private options:Object;
	private canvas:Element = null;
	private dispatcher:Dispatcher = null;


	constructor()
	{
		console.log("new Maps");

		this.canvas = document.getElementById('map-canvas');

		this.options = {
			zoom: 18,
			center: { lat: 55.716186, lng: 37.619300 },
			disableDefaultUI: true,
			//panControl: false,
			//zoomControl: false,
			//scaleControl: false,
			draggable: false,
			zoomControl: false,
			scrollwheel: false,
			disableDoubleClickZoom: true
		}

		this.map = new google.maps.Map(this.canvas, this.options);

		this.dispatcher = Dispatcher.instance();
		this.dispatcher.onResizeSignal().add(this.onResizeHandler);

		the = this
	}


	private onResizeHandler():void
	{
		var center = the.map.getCenter();
		google.maps.event.trigger(the.map, "resize");
		the.map.setCenter(center);
	}
}

export = Maps;