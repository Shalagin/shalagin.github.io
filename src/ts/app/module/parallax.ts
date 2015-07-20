/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../utils/dispatcher.ts" />
/// <reference path="../utils/viewport.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  PARALLAX                                                                                ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import $ = require('jquery');
import Dispatcher = require('utils/dispatcher');
import ViewportUtils = require('utils/viewport');


var the:Parallax; // context reference

class Parallax
{
	//private $n1:JQuery = null;

	private n1:ParallaxNode = null;
	private n2:ParallaxNode = null;

	private dispatcher:Dispatcher = null;


	constructor()
	{
		console.log("new Parallax");
		this.n1 = new ParallaxNode('#parallax-n1');
		this.n2 = new ParallaxNode('#parallax-n2');
		//this.viewport = ViewportUtils.instance();
		this.dispatcher = Dispatcher.instance();
		this.dispatcher.onScrollSignal().add(this.onScrollHandler);
		the = this;
	}


	private onScrollHandler():void
	{
		the.n1.update();
		the.n2.update();
	}


	/*private getImgSize(img:JQuery):void
	{
		$("<img>").attr("src", img.attr("src")).load(function(){
			var realWidth = this.width;
			var realHeight = this.height;
			console.log("Original width=" + realWidth + ", " + "Original height=" + realHeight);
		});
	}*/
}

export = Parallax;




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  PARALLAX NODE                                                                           ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


class ParallaxNode
{
	private $container:JQuery = null;
	private $img:JQuery = null;
	private imgWidth:number = 0;
	private imgHeight:number = 0;

	private viewport:ViewportUtils = null;


	constructor(n:string)
	{
		this.$container = $(n).children('.parallax');
		this.$img = this.$container.children('img');
		this.imgWidth = this.$img.width();
		this.imgHeight = this.$img.height();

		this.viewport = ViewportUtils.instance();
	}


	public resie():void
	{

	}


	public update():void
	{
		var scrollY:number = this.viewport.scrollY();
		var screenHeight:number = this.viewport.screenHeight();

		var containerWidth:number = this.$container.width();
		var containerHeight:number = this.$container.height();
		var containerOffsetTop:number = this.$container.offset().top;


		// вычисляет процент прокрутки
		var percent:number = 0;
		var top:number = containerOffsetTop - screenHeight;
		var bottom:number = containerOffsetTop + containerHeight;

		if (scrollY >= top && scrollY <= bottom) {
			percent = this.deround((scrollY - top) / (bottom - top), 1000);
			//console.log(percent);
		}


		// фактор высоты
		var factor:number = 2;
		var factorHeight:number = containerHeight + containerHeight * factor;


		// вычисляет scale factor
		var scale:number = Math.max(containerWidth / this.imgWidth, factorHeight / this.imgHeight);

		var imgWidth:number = this.imgWidth * scale;
		var imgHeight:number = this.imgHeight * scale;

		this.$img.width(imgWidth);
		this.$img.height(imgHeight);


		// вычисляет текущую позицию y
		var min:number = 0;
		var max:number = Math.max(factorHeight, this.$img.height()) - containerHeight;
		var curtop:number = 1 - (min + (max - min) * percent);


		// меняет координаты
		this.$img.css({
			"left": (containerWidth - this.$img.width()) * 0.5,
			"top": curtop
		});

		//console.log(containerHeight, factorHeight);
		console.log(this.$container.attr('data-factor'));
	}


	private deround(p:number, n:number):number
	{
		return Math.ceil((p) * n) / n;
	}
}