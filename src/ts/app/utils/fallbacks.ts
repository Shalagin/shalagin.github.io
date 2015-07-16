



//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APP FALLBACKS                                                                           ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


class Fallbacks
{
	public static svgTo(t:string):void
	{
		var src:string, n:string,
			list:NodeListOf<HTMLImageElement> = document.getElementsByTagName("img"),
			l:number = list.length;

		while (l--)
		{
			src = list[l].getAttribute("src");
			if (src === null) continue;
			if (Fallbacks.getExt(src) == "svg") {
				n = src.replace(".svg", "." + t);
				list[l].setAttribute("src", n);
			}
		}
	}

	/* UTILS */

	private static getExt(src:string):string
	{
		var ext:string = src.split(".").pop();
		return (ext.indexOf("?") !== -1) ? ext.split('?')[0] : ext;
	}
}

export = Fallbacks;