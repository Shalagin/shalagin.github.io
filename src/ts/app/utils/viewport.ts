



//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  VIEWPORT UTILS                                                                          ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


class ViewportUtils
{
	private static _instance:ViewportUtils = null;
	private _getScreenWidth:Function = null;
	private _getScreenHeight:Function = null;
	public isDesktop:boolean = false;


	public static instance():ViewportUtils
	{
		!ViewportUtils._instance && new ViewportUtils();
		return ViewportUtils._instance;
	}


	constructor()
	{
		if (!ViewportUtils._instance) {
		    ViewportUtils._instance = this;
			console.log("new ViewportUtils");
			this.setScreenSize();
		}
	}


	private setScreenSize():void
	{
		var mm:Function = window['matchMedia'] || window['msMatchMedia'];
		var mq:Function = mm ? function(q:string) { return !!mm.call(window, q)['matches'] }
							 : function() { return false };

		var f:Function = function(d:string, i:string, c:string):Function
		{
			return document.documentElement[c] < window[i] && mq('(min-' + d + ':' + window[i] + 'px)')
				? function():Function { return window[i] }
				: function():Function { return document.documentElement[c] }
		}

		this._getScreenWidth = f('width', 'innerWidth', 'clientWidth');
		this._getScreenHeight = f('height', 'innerHeight', 'clientHeight');
	}


	public screenWidth():number
	{
		return ViewportUtils.instance()._getScreenWidth();
	}


	public screenHeight():number
	{
		return ViewportUtils.instance()._getScreenHeight();
	}


	public screenAspectRatio():number
	{
		return ViewportUtils.instance().screenWidth() / ViewportUtils.instance().screenHeight();
	}


	public screenOrientation():number
	{
		return ViewportUtils.instance().screenAspectRatio() > 1 ? 0 : 1; // ? "landscape 0" : "portrait 1"
	}


	public documentWidth():number
	{
		var db = document.body,
			de = document.documentElement;

		return Math.max(
			db.scrollWidth, de.scrollWidth,
			db.offsetWidth, de.offsetWidth,
			db.clientWidth, de.clientWidth
		);
	}


	public documentHeight():number
	{
		var db = document.body,
			de = document.documentElement;

		return Math.max(
			db.scrollHeight, de.scrollHeight,
			db.offsetHeight, de.offsetHeight,
			db.clientHeight, de.clientHeight
		);
	}


	public scrollX():number
	{
		return window.pageXOffset || document.documentElement.scrollLeft;
	}


	public scrollY():number
	{
		return window.pageYOffset || document.documentElement.scrollTop;
	}
}

export = ViewportUtils;