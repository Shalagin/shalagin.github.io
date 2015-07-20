/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/modernizr.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  SPLASH                                                                                  ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import $ = require('jquery');
import Dispatcher = require('utils/dispatcher');
import ViewportUtils = require('utils/viewport');


var the:Splash; // context reference

class Splash
{
	private $hb:JQuery = null;
	private $videoContainer:JQuery = null;
	private $coverContainer:JQuery = null;
	private $video:JQuery = null;
	private $logo:JQuery = null;
	private $arrow:JQuery = null;

	private dispatcher:Dispatcher = null;
	private viewport:ViewportUtils = null;

	private autoplay:boolean = false;
	private videoWidth:number = 1076;
	private videoHeight:number = 606;


	constructor()
	{
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

		the = this
	}


	private onResizeHandler():void
	{
		var w:number = the.viewport.screenWidth(),
			h:number = the.viewport.screenHeight(),
			o:number = 64;

		the.autoplay && (the.videoWidth / w < the.videoHeight / h)
			? the.$video.css({ 'width': w + o, 'height': 'auto' })
			: the.$video.css({ 'width': 'auto', 'height': h + o });
	}


	private onScrollHandler():void
	{
		var	 h:number = the.viewport.screenHeight(),
			 y:number = the.viewport.scrollY(),
			lt:number = 0.5,	// logo top factor
			lo:number = 1.0,	// logo opacity factor
			ao:number = 4.0,	// arrow opacity factor
			op:number = 0.6,	// default opacity
			to:number = 40;		// default logo top

		var video:HTMLVideoElement = <any>the.$video.get(0);

		if (y > h) {
			video.played && video.pause();
			return;
		} else {
			video.paused && video.play();
		}

		the.$logo.css({
			'opacity': op * (1 - (y * lo) / h),
			'top': to / (1 - (y * lt) / h) + '%'
		});

		the.$arrow.css('opacity', op * (1 - (y * ao) / h));
	}


	private onClickArrow():void
	{
		the.$hb.stop().animate({ scrollTop: the.viewport.screenHeight() }, 250);
	}
}

export = Splash;