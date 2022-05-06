/** GENERATED: Tue Apr 26 02:34:52 GMT 2022 **/
var conditionizr = function(a) {
    function e(a, b) {
        for (var c in b) {
            try {
                a[c] = b[c].constructor == Object ? e(a[c], b[c]) : b[c];
            } catch (d) {
                a[c] = b[c];
            }
        }
        return a;
    }
    function f() {
        for (var a in k) {
            var e = k[a]
              , f = b.getElementsByTagName("head")[0];
            if ("classes" === a && e && (c.className += " " + l),
            "scripts" === a && e) {
                var g = b.createElement("script");
                g.src = d.scriptSrc + l + ".js",
                f.appendChild(g);
            }
            if ("styles" === a && e) {
                var h = b.createElement("link");
                h.rel = "stylesheet",
                h.href = d.styleSrc + l + ".css",
                f.appendChild(h);
            }
            if ("customScript" === a && e) {
                for (var i = k.customScript.replace(/\s/g, ""), j = i.split(","), m = 0; j.length > m; m++) {
                    var n = b.createElement("script");
                    n.src = j[m],
                    f.appendChild(n);
                }
            }
        }
    }
    function m() {
        var a = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var b = navigator.userAgent
              , c = RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null != c.exec(b) && (a = parseFloat(RegExp.$1));
        }
        return a;
    }
    var b = document
      , c = b.documentElement;
    c.id = "conditionizr";
    var d = {
        debug: !1,
        scriptSrc: "js/conditionizr/",
        styleSrc: "css/conditionizr/",
        ieLessThan: {
            active: !1,
            version: "9",
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        chrome: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        safari: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        opera: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        firefox: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        ie10: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        ie9: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        ie8: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        ie7: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        ie6: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        retina: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        touch: {
            scripts: !1,
            styles: !1,
            classes: !0,
            customScript: !1
        },
        mac: !0,
        win: !0,
        x11: !0,
        linux: !0
    };
    a && e(d, a);
    for (var g = "", h = [{
        testWith: "chrome",
        testSettings: d.chrome
    }, {
        testWith: "safari",
        testSettings: d.safari
    }, {
        testWith: "firefox",
        testSettings: d.firefox
    }, {
        testWith: "opera",
        testSettings: d.opera
    }], i = 0; h.length > i; i++) {
        var j = h[i];
        if (navigator.userAgent.toLowerCase().indexOf(j.testWith) > -1) {
            var k = j.testSettings
              , l = j.testWith;
            f(),
            g = l;
            break;
        }
    }
    var n = m();
    if (n > -1) {
        if (d.ieLessThan.version + ".0" > n) {
            var l = "lt-ie" + d.ieLessThan.version
              , k = d.ieLessThan;
            f();
        }
        if (10 === n) {
            var k = d.ie10;
        } else {
            if (9 === n) {
                var k = d.ie9;
            } else {
                if (8 === n) {
                    var k = d.ie8;
                } else {
                    if (7 === n) {
                        var k = d.ie7;
                    } else {
                        if (6 === n) {
                            var k = d.ie6;
                        }
                    }
                }
            }
        }
        var l = "ie" + n;
        f(),
        g = l;
    }
    var o = "";
    if (window.devicePixelRatio >= 2) {
        var k = d.retina
          , l = "retina";
        f(),
        o += " " + l,
        l = g;
    } else {
        c.className += " no-retina";
    }
    if ("ontouchstart"in window) {
        var k = d.touch
          , l = "touch";
        f(),
        o += " " + l,
        l = g;
    } else {
        c.className += " no-touch";
    }
    for (var p = [{
        testWith: "Win",
        testSettings: d.win
    }, {
        testWith: "Mac",
        testSettings: d.mac
    }, {
        testWith: "X11",
        testSettings: d.x11
    }, {
        testWith: "Linux",
        testSettings: d.linux
    }], i = 0; p.length > i; i++) {
        var q = p[i];
        if (navigator.appVersion.indexOf(q.testWith) > -1) {
            var r = q.testSettings
              , s = q.testWith;
            r && (c.className += " " + q.testWith.toLowerCase());
            break;
        }
    }
    d.debug && (console.log("Start Conditionizr Debug\n"),
    console.log("Script location: " + d.scriptSrc),
    console.log("Style location: " + d.styleSrc),
    console.log("Browser: " + l),
    o && console.log("Browser Extras: " + o),
    console.log("OS: " + s),
    console.log("End Conditionizr Debug\n"));
};
window.Modernizr = function(a, b, c) {
    function D(a) {
        j.cssText = a;
    }
    function E(a, b) {
        return D(n.join(a + ";") + (b || ""));
    }
    function F(a, b) {
        return typeof a === b;
    }
    function G(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function H(a, b) {
        for (var d in a) {
            if (j[a[d]] !== c) {
                return b == "pfx" ? a[d] : !0;
            }
        }
        return !1;
    }
    function I(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) {
                return d === !1 ? a[e] : F(f, "function") ? f.bind(d || b) : f;
            }
        }
        return !1;
    }
    function J(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.substr(1)
          , e = (a + " " + p.join(d + " ") + d).split(" ");
        return F(b, "string") || F(b, "undefined") ? H(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "),
        I(e, b, c));
    }
    function L() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) {
                u[c[d]] = c[d]in k;
            }
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement),
            u;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),
        e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) {
                k.setAttribute("type", f = a[d]),
                e = k.type !== "text",
                e && (k.value = l,
                k.style.cssText = "position:absolute;visibility:hidden;",
                /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k),
                h = b.defaultView,
                e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0,
                g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : /^color$/.test(f) ? (g.appendChild(k),
                g.offsetWidth,
                e = k.value != l,
                g.removeChild(k)) : e = k.value != l)),
                t[a[d]] = !!e;
            }
            return t;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var d = "2.5.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = {
        svg: "http://www.w3.org/2000/svg"
    }, s = {}, t = {}, u = {}, v = [], w = v.slice, x, y = function(a, c, d, e) {
        var f, i, j, k = b.createElement("div"), l = b.body, m = l ? l : b.createElement("body");
        if (parseInt(d, 10)) {
            while (d--) {
                j = b.createElement("div"),
                j.id = e ? e[d] : h + (d + 1),
                k.appendChild(j);
            }
        }
        return f = ["&#173;", "<style>", a, "</style>"].join(""),
        k.id = h,
        (l ? k : m).innerHTML += f,
        m.appendChild(k),
        l || (m.style.background = "",
        g.appendChild(m)),
        i = c(k, a),
        l ? k.parentNode.removeChild(k) : m.parentNode.removeChild(m),
        !!i;
    }, z = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) {
            return c(b).matches;
        }
        var d;
        return y("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
            d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute";
        }),
        d;
    }, A = function() {
        function d(d, e) {
            e = e || b.createElement(a[d] || "div"),
            d = "on" + d;
            var f = d in e;
            return f || (e.setAttribute || (e = b.createElement("div")),
            e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""),
            f = F(e[d], "function"),
            F(e[d], "undefined") || (e[d] = c),
            e.removeAttribute(d))),
            e = null,
            f;
        }
        var a = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return d;
    }(), B = {}.hasOwnProperty, C;
    !F(B, "undefined") && !F(B.call, "undefined") ? C = function(a, b) {
        return B.call(a, b);
    }
    : C = function(a, b) {
        return b in a && F(a.constructor.prototype[b], "undefined");
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") {
            throw new TypeError;
        }
        var d = w.call(arguments, 1)
          , e = function() {
            if (this instanceof e) {
                var a = function() {};
                a.prototype = c.prototype;
                var f = new a
                  , g = c.apply(f, d.concat(w.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(w.call(arguments)));
        };
        return e;
    }
    );
    var K = function(c, d) {
        var f = c.join("")
          , g = d.length;
        y(f, function(c, d) {
            var f = b.styleSheets[b.styleSheets.length - 1]
              , h = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : ""
              , i = c.childNodes
              , j = {};
            while (g--) {
                j[i[g].id] = i[g];
            }
            e.touch = "ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch || (j.touch && j.touch.offsetTop) === 9,
            e.csstransforms3d = (j.csstransforms3d && j.csstransforms3d.offsetLeft) === 9 && j.csstransforms3d.offsetHeight === 3,
            e.generatedcontent = (j.generatedcontent && j.generatedcontent.offsetHeight) >= 1,
            e.fontface = /src/i.test(h) && h.indexOf(d.split(" ")[0]) === 0;
        }, g, d);
    }(['@font-face {font-family:"font";src:url("https://")}', ["@media (", n.join("touch-enabled),("), h, ")", "{#touch{top:9px;position:absolute}}"].join(""), ["@media (", n.join("transform-3d),("), h, ")", "{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join(""), ['#generatedcontent:after{content:"', l, '";visibility:hidden}'].join("")], ["fontface", "touch", "csstransforms3d", "generatedcontent"]);
    s.flexbox = function() {
        return J("flexOrder");
    }
    ,
    s["flexbox-legacy"] = function() {
        return J("boxDirection");
    }
    ,
    s.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d");
    }
    ,
    s.canvastext = function() {
        return !!e.canvas && !!F(b.createElement("canvas").getContext("2d").fillText, "function");
    }
    ,
    s.webgl = function() {
        try {
            var d = b.createElement("canvas"), e;
            e = !(!a.WebGLRenderingContext || !d.getContext("experimental-webgl") && !d.getContext("webgl")),
            d = c;
        } catch (f) {
            e = !1;
        }
        return e;
    }
    ,
    s.touch = function() {
        return e.touch;
    }
    ,
    s.geolocation = function() {
        return !!navigator.geolocation;
    }
    ,
    s.postmessage = function() {
        return !!a.postMessage;
    }
    ,
    s.websqldatabase = function() {
        return !!a.openDatabase;
    }
    ,
    s.indexedDB = function() {
        return !!J("indexedDB", a);
    }
    ,
    s.hashchange = function() {
        return A("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
    }
    ,
    s.history = function() {
        return !!a.history && !!history.pushState;
    }
    ,
    s.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable"in a || "ondragstart"in a && "ondrop"in a;
    }
    ,
    s.websockets = function() {
        for (var b = -1, c = p.length; ++b < c; ) {
            if (a[p[b] + "WebSocket"]) {
                return !0;
            }
        }
        return "WebSocket"in a;
    }
    ,
    s.rgba = function() {
        return D("background-color:rgba(150,255,150,.5)"),
        G(j.backgroundColor, "rgba");
    }
    ,
    s.hsla = function() {
        return D("background-color:hsla(120,40%,100%,.5)"),
        G(j.backgroundColor, "rgba") || G(j.backgroundColor, "hsla");
    }
    ,
    s.multiplebgs = function() {
        return D("background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(j.background);
    }
    ,
    s.backgroundsize = function() {
        return J("backgroundSize");
    }
    ,
    s.borderimage = function() {
        return J("borderImage");
    }
    ,
    s.borderradius = function() {
        return J("borderRadius");
    }
    ,
    s.boxshadow = function() {
        return J("boxShadow");
    }
    ,
    s.textshadow = function() {
        return b.createElement("div").style.textShadow === "";
    }
    ,
    s.opacity = function() {
        return E("opacity:.55"),
        /^0.55$/.test(j.opacity);
    }
    ,
    s.cssanimations = function() {
        return J("animationName");
    }
    ,
    s.csscolumns = function() {
        return J("columnCount");
    }
    ,
    s.cssgradients = function() {
        var a = "background-image:"
          , b = "gradient(linear,left top,right bottom,from(#9f9),to(white));"
          , c = "linear-gradient(left top,#9f9, white);";
        return D((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)),
        G(j.backgroundImage, "gradient");
    }
    ,
    s.cssreflections = function() {
        return J("boxReflect");
    }
    ,
    s.csstransforms = function() {
        return !!J("transform");
    }
    ,
    s.csstransforms3d = function() {
        var a = !!J("perspective");
        return a && "webkitPerspective"in g.style && (a = e.csstransforms3d),
        a;
    }
    ,
    s.csstransitions = function() {
        return J("transition");
    }
    ,
    s.fontface = function() {
        return e.fontface;
    }
    ,
    s.generatedcontent = function() {
        return e.generatedcontent;
    }
    ,
    s.video = function() {
        var a = b.createElement("video")
          , c = !1;
        try {
            if (c = !!a.canPlayType) {
                c = new Boolean(c),
                c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
                c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
                c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
            }
        } catch (d) {}
        return c;
    }
    ,
    s.audio = function() {
        var a = b.createElement("audio")
          , c = !1;
        try {
            if (c = !!a.canPlayType) {
                c = new Boolean(c),
                c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "");
            }
        } catch (d) {}
        return c;
    }
    ,
    s.localstorage = function() {
        try {
            return localStorage.setItem(h, h),
            localStorage.removeItem(h),
            !0;
        } catch (a) {
            return !1;
        }
    }
    ,
    s.sessionstorage = function() {
        try {
            return sessionStorage.setItem(h, h),
            sessionStorage.removeItem(h),
            !0;
        } catch (a) {
            return !1;
        }
    }
    ,
    s.webworkers = function() {
        return !!a.Worker;
    }
    ,
    s.applicationcache = function() {
        return !!a.applicationCache;
    }
    ,
    s.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect;
    }
    ,
    s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>",
        (a.firstChild && a.firstChild.namespaceURI) == r.svg;
    }
    ,
    s.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")));
    }
    ,
    s.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")));
    }
    ;
    for (var M in s) {
        C(s, M) && (x = M.toLowerCase(),
        e[x] = s[M](),
        v.push((e[x] ? "" : "no-") + x));
    }
    return e.input || L(),
    e.addTest = function(a, b) {
        if (typeof a == "object") {
            for (var d in a) {
                C(a, d) && e.addTest(d, a[d]);
            }
        } else {
            a = a.toLowerCase();
            if (e[a] !== c) {
                return e;
            }
            b = typeof b == "function" ? b() : b,
            g.className += " " + (b ? "" : "no-") + a,
            e[a] = b;
        }
        return e;
    }
    ,
    D(""),
    i = k = null,
    e._version = d,
    e._prefixes = n,
    e._domPrefixes = q,
    e._cssomPrefixes = p,
    e.mq = z,
    e.hasEvent = A,
    e.testProp = function(a) {
        return H([a]);
    }
    ,
    e.testAllProps = J,
    e.testStyles = y,
    e.prefixed = function(a, b, c) {
        return b ? J(a, b, c) : J(a, "pfx");
    }
    ,
    g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""),
    e;
}(this, this.document),
function(a, b) {
    function g(a, b) {
        var c = a.createElement("p")
          , d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>",
        d.insertBefore(c.lastChild, d.firstChild);
    }
    function h() {
        var a = k.elements;
        return typeof a == "string" ? a.split(" ") : a;
    }
    function i(a) {
        var b = {}
          , c = a.createElement
          , e = a.createDocumentFragment
          , f = e();
        a.createElement = function(a) {
            var e = (b[a] || (b[a] = c(a))).cloneNode();
            return k.shivMethods && e.canHaveChildren && !d.test(a) ? f.appendChild(e) : e;
        }
        ,
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g, function(a) {
            return b[a] = c(a),
            f.createElement(a),
            'c("' + a + '")';
        }) + ");return n}")(k, f);
    }
    function j(a) {
        var b;
        return a.documentShived ? a : (k.shivCSS && !e && (b = !!g(a, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),
        f || (b = !i(a)),
        b && (a.documentShived = b),
        a);
    }
    function o(a) {
        var b, c = a.getElementsByTagName("*"), d = c.length, e = RegExp("^(?:" + h().join("|") + ")$", "i"), f = [];
        while (d--) {
            b = c[d],
            e.test(b.nodeName) && f.push(b.applyElement(p(b)));
        }
        return f;
    }
    function p(a) {
        var b, c = a.attributes, d = c.length, e = a.ownerDocument.createElement(m + ":" + a.nodeName);
        while (d--) {
            b = c[d],
            b.specified && e.setAttribute(b.nodeName, b.nodeValue);
        }
        return e.style.cssText = a.style.cssText,
        e;
    }
    function q(a) {
        var b, c = a.split("{"), d = c.length, e = RegExp("(^|[\\s,>+~])(" + h().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), f = "$1" + m + "\\:$2";
        while (d--) {
            b = c[d] = c[d].split("}"),
            b[b.length - 1] = b[b.length - 1].replace(e, f),
            c[d] = b.join("}");
        }
        return c.join("{");
    }
    function r(a) {
        var b = a.length;
        while (b--) {
            a[b].removeNode();
        }
    }
    function s(a) {
        var b, c, d = a.namespaces, e = a.parentWindow;
        return !n || a.printShived ? a : (typeof d[m] == "undefined" && d.add(m),
        e.attachEvent("onbeforeprint", function() {
            var d, e, f, h = a.styleSheets, i = [], j = h.length, k = Array(j);
            while (j--) {
                k[j] = h[j];
            }
            while (f = k.pop()) {
                if (!f.disabled && l.test(f.media)) {
                    for (d = f.imports,
                    j = 0,
                    e = d.length; j < e; j++) {
                        k.push(d[j]);
                    }
                    try {
                        i.push(f.cssText);
                    } catch (m) {}
                }
            }
            i = q(i.reverse().join("")),
            c = o(a),
            b = g(a, i);
        }),
        e.attachEvent("onafterprint", function() {
            r(c),
            b.removeNode(!0);
        }),
        a.printShived = !0,
        a);
    }
    var c = a.html5 || {}, d = /^<|^(?:button|form|map|select|textarea)$/i, e, f;
    (function() {
        var a = b.createElement("a");
        a.innerHTML = "<xyz></xyz>",
        e = "hidden"in a,
        f = a.childNodes.length == 1 || function() {
            try {
                b.createElement("a");
            } catch (a) {
                return !0;
            }
            var c = b.createDocumentFragment();
            return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined";
        }();
    }
    )();
    var k = {
        elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: c.shivCSS !== !1,
        shivMethods: c.shivMethods !== !1,
        type: "default",
        shivDocument: j
    };
    a.html5 = k,
    j(b);
    var l = /^$|\b(?:all|print)\b/
      , m = "html5shiv"
      , n = !f && function() {
        var c = b.documentElement;
        return typeof b.namespaces != "undefined" && typeof b.parentWindow != "undefined" && typeof c.applyElement != "undefined" && typeof c.removeNode != "undefined" && typeof a.attachEvent != "undefined";
    }();
    k.type += " print",
    k.shivPrint = s,
    s(b);
}(this, document),
function(a, b, c) {
    function d(a) {
        return o.call(a) == "[object Function]";
    }
    function e(a) {
        return typeof a == "string";
    }
    function f() {}
    function g(a) {
        return !a || a == "loaded" || a == "complete" || a == "uninitialized";
    }
    function h() {
        var a = p.shift();
        q = 1,
        a ? a.t ? m(function() {
            (a.t == "c" ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(),
        h()) : q = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1,
            !q && h(),
            l.onload = l.onreadystatechange = null,
            b)) {
                a != "img" && m(function() {
                    t.removeChild(l);
                }, 50);
                for (var d in y[c]) {
                    y[c].hasOwnProperty(d) && y[c][d].onload();
                }
            }
        }
        var j = j || B.errorTimeout
          , l = {}
          , o = 0
          , r = 0
          , u = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        y[c] === 1 && (r = 1,
        y[c] = [],
        l = b.createElement(a)),
        a == "object" ? l.data = c : (l.src = c,
        l.type = a),
        l.width = l.height = "0",
        l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r);
        }
        ,
        p.splice(e, 0, u),
        a != "img" && (r || y[c] === 2 ? (t.insertBefore(l, s ? null : n),
        m(k, j)) : y[c].push(l));
    }
    function j(a, b, c, d, f) {
        return q = 0,
        b = b || "j",
        e(a) ? i(b == "c" ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a),
        p.length == 1 && h()),
        this;
    }
    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        },
        a;
    }
    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && o.call(a.opera) == "[object Opera]", l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return o.call(a) == "[object Array]";
    }
    , x = [], y = {}, z = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]),
            a;
        }
    }, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
                url: c,
                origUrl: c,
                prefixes: a
            }, e, f, g;
            for (f = 0; f < d; f++) {
                g = a[f].split("="),
                (e = z[g.shift()]) && (c = e(c, g));
            }
            for (f = 0; f < b; f++) {
                c = x[f](c);
            }
            return c;
        }
        function g(a, e, f, g, i) {
            var j = b(a)
              , l = j.autoCallback;
            j.url.split(".").pop().split("?").shift(),
            j.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]] || h),
            j.instead ? j.instead(a, e, f, g, i) : (y[j.url] ? j.noexec = !0 : y[j.url] = 1,
            f.load(j.url, j.forceCSS || !j.forceJS && "css" == j.url.split(".").pop().split("?").shift() ? "c" : c, j.noexec, j.attrs, j.timeout),
            (d(e) || d(l)) && f.load(function() {
                k(),
                e && e(j.origUrl, i, g),
                l && l(j.origUrl, i, g),
                y[j.url] = 2;
            })));
        }
        function i(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) {
                        c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a),
                            l();
                        }
                        ),
                        g(a, j, b, 0, h);
                    } else {
                        if (Object(a) === a) {
                            for (n in m = function() {
                                var b = 0, c;
                                for (c in a) {
                                    a.hasOwnProperty(c) && b++;
                                }
                                return b;
                            }(),
                            a) {
                                a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                    var a = [].slice.call(arguments);
                                    k.apply(this, a),
                                    l();
                                }
                                : j[n] = function(a) {
                                    return function() {
                                        var b = [].slice.call(arguments);
                                        a && a.apply(this, b),
                                        l();
                                    }
                                    ;
                                }(k[n])),
                                g(a[n], j, b, n, h));
                            }
                        }
                    }
                } else {
                    !c && l();
                }
            }
            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i),
            i && c(i);
        }
        var j, l, m = this.yepnope.loader;
        if (e(a)) {
            g(a, 0, m, 0);
        } else {
            if (w(a)) {
                for (j = 0; j < a.length; j++) {
                    l = a[j],
                    e(l) ? g(l, 0, m, 0) : w(l) ? B(l) : Object(l) === l && i(l, m);
                }
            } else {
                Object(a) === a && i(a, m);
            }
        }
    }
    ,
    B.addPrefix = function(a, b) {
        z[a] = b;
    }
    ,
    B.addFilter = function(a) {
        x.push(a);
    }
    ,
    B.errorTimeout = 10000,
    b.readyState == null && b.addEventListener && (b.readyState = "loading",
    b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0),
        b.readyState = "complete";
    }
    , 0)),
    a.yepnope = k(),
    a.yepnope.executeStack = h,
    a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) {
            k.setAttribute(o, d[o]);
        }
        c = j ? h : c || f,
        k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1,
            c(),
            k.onload = k.onreadystatechange = null);
        }
        ,
        m(function() {
            l || (l = 1,
            c(1));
        }, e),
        i ? k.onload() : n.parentNode.insertBefore(k, n);
    }
    ,
    a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a,
        e.rel = "stylesheet",
        e.type = "text/css";
        for (j in d) {
            e.setAttribute(j, d[j]);
        }
        g || (n.parentNode.insertBefore(e, n),
        m(c, 0));
    }
    ;
}(this, document),
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
}
;
window.espn = window.espn || {};
window.jQuery = window.jQuery || {};
String.prototype.namespace = function(separator) {
    var ns = this.split(separator || "."), p = window, i, len;
    for (i = 0,
    len = ns.length; i < len; i++) {
        p = p[ns[i]] = p[ns[i]] || {};
    }
}
;
jQuery.cookie = function(key, value) {
    var settings = {
        domain: ".espn.go.com",
        path: "/",
        secure: window.location.protocol === "https:",
        expires: null
    }, regex, r, date, expires, path = settings.path !== null ? "; path=" + settings.path : "", domain = settings.domain !== null ? "; domain=" + settings.domain : "", secure = settings.path === true ? "; secure=" : "";
    if (typeof value === "undefined") {
        regex = new RegExp("(^|;) ?" + key + "=([^;]+)(;|$)","g");
        r = regex.exec(document.cookie);
        if (r !== null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    if (settings.expires !== null && (typeof settings.expires === "number" || settings.expires.toUTCString)) {
        if (typeof settings.expires === "number") {
            date = new Date();
            date.setTime(date.getTime() + (settings.expires * 24 * 60 * 60 * 1000));
        } else {
            date = settings.expires;
        }
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = [key, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    return document.cookie;
}
;
"espn.core".namespace();
function ad_segments() {
    var o = ""
      , c = jQuery.cookie("CRBLM");
    if (c) {
        c = c.substring(9);
        var index = 0
          , value = 0
          , count = 0
          , key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        for (var i = 0, n = c.length, nn = n - (n % 4); i < nn; ) {
            var enc1 = key.indexOf(c.charAt(i++));
            var enc2 = key.indexOf(c.charAt(i++));
            value |= (enc1 << 2 | enc2 >> 4) << (index++ ? 0 : 8);
            if (!(index - 2) && value) {
                o += "seg=" + value + ";";
                if (++count == 6) {
                    break;
                }
            }
            value *= (index %= 6) && index - 2 ? 1 : 0;
            var enc3 = key.indexOf(c.charAt(i++));
            if (enc3 != 64) {
                value |= ((enc2 & 15) << 4 | enc3 >> 2) << (index++ ? 0 : 8);
                if (!(index - 2) && value) {
                    o += "seg=" + value + ";";
                    if (++count == 6) {
                        break;
                    }
                }
                value *= (index %= 6) && index - 2 ? 1 : 0;
            }
            var enc4 = key.indexOf(c.charAt(i++));
            if (enc4 != 64) {
                value |= ((enc3 & 3) << 6 | enc4) << (index++ ? 0 : 8);
                if (!(index - 2) && value) {
                    o += "seg=" + value + ";";
                    if (++count == 6) {
                        break;
                    }
                }
                value *= (index %= 6) && index - 2 ? 1 : 0;
            }
        }
    }
    return o;
}
espn.core.ad_segments = ad_segments;
(function($) {
    $.fn.sharetools = function(url) {
        var $recommendLinks = this.find(".facebook-recommend a"), $tweetLinks = this.find(".twitter-tweet a"), $commentLinks = $(".echo-comments a, .fb-comments a"), $emailLinks = this.find(".espn-email a"), $followLinks = $(".twitter-follow a"), $printLinks = $(".print a"), $insiderLinks = $(".insider a"), $recommendCounts = this.find(".facebook-recommend .count"), $tweetCounts = this.find(".twitter-tweet .count"), $commentCounts = this.find(".echo-comments .count"), $fbCommentCounts = this.find(".fb-comments .count"), $commentCountsLong = this.find(".echo-comments-long .count"), $fbCommentCountsLong = this.find(".fb-comments-long .count"), $pageActionsTop = $("#page-actions-top"), $verticalShare = $("#page-actions-top .mod-page-actions.vert"), $pageActionsBottom = $("#page-actions-bottom"), $window = $(window), recommendCountNum, tweetCountNum, commentCountNum, sluglessUrl, count;
        function fixCounts(countString) {
            countString = countString + "";
            countString = countString.replace("+", "");
            count = parseInt(countString, 10);
            if (count > 999) {
                count = Math.floor(count / 1000);
                count = count + "K";
            }
            if (count === "5K") {
                count = "5K+";
            }
            return count;
        }
        if ($recommendCounts.length > 0 || $fbCommentCounts.length > 0 || $fbCommentCountsLong.length > 0) {
            var query = "SELECT url, total_count, commentsbox_count FROM link_stat WHERE url='" + url + "'";
            $.ajax({
                url: "https://graph.facebook.com/fql",
                data: {
                    q: query
                },
                dataType: "jsonp",
                cache: true,
                context: this,
                success: function(data) {
                    if (!!data && !!data.data && !!data.data[0]) {
                        if ($recommendCounts.length > 0) {
                            recommendCountNum = data.data[0].total_count;
                            if (typeof (recommendCountNum) !== "undefined") {
                                recommendCountNum = fixCounts(recommendCountNum);
                                $recommendCounts.each(function(i, v) {
                                    $(this).html(recommendCountNum);
                                });
                            }
                        }
                        if ($fbCommentCounts.length > 0) {
                            commentCountNum = data.data[0].commentsbox_count;
                            if (typeof (commentCountNum) !== "undefined") {
                                commentCountNum = fixCounts(commentCountNum);
                                $fbCommentCounts.each(function(i, v) {
                                    $(this).html(commentCountNum);
                                });
                            }
                        }
                        if ($fbCommentCountsLong.length > 0) {
                            commentCountNum = data.data[0].commentsbox_count;
                            if (typeof (commentCountNum) !== "undefined") {
                                $fbCommentCountsLong.each(function(i, v) {
                                    $(this).html(commentCountNum);
                                });
                            }
                        }
                    }
                }
            });
        }
        if ($tweetCounts.length > 0) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cdn.api.twitter.com/1/urls/count.json?url=" + escape(url),
                cache: true,
                success: function(data) {
                    tweetCountNum = data.count;
                    if (typeof (tweetCountNum) !== "undefined") {
                        tweetCountNum = fixCounts(tweetCountNum);
                        $tweetCounts.each(function(i, v) {
                            $(this).html(tweetCountNum);
                        });
                    }
                }
            });
        }
        if ($commentCounts.length > 0 || $commentCountsLong.length > 0) {
            sluglessUrl = url;
            var parameterStart = sluglessUrl.indexOf("/_/"), baseUrl, parameters, i;
            if (parameterStart > -1) {
                baseUrl = sluglessUrl.substring(0, parameterStart);
                parameters = sluglessUrl.substring(parameterStart + 3);
                parameters = parameters.split("/");
                for (i = 0; i < parameters.length; i++) {
                    if (parameters[i] === "") {
                        parameters.splice(i, 1);
                        i++;
                    }
                }
                if (parameters.length % 2 === 1) {
                    parameters.splice(parameters.length - 1, 1);
                }
                parameters = parameters.join("/");
                sluglessUrl = baseUrl + "/_/" + parameters;
            }
            $.ajax({
                url: "http://api.echoenabled.com/v2/mux?appkey=dev.espn.go.com&requests=[{%22id%22:%22count1%22,%20%22method%22:%22count%22,%20%22q%22:%22childrenof:" + escape(sluglessUrl) + "%20source:espn.go.com,ESPN type:comment state:Untouched,ModeratorApproved -user.state:ModeratorBanned,ModeratorDeleted children source:espn.go.com,ESPN type:comment state:Untouched,ModeratorApproved -user.state:ModeratorBanned,ModeratorDeleted%22},]",
                dataType: "jsonp",
                success: function(data) {
                    commentCountNum = data.count1.count;
                    if (data.count1.errorCode === "more_than") {
                        commentCountNum = data.count1.errorMessage;
                    }
                    if ($commentCountsLong.length > 0) {
                        $commentCountsLong.each(function(i, v) {
                            $(this).html(commentCountNum);
                        });
                    } else {
                        commentCountNum = fixCounts(commentCountNum);
                        $commentCounts.each(function(i, v) {
                            $(this).html(commentCountNum);
                        });
                    }
                }
            });
        }
        $recommendLinks.bind("click", function(e) {
            e.preventDefault();
            var href = $(this).attr("href");
            if (espn.core.isMobile) {
                href = href.replace("www.facebook.com", "m.facebook.com");
                href = href + "&display=touch";
                window.location.href = href;
            } else {
                href = href + "&display=popup";
                window.open(href, "_blank", "width=550,height=420,scrollbars=no,resizable=yes");
            }
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Facebook", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Facebook", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Facebook", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "facebook", "recommend");
                        }
                    }
                }
            }
        });
        $tweetLinks.bind("click", function(e) {
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Twitter", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Twitter", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Twitter", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "twitter", "tweet");
                        }
                    }
                }
            }
            if (typeof (twttr) === "undefined") {
                var href = $(this).attr("href");
                window.open(href, "_blank", "width=550,height=420,scrollbars=no,resizable=yes");
                return false;
            }
        });
        $followLinks.bind("click", function(e) {
            e.preventDefault();
            var href = $(this).attr("href");
            window.open(href, "_blank", "width=550,height=420,scrollbars=no,resizable=yes");
        });
        $commentLinks.bind("click", function(e) {
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Comments", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Comments", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Comments", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "comments", "comment");
                        }
                    }
                }
            }
            if (e.metaKey || e.ctrlKey) {
                return;
            } else {
                e.preventDefault();
                var href = $(this).attr("href");
                setTimeout(function() {
                    window.location = href;
                }, 500);
            }
        });
        $emailLinks.bind("click", function(e) {
            e.preventDefault();
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Email", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Email", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Email", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "email", "email");
                        }
                    }
                }
            }
            var href = $(this).attr("href");
            window.open(href, "_blank", "noresizable,noscrollbars,width=400,height=500");
        });
        $printLinks.bind("click", function(e) {
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Print", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Print", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Print", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "print", "print");
                        }
                    }
                }
            }
        });
        $insiderLinks.bind("click", function(e) {
            if (typeof (anTrackLink) !== "undefined") {
                if ($(this).parents(".vert").length > 0) {
                    anTrackLink(this, "espn", "Insider", "vertical-share");
                } else {
                    if ($(this).parents("#page-actions-top, .page-actions-top").length > 0) {
                        anTrackLink(this, "espn", "Insider", "horizontal-share");
                    } else {
                        if ($(this).parents("#page-actions-bottom, .page-actions-bottom").length > 0) {
                            anTrackLink(this, "espn", "Insider", "bottom-share");
                        } else {
                            anTrackLink(this, "espn", "insider", "insider");
                        }
                    }
                }
            }
        });
        function setPageActionStyles(defaultPosition, originalTop, hidePosition) {
            var isFixed = ($verticalShare.css("position") === "fixed");
            articleHeight = $(".article").outerHeight();
            socialHeight = $("#page-actions-top .mod-page-actions.vert").outerHeight();
            var vertAbsPosition = (articleHeight - (socialHeight / 2) - 12) + "px";
            if ($("#comments").length > 0) {
                hidePosition = $("#comments").height() + $("#comments").offset().top - ($window.height() * 0.5);
            }
            if (window.innerWidth >= 1044) {
                if ($window.scrollTop() > hidePosition) {
                    isFixed = false;
                    $verticalShare.css({
                        position: "absolute",
                        top: vertAbsPosition
                    });
                } else {
                    if ($window.scrollTop() > defaultPosition && !(isFixed)) {
                        $verticalShare.css({
                            position: "fixed",
                            top: 0
                        });
                        if ($("body.sharing-mix")) {
                            displayVertMenu();
                        }
                        isFixed = true;
                    } else {
                        if ($window.scrollTop() <= defaultPosition && isFixed) {
                            $verticalShare.css({
                                position: "relative",
                                top: originalTop,
                                display: "none"
                            });
                            if ($("body.sharing-mix")) {
                                displayHzMenu();
                            }
                            isFixed = false;
                        }
                    }
                }
            } else {
                $verticalShare.css({
                    position: "relative",
                    top: 0,
                    display: "none"
                });
                if ($("body.sharing-mix")) {
                    displayHzMenu();
                }
                isFixed = false;
            }
        }
        function displayHzMenu() {
            $("body").addClass("sharing-hz");
            $(".mod-page-actions.hz").show();
        }
        function displayVertMenu() {
            $(".mod-page-actions.vert").hide();
            $("body").addClass("sharing-vert");
            $("#page-actions-top .mod-page-actions.vert").show();
        }
        $("document").ready(function() {
            var $window = $(window)
              , $pageActionsTop = $("#page-actions-top .mod-page-actions").first()
              , $authorBio = $(".mod-author-bio")
              , authorPosition = 0
              , hasSeenAuthorBio = false
              , hidePosition = $(document).height();
            if ($pageActionsTop.length > 0) {
                var defaultPosition = $pageActionsTop.offset().top + 20
                  , originalTop = $pageActionsTop.css("top");
            }
            if ($pageActionsBottom.length > 0) {
                hidePosition = $pageActionsBottom.offset().top - ($window.height() * 0.5);
            }
            if ($authorBio.length > 0) {
                authorPosition = $authorBio.offset().top - ($window.height() * 0.5);
            }
            if ($("#comments").length > 0) {
                hidePosition = $("#comments").height() + $("#comments").offset().top - ($window.height() * 0.5);
            }
            $window.scroll(function() {
                if ($pageActionsTop.length > 0) {
                    setPageActionStyles(defaultPosition, originalTop, hidePosition);
                }
            });
            $window.resize(function() {
                if ($pageActionsTop.length > 0) {
                    setPageActionStyles(defaultPosition, originalTop, hidePosition);
                }
            });
        });
        return $(this);
    }
    ;
    "espn.core.init".namespace();
    espn.core.init.tools = function(id, url) {
        jQuery(".mod-page-actions-" + id).sharetools(url);
    }
    ;
}
)(jQuery);
/*!
jQuery Waypoints - v1.0.2
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($, wp, wps, window, undefined) {
    var $w = $(window)
      , waypoints = []
      , oldScroll = -99999
      , didScroll = false
      , didResize = false
      , eventName = "waypoint.reached"
      , methods = {
        init: function(f, options) {
            this.each(function() {
                var $this = $(this)
                  , ndx = waypointIndex($this)
                  , base = ndx < 0 ? $.fn[wp].defaults : waypoints[ndx].options
                  , opts = $.extend({}, base, options);
                opts.offset = opts.offset === "bottom-in-view" ? function() {
                    return $[wps]("viewportHeight") - $(this).outerHeight();
                }
                : opts.offset;
                if (ndx < 0) {
                    waypoints.push({
                        element: $this,
                        offset: $this.offset().top,
                        options: opts
                    });
                } else {
                    waypoints[ndx].options = opts;
                }
                f && $this.bind(eventName, f);
            });
            $[wps]("refresh");
            return this;
        },
        remove: function() {
            return this.each(function() {
                var ndx = waypointIndex($(this));
                if (ndx >= 0) {
                    waypoints.splice(ndx, 1);
                }
            });
        },
        destroy: function() {
            return this.unbind(eventName)[wp]("remove");
        }
    };
    function waypointIndex(el) {
        var i = waypoints.length - 1;
        while (i >= 0 && waypoints[i].element[0] !== el[0]) {
            i -= 1;
        }
        return i;
    }
    function triggerWaypoint(way, dir) {
        way.element.trigger(eventName, dir);
        if (way.options.triggerOnce) {
            way.element[wp]("destroy");
        }
    }
    function doScroll() {
        var newScroll = $w.scrollTop()
          , isDown = newScroll > oldScroll
          , pointsHit = $.grep(waypoints, function(el, i) {
            return isDown ? (el.offset > oldScroll && el.offset <= newScroll) : (el.offset <= oldScroll && el.offset > newScroll);
        });
        if (!oldScroll || !newScroll) {
            $[wps]("refresh");
        }
        oldScroll = newScroll;
        if (!pointsHit.length) {
            return;
        }
        if ($[wps].settings.continuous) {
            $.each(isDown ? pointsHit : pointsHit.reverse(), function(i, point) {
                triggerWaypoint(point, [isDown ? "down" : "up"]);
            });
        } else {
            triggerWaypoint(pointsHit[isDown ? pointsHit.length - 1 : 0], [isDown ? "down" : "up"]);
        }
    }
    $.fn[wp] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === "function" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                if (typeof method === "object") {
                    return methods.init.apply(this, [null, method]);
                } else {
                    $.error("Method " + method + " does not exist on jQuery" + wp);
                }
            }
        }
    }
    ;
    $.fn[wp].defaults = {
        offset: 0,
        triggerOnce: false
    };
    var jQMethods = {
        refresh: function() {
            $.each(waypoints, function(i, o) {
                if (typeof (o) !== "undefined") {
                    var adjustment = 0
                      , oldOffset = o.offset;
                    if (typeof o.options.offset === "function") {
                        adjustment = o.options.offset.apply(o.element);
                    } else {
                        if (typeof o.options.offset === "string") {
                            var amount = parseFloat(o.options.offset)
                              , adjustment = o.options.offset.indexOf("%") ? Math.ceil($[wps]("viewportHeight") * (amount / 100)) : amount;
                        } else {
                            adjustment = o.options.offset;
                        }
                    }
                    o.offset = o.element.offset().top - adjustment;
                    if (oldScroll > oldOffset && oldScroll <= o.offset) {
                        triggerWaypoint(o, ["up"]);
                    } else {
                        if (oldScroll < oldOffset && oldScroll >= o.offset) {
                            triggerWaypoint(o, ["down"]);
                        }
                    }
                }
            });
            waypoints.sort(function(a, b) {
                return a.offset - b.offset;
            });
        },
        viewportHeight: function() {
            return (window.innerHeight ? window.innerHeight : $w.height());
        },
        aggregate: function() {
            var points = $();
            $.each(waypoints, function(i, e) {
                points = points.add(e.element);
            });
            return points;
        }
    };
    $[wps] = function(method) {
        if (jQMethods[method]) {
            return jQMethods[method].apply(this);
        } else {
            return jQMethods.aggregate();
        }
    }
    ;
    $[wps].settings = {
        continuous: true,
        resizeThrottle: 200,
        scrollThrottle: 100
    };
    $w.scroll(function() {
        if (!didScroll) {
            didScroll = true;
            window.setTimeout(function() {
                doScroll();
                didScroll = false;
            }, $[wps].settings.scrollThrottle);
        }
    }).resize(function() {
        if (!didResize) {
            didResize = true;
            window.setTimeout(function() {
                $[wps]("refresh");
                didResize = false;
            }, $[wps].settings.resizeThrottle);
        }
    }).load(function() {
        $[wps]("refresh");
        doScroll();
    });
}
)(jQuery, "waypoint", "waypoints", this);
(function($) {
    var h = $.scrollTo = function(a, b, c) {
        $(window).scrollTo(a, b, c);
    }
    ;
    h.defaults = {
        axis: "xy",
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    h.window = function(a) {
        return $(window)._scrollable();
    }
    ;
    $.fn._scrollable = function() {
        return this.map(function() {
            var a = this
              , isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!isWin) {
                return a;
            }
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == "BackCompat" ? b.body : b.documentElement;
        });
    }
    ;
    $.fn.scrollTo = function(e, f, g) {
        if (typeof f == "object") {
            g = f;
            f = 0;
        }
        if (typeof g == "function") {
            g = {
                onAfter: g
            };
        }
        if (e == "max") {
            e = 9000000000;
        }
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue) {
            f /= 2;
        }
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function() {
            if (e == null) {
                return;
            }
            var d = this, $elem = $(d), targ = e, toff, attr = {}, win = $elem.is("html,body");
            switch (typeof targ) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                    targ = both(targ);
                    break;
                }
                targ = $(targ, this);
                if (!targ.length) {
                    return;
                }
            case "object":
                if (targ.is || targ.style) {
                    toff = (targ = $(targ)).offset();
                }
            }
            $.each(g.axis.split(""), function(i, a) {
                var b = a == "x" ? "Left" : "Top"
                  , pos = b.toLowerCase()
                  , key = "scroll" + b
                  , old = d[key]
                  , max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css("margin" + b)) || 0;
                        attr[key] -= parseInt(targ.css("border" + b + "Width")) || 0;
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos]) {
                        attr[key] += targ[a == "x" ? "width" : "height"]() * g.over[pos];
                    }
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == "%" ? parseFloat(c) / 100 * max : c;
                }
                if (g.limit && /^\d+$/.test(attr[key])) {
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                }
                if (!i && g.queue) {
                    if (old != attr[key]) {
                        animate(g.onAfterFirst);
                    }
                    delete attr[key];
                }
            });
            animate(g.onAfter);
            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function() {
                    a.call(this, e, g);
                }
                );
            }
        }).end();
    }
    ;
    h.max = function(a, b) {
        var c = b == "x" ? "Width" : "Height"
          , scroll = "scroll" + c;
        if (!$(a).is("html,body")) {
            return a[scroll] - $(a)[c.toLowerCase()]();
        }
        var d = "client" + c
          , html = a.ownerDocument.documentElement
          , body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
    }
    ;
    function both(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        };
    }
}
)(jQuery);
/*! skrollr v0.5.14 https://github.com/Prinzhorn/skrollr | free to use under terms of MIT license */
(function(e, t, n) {
    function j(n) {
        s = t.documentElement,
        o = t.body,
        H(),
        tt = this,
        n = n || {},
        ut = n.constants || {};
        if (n.easing) {
            for (var i in n.easing) {
                B[i] = n.easing[i];
            }
        }
        rt = {
            beforerender: n.beforerender,
            render: n.render
        },
        it = n.forceHeight !== !1,
        ht = n.smoothScrolling !== !1,
        pt = {
            targetTop: tt.getScrollTop()
        },
        it && (ot = n.scale || 1),
        Q(s, [l], [c]);
        if (it) {
            var u = t.getElementById("skrollr-body") || t.createElement("div")
              , a = u.style;
            a.minWidth = "1px",
            a.position = "absolute",
            a.top = a.zIndex = "0",
            u.id || (a.width = "1px",
            a.right = "0",
            o.appendChild(u)),
            function(e) {
                $ = function() {
                    e.apply(this, arguments),
                    a.height = st + s.clientHeight + "px";
                }
                ;
            }($);
        }
        return tt.refresh(),
        r.addEvent(e, "resize", $),
        function f() {
            S(f),
            q();
        }(),
        tt;
    }
    var r = e.skrollr = {
        get: function() {
            return tt;
        },
        init: function(e) {
            return tt || new j(e);
        },
        VERSION: "0.5.14"
    }, i = Object.prototype.hasOwnProperty, s, o, u = "rendered", a = "un" + u, f = "skrollable", l = "skrollr", c = "no-" + l, h = "linear", p = 1000, d = 200, v = "start", m = "end", g = "top", y = "center", b = "bottom", w = "___has_rendered_class", E = "___skrollable_id", S = e.requestAnimationFrame;
    (function() {
        var t = ["ms", "moz", "webkit", "o"], n;
        for (n = 0; n < t.length && !S; n++) {
            S = e[t[n] + "RequestAnimationFrame"];
        }
        var r = 0;
        S || (S = function(t) {
            var n = Z()
              , i = Math.max(0, 30 - (n - r));
            e.setTimeout(function() {
                t(n + i);
            }, i),
            r = n + i;
        }
        );
    }
    )();
    var x = /^\s*(.+)\s*$/m, T = /^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, N = /\s*([a-z\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, C = /^([a-z\-]+)\[(\w+)\]$/, k = /-([a-z])/g, L = function(e, t) {
        return t.toUpperCase();
    }, A = /[\-+]?[\d]*\.?[\d]+/g, O = /\{\?\}/g, M = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, _ = /[a-z\-]+-gradient/g, D, P, H = function() {
        var t = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (e.getComputedStyle) {
            var n = e.getComputedStyle(o, null);
            for (var r in n) {
                D = r.match(t) || +r == r && n[r].match(t);
                if (D) {
                    break;
                }
            }
            D && (D = D[0],
            D.slice(0, 1) === "-" ? (P = D,
            D = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            }[D]) : P = "-" + D.toLowerCase() + "-");
        }
    }, B = {
        begin: function() {
            return 0;
        },
        end: function() {
            return 1;
        },
        linear: function(e) {
            return e;
        },
        quadratic: function(e) {
            return e * e;
        },
        cubic: function(e) {
            return e * e * e;
        },
        swing: function(e) {
            return -Math.cos(e * Math.PI) / 2 + 0.5;
        },
        sqrt: function(e) {
            return Math.sqrt(e);
        },
        bounce: function(e) {
            var t;
            if (e <= 0.5083) {
                t = 3;
            } else {
                if (e <= 0.8489) {
                    t = 9;
                } else {
                    if (e <= 0.96208) {
                        t = 27;
                    } else {
                        if (!(e <= 0.99981)) {
                            return 1;
                        }
                        t = 91;
                    }
                }
            }
            return 1 - Math.abs(3 * Math.cos(e * t * 1.028) / t);
        }
    };
    j.prototype.refresh = function(e) {
        var r, i = !1;
        e === n ? (i = !0,
        nt = [],
        vt = 0,
        e = t.getElementsByTagName("*")) : e = [].concat(e);
        for (r = 0; r < e.length; r++) {
            var s = e[r]
              , o = s
              , l = []
              , c = ht;
            if (!s.attributes) {
                continue;
            }
            for (var h = 0; h < s.attributes.length; h++) {
                var p = s.attributes[h];
                if (p.name === "data-anchor-target") {
                    o = t.querySelector(p.value);
                    if (o === null) {
                        throw 'Unable to find anchor target "' + p.value + '"';
                    }
                    continue;
                }
                if (p.name === "data-smooth-scrolling") {
                    c = p.value !== "off";
                    continue;
                }
                var d = p.name.match(T);
                if (d !== null) {
                    var g = d[1];
                    g = g && ut[g.substr(1)] || 0;
                    var y = (d[2] | 0) + g
                      , b = d[3]
                      , S = d[4] || b
                      , x = {
                        offset: y,
                        props: p.value,
                        element: s
                    };
                    l.push(x),
                    !b || b === v || b === m ? (x.mode = "absolute",
                    b === m ? x.isEnd = !0 : (x.frame = y * ot,
                    delete x.offset)) : (x.mode = "relative",
                    x.anchors = [b, S]);
                }
            }
            if (l.length) {
                var N, C, k;
                !i && E in s ? (k = s[E],
                N = nt[k].styleAttr,
                C = nt[k].classAttr) : (k = s[E] = vt++,
                N = s.style.cssText,
                C = K(s));
                var L = nt[k] = {
                    element: s,
                    styleAttr: N,
                    classAttr: C,
                    anchorTarget: o,
                    keyFrames: l,
                    smoothScrolling: c
                };
                Q(s, [f, u], [a]),
                L[w] = !0;
            }
        }
        $();
        for (r = 0; r < e.length; r++) {
            var A = nt[e[r][E]];
            if (A === n) {
                continue;
            }
            A.keyFrames.sort(et),
            R(A),
            z(A);
        }
        return tt;
    }
    ,
    j.prototype.relativeToAbsolute = function(e, t, n) {
        var r = s.clientHeight
          , i = e.getBoundingClientRect()
          , o = i.top
          , u = i.bottom - i.top;
        return t === b ? o -= r : t === y && (o -= r / 2),
        n === b ? o += u : n === y && (o += u / 2),
        o += tt.getScrollTop(),
        o + 0.5 | 0;
    }
    ,
    j.prototype.animateTo = function(e, t) {
        t = t || {};
        var r = Z()
          , i = tt.getScrollTop();
        return ct = {
            startTop: i,
            topDiff: e - i,
            targetTop: e,
            duration: t.duration || p,
            startTime: r,
            endTime: r + (t.duration || p),
            easing: B[t.easing || h],
            done: t.done
        },
        ct.topDiff || (ct.done && ct.done.call(tt, !1),
        ct = n),
        tt;
    }
    ,
    j.prototype.stopAnimateTo = function() {
        ct && ct.done && ct.done.call(tt, !0),
        ct = n;
    }
    ,
    j.prototype.isAnimatingTo = function() {
        return !!ct;
    }
    ,
    j.prototype.setScrollTop = function(t, n) {
        return n === !0 && (ft = t,
        dt = !0),
        r.iscroll ? r.iscroll.scrollTo(0, -t) : e.scrollTo(0, t),
        tt;
    }
    ,
    j.prototype.getScrollTop = function() {
        return r.iscroll ? -r.iscroll.y : e.pageYOffset || s.scrollTop || o.scrollTop || 0;
    }
    ,
    j.prototype.on = function(e, t) {
        return rt[e] = t,
        tt;
    }
    ,
    j.prototype.off = function(e) {
        return delete rt[e],
        tt;
    }
    ;
    var F = function() {
        var e, t, n, r, i, s, o, u, a;
        for (s = 0; s < nt.length; s++) {
            e = nt[s],
            t = e.element,
            n = e.anchorTarget,
            r = e.keyFrames;
            for (o = 0; o < r.length; o++) {
                i = r[o],
                i.mode === "relative" && (u = t.style.cssText,
                a = K(t),
                t.style.cssText = e.styleAttr,
                Q(t, e.classAttr),
                i.frame = tt.relativeToAbsolute(n, i.anchors[0], i.anchors[1]) - i.offset,
                t.style.cssText = u,
                Q(t, a)),
                it && !i.isEnd && i.frame > st && (st = i.frame);
            }
        }
        st = Math.max(st, J());
        for (s = 0; s < nt.length; s++) {
            e = nt[s],
            r = e.keyFrames;
            for (o = 0; o < r.length; o++) {
                i = r[o],
                i.isEnd && (i.frame = st - i.offset);
            }
        }
    }
      , I = function(e, t) {
        for (var n = 0; n < nt.length; n++) {
            var s = nt[n], o = s.smoothScrolling ? e : t, f = s.keyFrames, l = f[0].frame, c = f[f.length - 1].frame, h = o <= l, p = o >= c, d, v;
            if (h || p) {
                var m = f[h ? 0 : f.length - 1].props;
                for (d in m) {
                    i.call(m, d) && (v = V(m[d].value),
                    r.setStyle(s.element, d, v));
                }
                s[w] && (o < l || o > c) && (Q(s.element, [a], [u]),
                s[w] = !1);
                continue;
            }
            s[w] || (Q(s.element, [u], [a]),
            s[w] = !0);
            for (var g = 0; g < f.length - 1; g++) {
                if (o >= f[g].frame && o <= f[g + 1].frame) {
                    var y = f[g]
                      , b = f[g + 1];
                    for (d in y.props) {
                        if (i.call(y.props, d)) {
                            var E = (o - y.frame) / (b.frame - y.frame);
                            E = y.props[d].easing(E),
                            v = X(y.props[d].value, b.props[d].value, E),
                            v = V(v),
                            r.setStyle(s.element, d, v);
                        }
                    }
                    break;
                }
            }
        }
    }
      , q = function() {
        var e = tt.getScrollTop(), t, r = Z(), i;
        if (ct) {
            r >= ct.endTime ? (e = ct.targetTop,
            t = ct.done,
            ct = n) : (i = ct.easing((r - ct.startTime) / ct.duration),
            e = ct.startTop + i * ct.topDiff | 0),
            tt.setScrollTop(e);
        } else {
            var s = pt.targetTop - e;
            s && (pt = {
                startTop: ft,
                topDiff: e - ft,
                targetTop: e,
                startTime: lt,
                endTime: lt + d
            }),
            r <= pt.endTime && (i = B.sqrt((r - pt.startTime) / d),
            e = pt.startTop + i * pt.topDiff | 0);
        }
        e < 0 && (e = 0);
        if (dt || ft !== e) {
            at = e >= ft ? "down" : "up",
            dt = !1;
            var o = {
                curTop: e,
                lastTop: ft,
                maxTop: st,
                direction: at
            }
              , u = rt.beforerender && rt.beforerender.call(tt, o);
            u !== !1 && (I(e, tt.getScrollTop()),
            ft = e,
            rt.render && rt.render.call(tt, o)),
            t && t.call(tt, !1);
        }
        lt = r;
    }
      , R = function(e) {
        for (var t = 0; t < e.keyFrames.length; t++) {
            var n = e.keyFrames[t], r, i, s, o = {}, u;
            while ((u = N.exec(n.props)) !== null) {
                s = u[1],
                i = u[2],
                r = s.match(C),
                r !== null ? (s = r[1],
                r = r[2]) : r = h,
                i = i.indexOf("!") ? U(i) : [i.slice(1)],
                o[s] = {
                    value: i,
                    easing: B[r]
                };
            }
            n.props = o;
        }
    }
      , U = function(e) {
        var t = [];
        return M.lastIndex = 0,
        e = e.replace(M, function(e) {
            return e.replace(A, function(e) {
                return e / 255 * 100 + "%";
            });
        }),
        P && (_.lastIndex = 0,
        e = e.replace(_, function(e) {
            return P + e;
        })),
        e = e.replace(A, function(e) {
            return t.push(+e),
            "{?}";
        }),
        t.unshift(e),
        t;
    }
      , z = function(e) {
        var t = {}, n;
        for (n = 0; n < e.keyFrames.length; n++) {
            W(e.keyFrames[n], t);
        }
        t = {};
        for (n = e.keyFrames.length - 1; n >= 0; n--) {
            W(e.keyFrames[n], t);
        }
    }
      , W = function(e, t) {
        var n;
        for (n in t) {
            i.call(e.props, n) || (e.props[n] = t[n]);
        }
        for (n in e.props) {
            t[n] = e.props[n];
        }
    }
      , X = function(e, t, n) {
        if (e.length !== t.length) {
            throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
        }
        var r = [e[0]];
        for (var i = 1; i < e.length; i++) {
            r[i] = e[i] + (t[i] - e[i]) * n;
        }
        return r;
    }
      , V = function(e) {
        var t = 1;
        return O.lastIndex = 0,
        e[0].replace(O, function() {
            return e[t++];
        });
    };
    r.setStyle = function(e, t, n) {
        var r = e.style;
        t = t.replace(k, L).replace("-", "");
        if (t === "zIndex") {
            r[t] = "" + (n | 0);
        } else {
            if (t === "float") {
                r.styleFloat = r.cssFloat = n;
            } else {
                try {
                    D && (r[D + t.slice(0, 1).toUpperCase() + t.slice(1)] = n),
                    r[t] = n;
                } catch (i) {}
            }
        }
    }
    ,
    r.addEvent = function(t, n, r) {
        var i = function(t) {
            return t = t || e.event,
            t.target || (t.target = t.srcElement),
            t.preventDefault || (t.preventDefault = function() {
                t.returnValue = !1;
            }
            ),
            r.call(this, t);
        };
        e.addEventListener ? t.addEventListener(n, i, !1) : t.attachEvent("on" + n, i);
    }
    ;
    var $ = function() {
        st = 0,
        F(),
        dt = !0,
        r.iscroll && e.setTimeout(function() {
            r.iscroll.refresh();
        }, 0);
    }, J = function() {
        var e = Math.max(o.scrollHeight, o.offsetHeight, s.scrollHeight, s.offsetHeight, s.clientHeight);
        return e - s.clientHeight;
    }, K = function(t) {
        var n = "className";
        return e.SVGElement && t instanceof e.SVGElement && (t = t[n],
        n = "baseVal"),
        t[n];
    }, Q = function(t, r, i) {
        var s = "className";
        e.SVGElement && t instanceof e.SVGElement && (t = t[s],
        s = "baseVal");
        if (i === n) {
            t[s] = r;
            return;
        }
        var o = t[s];
        for (var u = 0; u < r.length; u++) {
            Y(o).indexOf(Y(r[u])) === -1 && (o += " " + r[u]);
        }
        for (var a = 0; a < i.length; a++) {
            o = Y(o).replace(Y(i[a]), " ");
        }
        t[s] = G(o);
    }, G = function(e) {
        return e.replace(x, "$1");
    }, Y = function(e) {
        return " " + e + " ";
    }, Z = Date.now || function() {
        return +(new Date);
    }
    , et = function(e, t) {
        return e.frame - t.frame;
    }, tt, nt, rt, it, st = 0, ot = 1, ut, at = "down", ft = -1, lt = Z(), ct, ht, pt, dt, vt = 0;
}
)(window, document);
