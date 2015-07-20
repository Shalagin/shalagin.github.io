/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/modernizr.d.ts" />
/// <reference path="utils/dispatcher.ts" />
/// <reference path="utils/fallbacks.ts" />
/// <reference path="module/splash.ts" />
/// <reference path="module/sticky.ts" />
/// <reference path="module/maps.ts" />
/// <reference path="module/parallax.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  MAIN MODULE                                                                             ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import $ = require('jquery');
import Dispatcher = require('utils/dispatcher');
import ViewportUtils = require('utils/viewport');
import Fallbacks = require('utils/fallbacks');
import Splash = require('module/splash');
import Maps = require('module/maps');
import Parallax = require('module/parallax');


var the:Main; // context reference

class Main
{
	private $win:JQuery = null;
	private $body:JQuery = null;
	private $fsw:JQuery = null;
	private $fsh:JQuery = null;
	private dispatcher:Dispatcher = null;
	private viewport:ViewportUtils = null;

	private splashModule:Splash = null;
	private mapsModule:Maps = null;
	private parallaxModule:Parallax = null;


	constructor(bool:boolean)
	{
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


	public initialize():void
	{
		the.splashModule = new Splash();
		the.mapsModule = new Maps();
		the.parallaxModule = new Parallax();

		this.onResizeHandler();
		this.onScrollHandler();
	}


	public onResizeHandler():void
	{
		var w:number = the.viewport.screenWidth(),
			h:number = the.viewport.screenHeight(),
			d:boolean = the.viewport.isDesktop;

		the.viewport.isDesktop = the.viewport.screenWidth() > (16 * 60);
		the.viewport.isDesktop !== d && the.dispatcher.onMobileSignal().dispatch(!d);

		the.$fsw.css('width', w);
		the.$fsh.css('height', h);

		the.dispatcher.onResizeSignal().dispatch();
	}


	private onScrollHandler():void
	{
		the.dispatcher.onScrollSignal().dispatch();
	}


	private onChangeVersion(isDesktop:boolean):void
	{
		isDesktop ? the.$body.addClass('desktop') : the.$body.removeClass('desktop');
	}
}

export = Main;