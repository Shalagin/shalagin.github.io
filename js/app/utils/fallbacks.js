//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APP FALLBACKS                                                                           ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
define(["require", "exports"], function (require, exports) {
    var Fallbacks = (function () {
        function Fallbacks() {
        }
        Fallbacks.svgTo = function (t) {
            var src, n, list = document.getElementsByTagName("img"), l = list.length;
            while (l--) {
                src = list[l].getAttribute("src");
                if (src === null)
                    continue;
                if (Fallbacks.getExt(src) == "svg") {
                    n = src.replace(".svg", "." + t);
                    list[l].setAttribute("src", n);
                }
            }
        };
        /* UTILS */
        Fallbacks.getExt = function (src) {
            var ext = src.split(".").pop();
            return (ext.indexOf("?") !== -1) ? ext.split('?')[0] : ext;
        };
        return Fallbacks;
    })();
    return Fallbacks;
});
//# sourceMappingURL=fallbacks.js.map