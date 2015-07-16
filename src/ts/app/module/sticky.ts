/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/modernizr.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  STICKY                                                                                  ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import $ = require('jquery');
import Dispatcher = require('utils/dispatcher');
import ViewportUtils = require('utils/viewport');


var the:Sticky; // context reference

class Sticky
{
	private $body:JQuery = null;
	private $sticky:JQuery = null;
	private $tint:JQuery = null;
	private $button:JQuery = null;

	private isOpen:boolean = false;

	private dispatcher:Dispatcher = null;
	private viewport:ViewportUtils = null;


	constructor()
	{
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

		the = this
	}


	private onScrollHandler():void
	{
		var	h:number = the.viewport.screenHeight(),
			y:number = the.viewport.scrollY(),
			min:number = 0.00,	// default opacity
			max:number = 0.98;	// final opacity

		if (y > h) return;

		the.$tint.css('opacity', min + (max - min) * (y/h));
	}


	private onMobileChange():void
	{
		the.viewport.isDesktop && the.isOpen && the.onHideMenu();
	}


	private onClickButton():void
	{
		!the.isOpen ? the.onShowMenu() : the.onHideMenu();
	}


	private onShowMenu():void
	{
		the.$button.addClass('open');
		the.$body.addClass('modal');
		the.isOpen = true;
	}


	private onHideMenu():void
	{
		the.$button.removeClass('open');
		the.$body.removeClass('modal');
		the.isOpen = false;
	}
}

export = Sticky;