/// <reference path="../../dts/signals.d.ts" />




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APP DISPATCHER                                                                          ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


import signals = require("signals");

var Signal = signals.Signal;


class Dispatcher
{
	private static _instance:Dispatcher = null;
	private _onResizeSignal:Signal = null;
	private _onScrollSignal:Signal = null;
	private _onMobileSignal:Signal = null;



	public static instance():Dispatcher
	{
		!Dispatcher._instance && new Dispatcher();
		return Dispatcher._instance;
	}


	constructor()
	{
		if (!Dispatcher._instance) {
			Dispatcher._instance = this;
		}
	}


	public onResizeSignal():Signal
	{
		if (!this._onResizeSignal) {
			this._onResizeSignal = new Signal();
		}

		return this._onResizeSignal;
	}


	public onScrollSignal():Signal
	{
		if (!this._onScrollSignal) {
			this._onScrollSignal = new Signal();
		}

		return this._onScrollSignal;
	}


	public onMobileSignal():Signal
	{
		if (!this._onMobileSignal) {
			this._onMobileSignal = new Signal();
		}

		return this._onMobileSignal;
	}
}

export = Dispatcher;