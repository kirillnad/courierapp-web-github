/* eslint-disable */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t(require("react"), require("react-dom"), require("prop-types")))
        : "function" == typeof define && define.amd
        ? define(["react", "react-dom", "prop-types"], t)
        : ((e = e || self).mobiscroll = t(e.React, e.ReactDOM, e.PropTypes));
})(this, function (v, i, e) {
    "use strict";
    function r(e, t, s) {
        return t in e ? Object.defineProperty(e, t, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = s), e;
    }
    function g() {
        return (g =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n]);
                }
                return e;
            }).apply(this, arguments);
    }
    function l(e, t) {
        (e.prototype = Object.create(t.prototype)), ((e.prototype.constructor = e).__proto__ = t);
    }
    function y(e, t) {
        if (null == e) return {};
        var s,
            n,
            a = {},
            i = Object.keys(e);
        for (n = 0; n < i.length; n++) (s = i[n]), 0 <= t.indexOf(s) || (a[s] = e[s]);
        return a;
    }
    function b(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    (v = v && v.hasOwnProperty("default") ? v.default : v), (i = i && i.hasOwnProperty("default") ? i.default : i), (e = e && e.hasOwnProperty("default") ? e.default : e);
    var t,
        s,
        n,
        a,
        se = se || {},
        o = {},
        ie = {},
        c = [],
        u = "undefined" != typeof window,
        d = u && window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches,
        p = u ? navigator.userAgent : "",
        h = u ? navigator.platform : "",
        m = u ? navigator.maxTouchPoints : 0,
        f = /Safari/.test(p),
        _ = p.match(/Android|iPhone|iPad|iPod|Windows Phone|Windows|MSIE/i),
        pe =
            (u && window.requestAnimationFrame) ||
            function (e) {
                return setTimeout(e, 20);
            },
        he =
            (u && window.cancelAnimationFrame) ||
            function (e) {
                clearTimeout(e);
            };
    function w(e) {
        var t;
        for (t in e) if (void 0 !== k[e[t]]) return !0;
        return !1;
    }
    function me(e, t) {
        if ("touchstart" == e.type) t.__mbscTouched = 1;
        else if (t.__mbscTouched) return delete t.__mbscTouched, !1;
        return !0;
    }
    function fe(e, t) {
        for (var s, n, a = ["t", "webkitT", "MozT", "OT", "msT"], i = getComputedStyle(e[0]), r = 0; !s && r < a.length; ) void 0 !== i[(n = a[r]) + "ransform"] && (s = i[n + "ransform"]), r++;
        return (s = s.split(")")[0].split(", ")), t ? s[13] || s[5] : s[12] || s[4];
    }
    function at(e) {
        if (e) {
            if (E[e]) return E[e];
            var t = M && M.getContext("2d");
            if (!t) return "#fff";
            (t.fillStyle = e), t.fillRect(0, 0, 1, 1);
            var s = t.getImageData(0, 0, 1, 1).data,
                n = 0.299 * s[0] + 0.587 * s[1] + 0.114 * s[2] < 130 ? "#fff" : "#000";
            return (E[e] = n);
        }
    }
    function it(e, t, s, n) {
        e && e.addEventListener(t, s, n);
    }
    function be(e, t, s, n) {
        e && e.removeEventListener(t, s, n);
    }
    function x(e, t) {
        return !(!t || !e || 1 !== e.nodeType) && (e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector).call(e, t);
    }
    function C(e, t, s) {
        for (; t; ) {
            if (x(t, s)) return t;
            t = t !== e ? t.parentNode : null;
        }
        return null;
    }
    function T(e, t, s) {
        var n;
        try {
            n = new CustomEvent(t, { detail: s, bubbles: !0, cancelable: !0 });
        } catch (e) {
            (n = document.createEvent("Event")).initEvent(t, !0, !0), (n.detail = s);
        }
        e.dispatchEvent(n);
    }
    /Android/i.test(_)
        ? ((t = "android"), (s = p.match(/Android\s+([\d.]+)/i)) && (c = s[0].replace("Android ", "").split(".")))
        : /iPhone|iPad|iPod/i.test(_) || /iPhone|iPad|iPod/i.test(h) || ("MacIntel" === h && 1 < m)
        ? ((t = "ios"), (s = p.match(/OS\s+([\d_]+)/i)) && (c = s[0].replace(/_/g, ".").replace("OS ", "").split(".")))
        : /Windows Phone/i.test(_)
        ? (t = "wp")
        : /Windows|MSIE/i.test(_) && (t = "windows"),
        (n = c[0]),
        (a = c[1]);
    var ne,
        M,
        k,
        ve,
        D,
        S,
        O,
        N,
        ge,
        V,
        E = {};
    u &&
        ((V = window),
        (M = document.createElement("canvas")),
        (k = document.createElement("modernizr").style),
        (ve = (function () {
            var e,
                t = ["Webkit", "Moz", "O", "ms"];
            for (e in t) if (w([t[e] + "Transform"])) return "-" + t[e].toLowerCase() + "-";
            return "";
        })()),
        (ge = ve.replace(/^-/, "").replace(/-$/, "").replace("moz", "Moz")),
        (ne = void 0 !== k.animation ? "animationend" : "webkitAnimationEnd"),
        (S = void 0 !== k.transition),
        (N = (O = "ios" === t && !f) && V.webkit && V.webkit.messageHandlers),
        (D = void 0 === k.touchAction || (O && !N)));
    var P = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
        I = { readonly: "readOnly" },
        L = [],
        A = Array.prototype.slice;
    function $(e) {
        return "function" == typeof e;
    }
    function F(e) {
        return "object" == typeof e;
    }
    function H(e) {
        return "number" == typeof e.length;
    }
    function Y(e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : "";
        });
    }
    function U(e) {
        return e
            .replace(/::/g, "/")
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
            .replace(/([a-z\d])([A-Z])/g, "$1_$2")
            .replace(/_/g, "-")
            .toLowerCase();
    }
    function R(e, t) {
        return "number" != typeof t || P[U(e)] ? t : t + "px";
    }
    var W,
        z =
            ((W = function e(t, s) {
                var n,
                    a,
                    i,
                    r = [],
                    o = 0;
                if (t && !s && t instanceof q) return t;
                if ($(t)) return e(document).ready(t);
                if (t)
                    if ("string" == typeof t)
                        if (((t = i = t.trim()), 0 <= i.indexOf("<") && 0 <= i.indexOf(">"))) {
                            var l = "div";
                            for (
                                0 === i.indexOf("<li") && (l = "ul"),
                                    0 === i.indexOf("<tr") && (l = "tbody"),
                                    (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (l = "tr"),
                                    0 === i.indexOf("<tbody") && (l = "table"),
                                    0 === i.indexOf("<option") && (l = "select"),
                                    (a = document.createElement(l)).innerHTML = i,
                                    o = 0;
                                o < a.childNodes.length;
                                o++
                            )
                                r.push(a.childNodes[o]);
                        } else
                            for (n = s || "#" !== t[0] || t.match(/[ .<>:~]/) ? (s instanceof q && (s = s[0]), (s || document).querySelectorAll(t)) : [document.getElementById(t.split("#")[1])], o = 0; o < n.length; o++)
                                n[o] && r.push(n[o]);
                    else if (t.nodeType || t === window || t === document) r.push(t);
                    else if (0 < t.length && t[0].nodeType) for (o = 0; o < t.length; o++) r.push(t[o]);
                    else e.isArray(t) && (r = t);
                return new q(r);
            }),
            (q.prototype = {
                ready: function (e) {
                    return (
                        (document.attachEvent ? "complete" == document.readyState : "loading" != document.readyState)
                            ? e(W)
                            : document.addEventListener(
                                  "DOMContentLoaded",
                                  function () {
                                      e(W);
                                  },
                                  !1
                              ),
                        this
                    );
                },
                concat: L.concat,
                empty: function () {
                    return this.each(function () {
                        this.innerHTML = "";
                    });
                },
                map: function (s) {
                    return W(
                        W.map(this, function (e, t) {
                            return s.call(e, t, e);
                        })
                    );
                },
                slice: function () {
                    return W(A.apply(this, arguments));
                },
                addClass: function (e) {
                    if (void 0 === e) return this;
                    for (var t = e.split(" "), s = 0; s < t.length; s++) for (var n = 0; n < this.length; n++) void 0 !== this[n].classList && "" !== t[s] && this[n].classList.add(t[s]);
                    return this;
                },
                removeClass: function (e) {
                    if (void 0 === e) return this;
                    for (var t = e.split(" "), s = 0; s < t.length; s++) for (var n = 0; n < this.length; n++) void 0 !== this[n].classList && "" !== t[s] && this[n].classList.remove(t[s]);
                    return this;
                },
                hasClass: function (e) {
                    return !!this[0] && this[0].classList.contains(e);
                },
                toggleClass: function (e) {
                    for (var t = e.split(" "), s = 0; s < t.length; s++) for (var n = 0; n < this.length; n++) void 0 !== this[n].classList && this[n].classList.toggle(t[s]);
                    return this;
                },
                closest: function (e, t) {
                    var s = this[0],
                        n = !1;
                    for (F(e) && (n = W(e)); s && !(n ? 0 <= n.indexOf(s) : x(s, e)); ) s = s !== t && s.nodeType !== s.DOCUMENT_NODE && s.parentNode;
                    return W(s);
                },
                attr: function (e, t) {
                    var s;
                    if (1 !== arguments.length || "string" != typeof e) {
                        for (var n = 0; n < this.length; n++)
                            if (2 === arguments.length) this[n].setAttribute(e, t);
                            else for (var a in e) (this[n][a] = e[a]), this[n].setAttribute(a, e[a]);
                        return this;
                    }
                    if (this.length) return (s = this[0].getAttribute(e)), s || "" === s ? s : void 0;
                },
                removeAttr: function (e) {
                    for (var t = 0; t < this.length; t++) this[t].removeAttribute(e);
                    return this;
                },
                prop: function (e, t) {
                    if (((e = I[e] || e), 1 === arguments.length && "string" == typeof e)) return this[0] ? this[0][e] : void 0;
                    for (var s = 0; s < this.length; s++) this[s][e] = t;
                    return this;
                },
                val: function (e) {
                    if (void 0 === e)
                        return this.length && this[0].multiple
                            ? W.map(this.find("option:checked"), function (e) {
                                  return e.value;
                              })
                            : this[0]
                            ? this[0].value
                            : void 0;
                    if (this.length && this[0].multiple)
                        W.each(this[0].options, function () {
                            this.selected = -1 != e.indexOf(this.value);
                        });
                    else for (var t = 0; t < this.length; t++) this[t].value = e;
                    return this;
                },
                on: function (e, s, n, t) {
                    var a,
                        i,
                        r,
                        o,
                        l,
                        c = e.split(" ");
                    function u(e) {
                        for (var t = e.target; t; ) W(t).is(s) && n.call(t, e), (t = t !== this ? t.parentNode : null);
                    }
                    function d(e, t, s, n) {
                        var a = t.split(".");
                        e.DomNameSpaces || (e.DomNameSpaces = []), e.DomNameSpaces.push({ namespace: a[1], event: a[0], listener: s, capture: n }), e.addEventListener(a[0], s, n);
                    }
                    for (o = 0; o < this.length; o++)
                        if (((i = this[o]), $(s) || !1 === s)) for ($(s) && ((t = n || !1), (n = s)), l = 0; l < c.length; l++) -1 != (r = c[l]).indexOf(".") ? d(i, r, n, t) : i.addEventListener(r, n, t);
                        else
                            for (a = u.bind(i), l = 0; l < c.length; l++)
                                (r = c[l]), i.DomLiveListeners || (i.DomLiveListeners = []), i.DomLiveListeners.push({ listener: n, liveListener: a }), -1 != r.indexOf(".") ? d(i, r, a, t) : i.addEventListener(r, a, t);
                    return this;
                },
                off: function (e, t, s, n) {
                    var a,
                        i,
                        r,
                        o,
                        l,
                        c,
                        u,
                        d = this;
                    function p(e) {
                        var t,
                            s,
                            n,
                            a,
                            i,
                            r = e.split("."),
                            o = r[0],
                            l = r[1];
                        for (s = 0; s < d.length; ++s)
                            if ((i = (t = d[s]).DomNameSpaces)) {
                                for (n = 0; n < i.length; ++n) (a = i[n]).namespace != l || (a.event != o && o) || (t.removeEventListener(a.event, a.listener, a.capture), (a.removed = !0));
                                for (n = i.length - 1; 0 <= n; --n) i[n].removed && i.splice(n, 1);
                            }
                    }
                    for (r = e.split(" "), o = 0; o < r.length; o++)
                        for (i = r[o], l = 0; l < this.length; l++)
                            if (((u = (a = this[l]).DomLiveListeners), $(t) || !1 === t)) $(t) && ((n = s || !1), (s = t)), 0 === i.indexOf(".") ? p(i.substr(1)) : a.removeEventListener(i, s, n);
                            else {
                                if (u) for (c = 0; c < u.length; c++) u[c].listener === s && a.removeEventListener(i, u[c].liveListener, n);
                                a.DomNameSpaces && a.DomNameSpaces.length && i && p(i);
                            }
                    return this;
                },
                trigger: function (e, t) {
                    for (var s = e.split(" "), n = 0; n < s.length; n++) for (var a = 0; a < this.length; a++) T(this[a], s[n], t);
                    return this;
                },
                width: function (e) {
                    return void 0 !== e ? this.css("width", e) : this[0] === window ? window.innerWidth : this[0] === document ? document.documentElement.scrollWidth : 0 < this.length ? parseFloat(this.css("width")) : null;
                },
                height: function (e) {
                    if (void 0 !== e) return this.css("height", e);
                    if (this[0] === window) return window.innerHeight;
                    if (this[0] !== document) return 0 < this.length ? parseFloat(this.css("height")) : null;
                    var t = document.body,
                        s = document.documentElement;
                    return Math.max(t.scrollHeight, t.offsetHeight, s.clientHeight, s.scrollHeight, s.offsetHeight);
                },
                innerWidth: function () {
                    var t = this;
                    if (0 < this.length) {
                        if (this[0].innerWidth) return this[0].innerWidth;
                        var s = this[0].offsetWidth;
                        return (
                            ["left", "right"].forEach(function (e) {
                                s -= parseInt(t.css(Y("border-" + e + "-width")) || 0, 10);
                            }),
                            s
                        );
                    }
                },
                innerHeight: function () {
                    var t = this;
                    if (0 < this.length) {
                        if (this[0].innerHeight) return this[0].innerHeight;
                        var s = this[0].offsetHeight;
                        return (
                            ["top", "bottom"].forEach(function (e) {
                                s -= parseInt(t.css(Y("border-" + e + "-width")) || 0, 10);
                            }),
                            s
                        );
                    }
                },
                offset: function () {
                    if (0 < this.length) {
                        var e = this[0].getBoundingClientRect(),
                            t = document.documentElement;
                        return { top: e.top + window.pageYOffset - t.clientTop, left: e.left + window.pageXOffset - t.clientLeft };
                    }
                },
                hide: function () {
                    for (var e = 0; e < this.length; e++) this[e].style.display = "none";
                    return this;
                },
                show: function () {
                    for (var e = 0; e < this.length; e++) "none" == this[e].style.display && (this[e].style.display = ""), "none" == getComputedStyle(this[e], "").getPropertyValue("display") && (this[e].style.display = "block");
                    return this;
                },
                clone: function () {
                    return this.map(function () {
                        return this.cloneNode(!0);
                    });
                },
                styles: function () {
                    return this[0] ? window.getComputedStyle(this[0], null) : void 0;
                },
                css: function (e, t) {
                    var s,
                        n,
                        a = this[0],
                        i = "";
                    if (arguments.length < 2) {
                        if (!a) return;
                        if ("string" == typeof e) return a.style[e] || getComputedStyle(a, "").getPropertyValue(e);
                    }
                    if ("string" == typeof e)
                        t || 0 === t
                            ? (i = U(e) + ":" + R(e, t))
                            : this.each(function () {
                                  this.style.removeProperty(U(e));
                              });
                    else
                        for (n in e)
                            if (e[n] || 0 === e[n]) i += U(n) + ":" + R(n, e[n]) + ";";
                            else for (s = 0; s < this.length; s++) this[s].style.removeProperty(U(n));
                    return this.each(function () {
                        this.style.cssText += ";" + i;
                    });
                },
                each: function (e) {
                    for (var t = 0; t < this.length && !1 !== e.apply(this[t], [t, this[t]]); t++);
                    return this;
                },
                filter: function (e) {
                    for (var t = [], s = 0; s < this.length; s++) $(e) ? e.call(this[s], s, this[s]) && t.push(this[s]) : x(this[s], e) && t.push(this[s]);
                    return new q(t);
                },
                html: function (e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                    this.empty();
                    for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                    return this;
                },
                text: function (e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (var t = 0; t < this.length; t++) this[t].textContent = e;
                    return this;
                },
                is: function (e) {
                    return 0 < this.length && x(this[0], e);
                },
                not: function (t) {
                    var s = [];
                    if ($(t) && void 0 !== t.call)
                        this.each(function (e) {
                            t.call(this, e) || s.push(this);
                        });
                    else {
                        var n = "string" == typeof t ? this.filter(t) : H(t) && $(t.item) ? A.call(t) : W(t);
                        F(n) &&
                            (n = W.map(n, function (e) {
                                return e;
                            })),
                            this.each(function (e, t) {
                                n.indexOf(t) < 0 && s.push(t);
                            });
                    }
                    return W(s);
                },
                indexOf: function (e) {
                    for (var t = 0; t < this.length; t++) if (this[t] === e) return t;
                },
                index: function (e) {
                    return e ? this.indexOf(W(e)[0]) : this.parent().children().indexOf(this[0]);
                },
                get: function (e) {
                    return void 0 === e ? A.call(this) : this[0 <= e ? e : e + this.length];
                },
                eq: function (e) {
                    if (void 0 === e) return this;
                    var t,
                        s = this.length;
                    return new q(s - 1 < e ? [] : e < 0 ? ((t = s + e) < 0 ? [] : [this[t]]) : [this[e]]);
                },
                append: function (e) {
                    var t, s;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof e) {
                            var n = document.createElement("div");
                            for (n.innerHTML = e; n.firstChild; ) this[t].appendChild(n.firstChild);
                        } else if (e instanceof q) for (s = 0; s < e.length; s++) this[t].appendChild(e[s]);
                        else this[t].appendChild(e);
                    return this;
                },
                appendTo: function (e) {
                    return W(e).append(this), this;
                },
                prepend: function (e) {
                    var t, s;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof e) {
                            var n = document.createElement("div");
                            for (n.innerHTML = e, s = n.childNodes.length - 1; 0 <= s; s--) this[t].insertBefore(n.childNodes[s], this[t].childNodes[0]);
                        } else if (e instanceof q) for (s = 0; s < e.length; s++) this[t].insertBefore(e[s], this[t].childNodes[0]);
                        else this[t].insertBefore(e, this[t].childNodes[0]);
                    return this;
                },
                prependTo: function (e) {
                    return W(e).prepend(this), this;
                },
                insertBefore: function (e) {
                    for (var t = W(e), s = 0; s < this.length; s++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);
                        else if (1 < t.length) for (var n = 0; n < t.length; n++) t[n].parentNode.insertBefore(this[s].cloneNode(!0), t[n]);
                    return this;
                },
                insertAfter: function (e) {
                    for (var t = W(e), s = 0; s < this.length; s++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);
                        else if (1 < t.length) for (var n = 0; n < t.length; n++) t[n].parentNode.insertBefore(this[s].cloneNode(!0), t[n].nextSibling);
                    return this;
                },
                next: function (e) {
                    return 0 < this.length
                        ? e
                            ? this[0].nextElementSibling && W(this[0].nextElementSibling).is(e)
                                ? new q([this[0].nextElementSibling])
                                : new q([])
                            : this[0].nextElementSibling
                            ? new q([this[0].nextElementSibling])
                            : new q([])
                        : new q([]);
                },
                nextAll: function (e) {
                    var t = [],
                        s = this[0];
                    if (!s) return new q([]);
                    for (; s.nextElementSibling; ) {
                        var n = s.nextElementSibling;
                        e ? W(n).is(e) && t.push(n) : t.push(n), (s = n);
                    }
                    return new q(t);
                },
                prev: function (e) {
                    return 0 < this.length
                        ? e
                            ? this[0].previousElementSibling && W(this[0].previousElementSibling).is(e)
                                ? new q([this[0].previousElementSibling])
                                : new q([])
                            : this[0].previousElementSibling
                            ? new q([this[0].previousElementSibling])
                            : new q([])
                        : new q([]);
                },
                prevAll: function (e) {
                    var t = [],
                        s = this[0];
                    if (!s) return new q([]);
                    for (; s.previousElementSibling; ) {
                        var n = s.previousElementSibling;
                        e ? W(n).is(e) && t.push(n) : t.push(n), (s = n);
                    }
                    return new q(t);
                },
                parent: function (e) {
                    for (var t = [], s = 0; s < this.length; s++) null !== this[s].parentNode && (e ? W(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
                    return W(W.unique(t));
                },
                parents: function (e) {
                    for (var t = [], s = 0; s < this.length; s++) for (var n = this[s].parentNode; n; ) e ? W(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
                    return W(W.unique(t));
                },
                find: function (e) {
                    for (var t = [], s = 0; s < this.length; s++) for (var n = this[s].querySelectorAll(e), a = 0; a < n.length; a++) t.push(n[a]);
                    return new q(t);
                },
                children: function (e) {
                    for (var t = [], s = 0; s < this.length; s++) for (var n = this[s].childNodes, a = 0; a < n.length; a++) e ? 1 === n[a].nodeType && W(n[a]).is(e) && t.push(n[a]) : 1 === n[a].nodeType && t.push(n[a]);
                    return new q(W.unique(t));
                },
                remove: function () {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this;
                },
                add: function () {
                    var e, t;
                    for (e = 0; e < arguments.length; e++) {
                        var s = W(arguments[e]);
                        for (t = 0; t < s.length; t++) (this[this.length] = s[t]), this.length++;
                    }
                    return this;
                },
                before: function (e) {
                    return W(e).insertBefore(this), this;
                },
                after: function (e) {
                    return W(e).insertAfter(this), this;
                },
                scrollTop: function (e) {
                    if (this.length) {
                        var t = "scrollTop" in this[0];
                        return void 0 === e
                            ? t
                                ? this[0].scrollTop
                                : this[0].pageYOffset
                            : this.each(
                                  t
                                      ? function () {
                                            this.scrollTop = e;
                                        }
                                      : function () {
                                            this.scrollTo(this.scrollX, e);
                                        }
                              );
                    }
                },
                scrollLeft: function (e) {
                    if (this.length) {
                        var t = "scrollLeft" in this[0];
                        return void 0 === e
                            ? t
                                ? this[0].scrollLeft
                                : this[0].pageXOffset
                            : this.each(
                                  t
                                      ? function () {
                                            this.scrollLeft = e;
                                        }
                                      : function () {
                                            this.scrollTo(e, this.scrollY);
                                        }
                              );
                    }
                },
                contents: function () {
                    return this.map(function (e, t) {
                        return A.call(t.childNodes);
                    });
                },
                nextUntil: function (e) {
                    for (var t = this, s = []; t.length && !t.filter(e).length; ) s.push(t[0]), (t = t.next());
                    return W(s);
                },
                prevUntil: function (e) {
                    for (var t = this, s = []; t.length && !W(t).filter(e).length; ) s.push(t[0]), (t = t.prev());
                    return W(s);
                },
                detach: function () {
                    return this.remove();
                },
            }),
            (W.fn = q.prototype),
            W);
    function q(e) {
        var t = 0;
        for (t = 0; t < e.length; t++) this[t] = e[t];
        return (this.length = e.length), W(this);
    }
    var j = z;
    function rt() {}
    function B(e) {
        var t,
            s = [];
        for (t in e) s.push(e[t]);
        return s;
    }
    function ye(e) {
        return 0 <= e - parseFloat(e);
    }
    function _e(e) {
        return "string" == typeof e;
    }
    function we(e, t, s) {
        return Math.max(t, Math.min(e, s));
    }
    function re(e, t) {
        for (e += "", t = t || 2; e.length < t; ) e = "0" + e;
        return e;
    }
    function Z(e, t, s) {
        return (100 * (e - t)) / (s - t);
    }
    function X(e, t, s) {
        var n = s.attr(e);
        return void 0 === n || "" === n ? t : "true" === n;
    }
    (se.$ = z),
        (j.inArray = function (e, t, s) {
            return L.indexOf.call(t, e, s);
        }),
        (j.extend = function (t) {
            var s,
                e = A.call(arguments, 1);
            return (
                "boolean" == typeof t && ((s = t), (t = e.shift())),
                (t = t || {}),
                e.forEach(function (e) {
                    !(function e(t, s, n) {
                        for (var a in s)
                            n && (j.isPlainObject(s[a]) || j.isArray(s[a]))
                                ? (((j.isPlainObject(s[a]) && !j.isPlainObject(t[a])) || (j.isArray(s[a]) && !j.isArray(t[a]))) && (t[a] = {}), e(t[a], s[a], n))
                                : void 0 !== s[a] && (t[a] = s[a]);
                    })(t, e, s);
                }),
                t
            );
        }),
        (j.isFunction = $),
        (j.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e);
        }),
        (j.isPlainObject = function (e) {
            return F(e) && null !== e && e !== e.window && Object.getPrototypeOf(e) == Object.prototype;
        }),
        (j.each = function (e, t) {
            var s, n;
            if (F(e) && t) {
                if (j.isArray(e) || e instanceof z) for (s = 0; s < e.length && !1 !== t.call(e[s], s, e[s]); s++);
                else for (n in e) if (e.hasOwnProperty(n) && "length" !== n && !1 === t.call(e[n], n, e[n])) break;
                return this;
            }
        }),
        (j.unique = function (e) {
            for (var t = [], s = 0; s < e.length; s++) -1 === t.indexOf(e[s]) && t.push(e[s]);
            return t;
        }),
        (j.map = function (e, t) {
            var s,
                n,
                a,
                i = [];
            if (H(e)) for (n = 0; n < e.length; n++) null !== (s = t(e[n], n)) && i.push(s);
            else for (a in e) null !== (s = t(e[a], a)) && i.push(s);
            return 0 < i.length ? j.fn.concat.apply([], i) : i;
        });
    var G,
        J = 0;
    function ot() {
        J++,
            setTimeout(function () {
                J--;
            }, 500);
    }
    function K(e, t) {
        if (!t.mbscClick) {
            var s = (e.originalEvent || e).changedTouches[0],
                n = document.createEvent("MouseEvents");
            n.initMouseEvent("click", !0, !0, window, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null),
                (n.isMbscTap = !0),
                (n.isIonicTap = !0),
                (G = !0),
                (t.mbscChange = !0),
                (t.mbscClick = !0),
                t.dispatchEvent(n),
                (G = !1),
                ot(),
                setTimeout(function () {
                    delete t.mbscClick;
                });
        }
    }
    function xe(e, t, s) {
        var n = e.originalEvent || e,
            a = (s ? "page" : "client") + t;
        return n.targetTouches && n.targetTouches[0] ? n.targetTouches[0][a] : n.changedTouches && n.changedTouches[0] ? n.changedTouches[0][a] : e[a];
    }
    function Q(e) {
        var t = ["switch", "range", "rating", "segmented", "stepper"],
            s = e[0],
            n = e.attr("data-role"),
            a = e.attr("type") || s.nodeName.toLowerCase();
        if (/(switch|range|rating|segmented|stepper|select)/.test(n)) a = n;
        else for (var i = 0; i < t.length; i++) e.is("[mbsc-" + t[i] + "]") && (a = t[i]);
        return a;
    }
    function ee(s, e, t, n, a, i) {
        var r,
            o,
            l,
            c,
            u,
            d = (0, se.$)(e);
        function p(e) {
            l || ((l = this), (r = xe(e, "X")), (o = xe(e, "Y")), (c = !1), (u = new Date()));
        }
        function h(e) {
            l && !c && (Math.abs(xe(e, "X") - r) > a || Math.abs(xe(e, "Y") - o) > a) && (c = !0);
        }
        function m(e) {
            l && ((i && new Date() - u < 100) || !c ? K(e, e.target) : ot(), (l = !1));
        }
        function f(e) {
            n && e.preventDefault(), t.call(this, e, s);
        }
        function b() {
            l = !1;
        }
        (a = a || 9),
            d.each(function (e, t) {
                s.settings.tap && (it(t, "touchstart", p, { passive: !0 }), it(t, "touchcancel", b), it(t, "touchmove", h, { passive: !0 }), it(t, "touchend", m)),
                    it(t, "click", f),
                    (t.__mbscOff = function () {
                        be(t, "touchstart", p, { passive: !0 }), be(t, "touchcancel", b), be(t, "touchmove", h, { passive: !0 }), be(t, "touchend", m), be(t, "click", f), delete t.__mbscOff;
                    });
            });
    }
    function ae(e) {
        e && e[0] && e[0].__mbscOff && e[0].__mbscOff();
    }
    function te(e) {
        if (J && !G && !e.isMbscTap && ("TEXTAREA" != e.target.nodeName || "mousedown" != e.type)) return e.stopPropagation(), e.preventDefault(), !1;
    }
    function lt(e) {
        return e[0].innerWidth || e.innerWidth();
    }
    function oe(e) {
        var t = e.theme,
            s = e.themeVariant;
        return (
            ("auto" != t && t) || (t = ce.autoTheme),
            "default" == t && (t = "mobiscroll"),
            ("dark" === s || (d && "auto" === s)) && ce.themes.form[t + "-dark"] ? (t += "-dark") : "light" === s && /.+-dark$/.test(t) && (t = t.replace(/-dark$/, "")),
            t
        );
    }
    function le(s, n, e) {
        u &&
            ct(function () {
                ct(s).each(function () {
                    new n(this, {});
                }),
                    ct(document).on("mbsc-enhance", function (e, t) {
                        ct(e.target).is(s)
                            ? new n(e.target, t || {})
                            : ct(s, e.target).each(function () {
                                  new n(this, t || {});
                              });
                    }),
                    e &&
                        ct(document).on("mbsc-refresh", function (e) {
                            var t;
                            ct(e.target).is(s)
                                ? (t = de[e.target.id]) && t.refresh()
                                : ct(s, e.target).each(function () {
                                      (t = de[this.id]) && t.refresh();
                                  });
                        });
            });
    }
    u &&
        (["mouseover", "mousedown", "mouseup", "click"].forEach(function (e) {
            document.addEventListener(e, te, !0);
        }),
        "android" == t &&
            n < 5 &&
            document.addEventListener(
                "change",
                function (e) {
                    J && "checkbox" == e.target.type && !e.target.mbscChange && (e.stopPropagation(), e.preventDefault()), delete e.target.mbscChange;
                },
                !0
            )),
        (se.uid = "bcb98bcc");
    var ce,
        ct = se.$,
        ue = +new Date(),
        de = {},
        Ce = {},
        Te = {},
        Me = { xsmall: 0, small: 576, medium: 768, large: 992, xlarge: 1200 },
        ut = ct.extend;
    ut(o, {
        getCoord: xe,
        preventClick: ot,
        vibrate: function (e) {
            "vibrate" in navigator && navigator.vibrate(e || 50);
        },
    }),
        (ce = ut(se, {
            $: ct,
            version: "4.10.6",
            autoTheme: "mobiscroll",
            themes: { form: {}, page: {}, frame: {}, scroller: {}, listview: {}, navigation: {}, progress: {}, card: {} },
            platform: { name: t, majorVersion: n, minorVersion: a },
            i18n: {},
            instances: de,
            classes: Ce,
            util: o,
            settings: {},
            setDefaults: function (e) {
                ut(this.settings, e);
            },
            customTheme: function (e, t) {
                var s,
                    n = se.themes,
                    a = ["frame", "scroller", "listview", "navigation", "form", "page", "progress", "card"];
                for (s = 0; s < a.length; s++) n[a[s]][e] = ut({}, n[a[s]][t], { baseTheme: t });
            },
        }));
    function ke(r, o) {
        var a,
            i,
            l,
            c,
            u,
            d,
            p,
            h,
            m,
            f = this;
        function b(e) {
            var s,
                n = Te;
            return (
                u.responsive &&
                    ((s = e || lt(a)),
                    ct.each(u.responsive, function (e, t) {
                        s >= (t.breakpoint || Me[e]) && (n = t);
                    })),
                n
            );
        }
        (f.settings = {}),
            (f.element = r),
            (f._init = rt),
            (f._destroy = rt),
            (f._processSettings = rt),
            (f._checkResp = function (e) {
                if (f && f._responsive) {
                    var t = b(e);
                    if (c !== t) return (c = t), f.init({}), !0;
                }
            }),
            (f._getRespCont = function () {
                return ct("body" == u.context ? window : u.context);
            }),
            (f.init = function (e, t) {
                var s, n;
                for (s in (e && f.getVal && (n = f.getVal()), f.settings)) delete f.settings[s];
                (u = f.settings),
                    ut(o, e),
                    f._hasDef && (m = ce.settings),
                    ut(u, f._defaults, m, o),
                    f._hasTheme && ((p = oe(u)), (o.theme = p), (d = ce.themes[f._class] ? ce.themes[f._class][p] : {})),
                    f._hasLang && (i = ce.i18n[u.lang]),
                    ut(u, d, i, m, o),
                    (a = f._getRespCont()),
                    f._responsive && ((c = c || b()), ut(u, c)),
                    f._processSettings(c || {}),
                    f._presets && (l = f._presets[u.preset]) && ((l = l.call(r, f, o)), ut(u, l, o, c)),
                    f._init(e),
                    e && f.setVal && f.setVal(void 0 === t ? n : t, !0),
                    h("onInit");
            }),
            (f.destroy = function () {
                f && (f._destroy(), h("onDestroy"), delete de[r.id], (f = null));
            }),
            (f.tap = function (e, t, s, n, a) {
                ee(f, e, t, s, n, a);
            }),
            (f.trigger = function (e, t) {
                var s,
                    n,
                    a,
                    i = [m, d, l, o];
                for (n = 0; n < 4; n++) (a = i[n]) && a[e] && (s = a[e].call(r, t || {}, f));
                return s;
            }),
            (f.option = function (e, t, s) {
                var n = {},
                    a = ["data", "invalid", "valid", "readonly"];
                /calendar|eventcalendar|range/.test(u.preset) && a.push("marked", "labels", "colors"),
                    "object" == typeof e ? (n = e) : (n[e] = t),
                    a.forEach(function (e) {
                        o[e] = u[e];
                    }),
                    f.init(n, s);
            }),
            (f.getInst = function () {
                return f;
            }),
            (o = o || {}),
            (h = f.trigger),
            f.__ready || (ct(r).addClass("mbsc-comp"), r.id ? de[r.id] && de[r.id].destroy() : (r.id = "mobiscroll" + ++ue), ((de[r.id] = f).__ready = !0));
    }
    var De = e.bool,
        Se = e.string,
        Oe = e.func,
        Ne = e.number,
        Ve = e.object,
        Ee = e.oneOfType([Ve, Se]),
        Pe = e.oneOfType([Ne, e.arrayOf(Ne)]),
        Ie = { theme: Se, themeVariant: e.oneOf(["auto", "dark", "light"]), lang: Se, rtl: De, responsive: Ve, context: e.oneOfType([Se, Ve]) },
        Le = {
            anchor: e.oneOfType([Se, Ve]),
            animate: e.oneOfType([De, e.oneOf(["fade", "flip", "pop", "swing", "slidevertical", "slidehorizontal", "slidedown", "slideup"])]),
            buttons: e.array,
            closeOnOverlayTap: De,
            cssClass: Se,
            disabled: De,
            display: e.oneOf(["top", "bottom", "bubble", "inline", "center"]),
            focusOnClose: e.oneOfType([De, Se, Ve]),
            focusTrap: De,
            headerText: e.oneOfType([De, Se, Oe]),
            layout: e.oneOf(["liquid", "fixed"]),
            scrollLock: De,
            showOnFocus: De,
            showOnTap: De,
            showOnOverlay: De,
            touchUi: De,
            onBeforeClose: Oe,
            onBeforeShow: Oe,
            onCancel: Oe,
            onClose: Oe,
            onDestroy: Oe,
            onMarkupReady: Oe,
            onPosition: Oe,
            onShow: Oe,
        },
        Ae = {
            circular: e.oneOfType([De, e.arrayOf(De)]),
            height: Ne,
            maxWidth: Pe,
            minWidth: Pe,
            multiline: Ne,
            readonly: e.oneOfType([De, e.arrayOf(De)]),
            rows: Ne,
            showLabel: De,
            showScrollArrows: De,
            wheels: e.array,
            width: Ne,
            onChange: Oe,
            validate: Oe,
            onSet: Oe,
            onItemTap: Oe,
            onClear: Oe,
            cancelText: Se,
            clearText: Se,
            selectedText: Se,
            setText: Se,
            formatValue: Oe,
            parseValue: Oe,
        },
        $e = {
            defaultValue: Ee,
            invalid: e.array,
            max: Ee,
            min: Ee,
            returnFormat: e.oneOf(["iso8601", "moment", "locale", "jsdate"]),
            steps: e.shape({ hour: Ne, minute: Ne, second: Ne, zeroBased: De }),
            valid: e.array,
            calendarSystem: e.oneOf(["jalali", "hijri", "gregorian"]),
            ampmText: Se,
            amText: Se,
            dateFormat: Se,
            dateWheels: Se,
            dayNames: e.arrayOf(Se),
            dayNamesShort: e.arrayOf(Se),
            dayText: Se,
            hourText: Se,
            minuteText: Se,
            monthNames: e.arrayOf(Se),
            monthNamesShort: e.arrayOf(Se),
            monthSuffix: Se,
            monthText: Se,
            nowText: Se,
            pmText: Se,
            secText: Se,
            timeFormat: Se,
            timeWheels: Se,
            yearSuffix: Se,
            yearText: Se,
        },
        Fe = {
            calendarHeight: Ne,
            calendarScroll: e.oneOf(["horizontal", "vertical"]),
            calendarWidth: Ne,
            counter: De,
            defaultValue: e.oneOfType([Ee, e.array]),
            events: e.arrayOf(e.shape({ start: Ee, end: Ee, d: e.oneOfType([Ve, Ne, Se]), text: Se, color: Se, background: Se, cssClass: Se })),
            labels: e.arrayOf(e.shape({ start: Ee, end: Ee, d: e.oneOfType([Ve, Ne, Se]), text: Se, color: Se, background: Se, cssClass: Se })),
            marked: e.arrayOf(e.oneOfType([Ve, Ne, Se, e.shape({ d: e.oneOfType([Ve, Se, Ne]), color: Se, background: Se, cssClass: Se })])),
            colors: e.arrayOf(e.shape({ d: e.oneOfType([Ve, Se, Ne]), background: Se, cssClass: Se })),
            months: Ne,
            mousewheel: De,
            weeks: Ne,
            outerMonthChange: De,
            showOuterDays: De,
            tabs: De,
            weekCounter: e.oneOf(["year", "month"]),
            weekDays: e.oneOf(["full", "short", "min"]),
            yearChange: De,
            dateText: Se,
            dayNames: e.arrayOf(Se),
            dayNamesMin: e.arrayOf(Se),
            firstDay: Ne,
            timeText: Se,
            moreEventsPluralText: Se,
            moreEventsText: Se,
            onTabChange: Oe,
            onCellHoverIn: Oe,
            onCellHoverOut: Oe,
            onDayChange: Oe,
            onLabelTap: Oe,
            onMonthChange: Oe,
            onMonthLoading: Oe,
            onMonthLoaded: Oe,
            onPageChange: Oe,
            onPageLoading: Oe,
            onPageLoaded: Oe,
            onSetDate: Oe,
        };
    function He(e, t) {
        var s = i.findDOMNode(this),
            n = e.replace(/\s+/g, " ").trim(),
            a = t.replace(/\s+/g, " ").trim();
        n && s.classList.remove.apply(s.classList, n.split(" ")), a && s.classList.add.apply(s.classList, a.split(" "));
    }
    function Ye(e, t) {
        var r = [],
            o = [];
        return (function e(t, s, n) {
            var a;
            if (isNaN(t) && isNaN(s) && "number" == typeof t && "number" == typeof s) return !0;
            if (t === s) return !0;
            if ("function" == typeof t && "function" == typeof s) return !1;
            if ((t instanceof Date && s instanceof Date) || (t instanceof RegExp && s instanceof RegExp) || (t instanceof String && s instanceof String) || (t instanceof Number && s instanceof Number)) return t.toString() === s.toString();
            if (!(t instanceof Object && s instanceof Object)) return !1;
            if (t.isPrototypeOf(s) || s.isPrototypeOf(t)) return !1;
            if (t.constructor !== s.constructor) return !1;
            if (t.prototype !== s.prototype) return !1;
            if (-1 < r.indexOf(t) || -1 < o.indexOf(s)) return !1;
            for (a in s) {
                if (s.hasOwnProperty(a) !== t.hasOwnProperty(a)) return !1;
                if (typeof s[a] != typeof t[a]) return !1;
            }
            var i = n ? { $$typeof: 1, key: 1, props: 1, ref: 1, type: 1 } : t;
            for (a in i) {
                if (s.hasOwnProperty(a) !== t.hasOwnProperty(a)) return !1;
                if (typeof s[a] != typeof t[a]) return !1;
                switch (typeof t[a]) {
                    case "object":
                    case "function":
                        if ((r.push(t), o.push(s), !e(t[a], s[a], t[a] && void 0 !== t[a].$$typeof))) return !1;
                        r.pop(), o.pop();
                        break;
                    default:
                        if (t[a] !== s[a]) return !1;
                }
            }
            return !0;
        })(e, t);
    }
    var Ue = (function (s) {
            function e(e) {
                var t;
                return ((t = s.call(this, e) || this).initialCssClass = t.props.className || ""), t;
            }
            l(e, s);
            var t = e.prototype;
            return (
                (t.render = function () {
                    return null;
                }),
                (t.getSettingsFromProps = function (e, t) {
                    var s = {};
                    if (void 0 !== e) {
                        var n = e.options,
                            a = (e.children, e.value, e.checked, e.data, e.className, y(e, ["options", "children", "value", "checked", "data", "className"])),
                            i = n || "{}";
                        (s = n || {}), void 0 !== n && "string" == typeof i && (s = new Function("return " + i + ";")()), (s = ut({}, s, a, t || {}));
                    }
                    return s;
                }),
                (t.componentWillUnmount = function () {
                    this.instance.destroy(), delete this.instance;
                }),
                e
            );
        })(v.Component),
        Re = (function (s) {
            function e(e) {
                var t;
                return ((t = s.call(this, e) || this).updateForIonInput = t.updateForIonInput.bind(b(t))), t;
            }
            l(e, s);
            var t = e.prototype;
            return (
                (t.updateForIonInput = function () {
                    this.valueState && ((this.optimizeUpdate = null), this.forceUpdate());
                }),
                (t.isIonInput = function (e) {
                    return e && 1 == v.Children.count(e) && e.type && e.type.render && "IonInput" === e.type.render.displayName;
                }),
                (t.componentDidUpdate = function () {
                    var e = this.getSettingsFromProps(this.props);
                    this.optimizeUpdate
                        ? (this.optimizeUpdate.updateOptions && this.instance.option(e),
                          this.optimizeUpdate.updateValue && void 0 !== this.props.value && !Ye(this.props.value, this.instance.getVal()) && this.instance.setVal(this.props.value, !0),
                          this.updateForIonInput())
                        : null !== this.optimizeUpdate && (this.instance.option(e), void 0 !== this.props.value && this.instance.setVal(this.props.value, !0));
                }),
                e
            );
        })(Ue),
        We = (function (t) {
            function e(e) {
                return t.call(this, e) || this;
            }
            return (
                l(e, t),
                (e.prototype.shouldComponentUpdate = function (e) {
                    var t = !Ye(this.getSettingsFromProps(e), this.getSettingsFromProps(this.props)),
                        s = !Ye(e.value, this.props.value),
                        n = !Ye(e.children, this.props.children);
                    return (this.optimizeUpdate = { updateOptions: t, updateValue: s, updateChildren: n }), t || s || n;
                }),
                e
            );
        })(Re),
        ze = (function (a) {
            function e() {
                for (var t, e = arguments.length, s = new Array(e), n = 0; n < e; n++) s[n] = arguments[n];
                return (
                    r(b((t = a.call.apply(a, [this].concat(s)) || this)), "element", null),
                    r(b(t), "inputCheckCount", 0),
                    r(b(t), "startInit", function () {
                        t.element = i.findDOMNode(b(t));
                        var e = ct(t.element).find("input");
                        e.length && (t.element = e[0]), t.inputCheckCount++, !t.isIonInput(t.props.children) || e.length || 17 < t.inputCheckCount ? t.initInstance() : setTimeout(t.startInit, 30);
                    }),
                    r(b(t), "initInstance", function () {
                        var e = t.getSettingsFromProps(t.props, t.mbscInit);
                        (t.instance = new Ce[t.mbscInit.component || "Scroller"](t.element, e)), void 0 !== t.props.value && (t.instance.setVal(t.props.value, !0), t.updateForIonInput());
                    }),
                    t
                );
            }
            l(e, a);
            var t = e.prototype;
            return (
                (t.render = function () {
                    var e = this.props,
                        t = e.type,
                        s = e.readOnly,
                        n = e.disabled,
                        a = e.placeholder,
                        i = e.children;
                    if (((t = t || "text"), this.isIonInput(i))) {
                        this.valueState = !0;
                        var r = this.instance ? this.instance._value : "";
                        return v.cloneElement(i, g({ value: r }, i.props));
                    }
                    return i ? this.props.children : v.createElement("input", { className: this.initialCssClass, type: t, readOnly: s, disabled: n, placeholder: a });
                }),
                (t.componentDidMount = function () {
                    this.startInit();
                }),
                e
            );
        })(We);
    function dt(e, t, s, n, a, i, r) {
        var o = new Date(e, t, s, n || 0, a || 0, i || 0, r || 0);
        return 23 == o.getHours() && 0 === (n || 0) && o.setHours(o.getHours() + 2), o;
    }
    function qe(s, e, t) {
        if (!e) return null;
        function a(e) {
            for (var t = 0; r + 1 < s.length && s.charAt(r + 1) == e; ) t++, r++;
            return t;
        }
        function n(e, t, s) {
            var n = "" + t;
            if (a(e)) for (; n.length < s; ) n = "0" + n;
            return n;
        }
        function i(e, t, s, n) {
            return a(e) ? n[t] : s[t];
        }
        var r,
            o,
            l = ut({}, Ze, t),
            c = "",
            u = !1;
        for (r = 0; r < s.length; r++)
            if (u) "'" != s.charAt(r) || a("'") ? (c += s.charAt(r)) : (u = !1);
            else
                switch (s.charAt(r)) {
                    case "d":
                        c += n("d", l.getDay(e), 2);
                        break;
                    case "D":
                        c += i("D", e.getDay(), l.dayNamesShort, l.dayNames);
                        break;
                    case "o":
                        c += n("o", (e.getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5, 3);
                        break;
                    case "m":
                        c += n("m", l.getMonth(e) + 1, 2);
                        break;
                    case "M":
                        c += i("M", l.getMonth(e), l.monthNamesShort, l.monthNames);
                        break;
                    case "y":
                        (o = l.getYear(e)), (c += a("y") ? o : (o % 100 < 10 ? "0" : "") + (o % 100));
                        break;
                    case "h":
                        var d = e.getHours();
                        c += n("h", 12 < d ? d - 12 : 0 === d ? 12 : d, 2);
                        break;
                    case "H":
                        c += n("H", e.getHours(), 2);
                        break;
                    case "i":
                        c += n("i", e.getMinutes(), 2);
                        break;
                    case "s":
                        c += n("s", e.getSeconds(), 2);
                        break;
                    case "a":
                        c += 11 < e.getHours() ? l.pmText : l.amText;
                        break;
                    case "A":
                        c += 11 < e.getHours() ? l.pmText.toUpperCase() : l.amText.toUpperCase();
                        break;
                    case "'":
                        a("'") ? (c += "'") : (u = !0);
                        break;
                    default:
                        c += s.charAt(r);
                }
        return c;
    }
    function je(s, i, e) {
        var t = ut({}, Ze, e),
            n = ft(t.defaultValue || new Date());
        if (!s || !i) return n;
        if (i.getTime) return i;
        i = "object" == typeof i ? i.toString() : i + "";
        function r(e) {
            var t = c + 1 < s.length && s.charAt(c + 1) == e;
            return t && c++, t;
        }
        function a(e) {
            r(e);
            var t = new RegExp("^\\d{1," + ("@" == e ? 14 : "!" == e ? 20 : "y" == e ? 4 : "o" == e ? 3 : 2) + "}"),
                s = i.substr(_).match(t);
            return s ? ((_ += s[0].length), parseInt(s[0], 10)) : 0;
        }
        function o(e, t, s) {
            var n,
                a = r(e) ? s : t;
            for (n = 0; n < a.length; n++) if (i.substr(_, a[n].length).toLowerCase() == a[n].toLowerCase()) return (_ += a[n].length), n + 1;
            return 0;
        }
        function l() {
            _++;
        }
        var c,
            u = t.shortYearCutoff,
            d = t.getYear(n),
            p = t.getMonth(n) + 1,
            h = t.getDay(n),
            m = -1,
            f = n.getHours(),
            b = n.getMinutes(),
            v = 0,
            g = -1,
            y = !1,
            _ = 0;
        for (c = 0; c < s.length; c++)
            if (y) "'" != s.charAt(c) || r("'") ? l() : (y = !1);
            else
                switch (s.charAt(c)) {
                    case "d":
                        h = a("d");
                        break;
                    case "D":
                        o("D", t.dayNamesShort, t.dayNames);
                        break;
                    case "o":
                        m = a("o");
                        break;
                    case "m":
                        p = a("m");
                        break;
                    case "M":
                        p = o("M", t.monthNamesShort, t.monthNames);
                        break;
                    case "y":
                        d = a("y");
                        break;
                    case "H":
                        f = a("H");
                        break;
                    case "h":
                        f = a("h");
                        break;
                    case "i":
                        b = a("i");
                        break;
                    case "s":
                        v = a("s");
                        break;
                    case "a":
                        g = o("a", [t.amText, t.pmText], [t.amText, t.pmText]) - 1;
                        break;
                    case "A":
                        g = o("A", [t.amText, t.pmText], [t.amText, t.pmText]) - 1;
                        break;
                    case "'":
                        r("'") ? l() : (y = !0);
                        break;
                    default:
                        l();
                }
        if ((d < 100 && (d += new Date().getFullYear() - (new Date().getFullYear() % 100) + (d <= ("string" != typeof u ? u : (new Date().getFullYear() % 100) + parseInt(u, 10)) ? 0 : -100)), -1 < m)) {
            (p = 1), (h = m);
            do {
                var w = 32 - new Date(d, p - 1, 32, 12).getDate();
                w < h && (p++, (h -= w));
            } while (w < h);
        }
        f = -1 == g ? f : g && f < 12 ? f + 12 : g || 12 != f ? f : 0;
        var x = t.getDate(d, p - 1, h, f, b, v);
        return t.getYear(x) != d || t.getMonth(x) + 1 != p || t.getDay(x) != h ? n : x;
    }
    function pt(e, t) {
        return Math.round((t - e) / 864e5);
    }
    function ht(e) {
        return dt(e.getFullYear(), e.getMonth(), e.getDate());
    }
    function mt(e) {
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    }
    function Be(e, t, s) {
        var n,
            a,
            i = { y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, u: 7, tz: 8 };
        if (s) for (n in i) (a = e[i[n] - t]) && (s[n] = "tz" == n ? a : 1);
    }
    function Xe(e, t, s) {
        var n,
            a,
            i,
            r,
            o = window.moment || t.moment,
            l = t.returnFormat;
        if (e) {
            if ("moment" == l && o) return o(e);
            if ("locale" == l) return qe(s, e, t);
            if ("iso8601" == l)
                return (
                    (n = e),
                    (a = t.isoParts),
                    (r = i = ""),
                    n &&
                        (a.h && ((r += re(n.getHours()) + ":" + re(n.getMinutes())), a.s && (r += ":" + re(n.getSeconds())), a.u && (r += "." + re(n.getMilliseconds(), 3)), a.tz && (r += a.tz)),
                        a.y ? ((i += n.getFullYear()), a.m && ((i += "-" + re(n.getMonth() + 1)), a.d && (i += "-" + re(n.getDate())), a.h && (i += "T" + r))) : a.h && (i = r)),
                    i
                );
        }
        return e;
    }
    function ft(e, t, s, n) {
        var a;
        return e
            ? e.getTime
                ? e
                : e.toDate
                ? e.toDate()
                : ("string" == typeof e && (e = e.trim()),
                  (a = Je.exec(e))
                      ? (Be(a, 2, n), new Date(1970, 0, 1, a[2] ? +a[2] : 0, a[3] ? +a[3] : 0, a[4] ? +a[4] : 0, a[5] ? +a[5] : 0))
                      : (a = a || Ge.exec(e))
                      ? (Be(a, 0, n), new Date(a[1] ? +a[1] : 1970, a[2] ? a[2] - 1 : 0, a[3] ? +a[3] : 1, a[4] ? +a[4] : 0, a[5] ? +a[5] : 0, a[6] ? +a[6] : 0, a[7] ? +a[7] : 0))
                      : je(t, e, s))
            : null;
    }
    function bt(e, t) {
        return e.getFullYear() == t.getFullYear() && e.getMonth() == t.getMonth() && e.getDate() == t.getDate();
    }
    r(ze, "propTypes", g({}, Ie, {}, Le, { type: e.string, placeholder: e.string })),
        r(
            (function (e) {
                function t() {
                    return e.apply(this, arguments) || this;
                }
                l(t, e);
                var s = t.prototype;
                return (
                    (s.render = function () {
                        return v.createElement("ul", { className: this.initialCssClass + " mbsc-cloak" }, this.props.children);
                    }),
                    (s.componentDidMount = function () {
                        var e = this.getSettingsFromProps(this.props, this.mbscInit),
                            t = i.findDOMNode(this);
                        (this.instance = new Ce[this.mbscInit.component || "Scroller"](t, e)),
                            void 0 !== this.props.value && this.instance.setVal(this.props.value, !0),
                            (this.instance._markup || ct(t)).on("click", function (e) {
                                e.stopPropagation();
                            });
                    }),
                    (s.componentDidUpdate = function () {
                        !this.optimizeUpdate.updateOptions && this.optimizeUpdate.updateChildren && this.instance.option(this.getSettingsFromProps(this.props));
                        var e = i.findDOMNode(this);
                        (this.instance._markup || ct(e)).on("click", function (e) {
                            e.stopPropagation();
                        });
                    }),
                    t
                );
            })(We),
            "propTypes",
            g({}, Ie, {}, Le, {}, Ae)
        );
    var Ge = /^(\d{4}|[+-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?((Z)|([+-])(\d{2})(?::(\d{2}))?)?)?$/,
        Je = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+-])(\d{2})(?::(\d{2}))?)?)?$/,
        vt = /^\d{1,2}(\/\d{1,2})?$/,
        gt = /^w\d$/i,
        Ze = {
            shortYearCutoff: "+10",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
            amText: "am",
            pmText: "pm",
            getYear: function (e) {
                return e.getFullYear();
            },
            getMonth: function (e) {
                return e.getMonth();
            },
            getDay: function (e) {
                return e.getDate();
            },
            getDate: dt,
            getMaxDayOfMonth: function (e, t) {
                return 32 - new Date(e, t, 32, 12).getDate();
            },
            getWeekNumber: function (e) {
                (e = new Date(e)).setHours(0, 0, 0), e.setDate(e.getDate() + 4 - (e.getDay() || 7));
                var t = new Date(e.getFullYear(), 0, 1);
                return Math.ceil(((e - t) / 864e5 + 1) / 7);
            },
        };
    function yt(e, t, s, n, a, i) {
        var r,
            o,
            l,
            c,
            u,
            d,
            p,
            h,
            m,
            f = n || rt;
        function b(e) {
            var t;
            (r = ct(this)),
                (h = +r.attr("data-step")),
                (l = +r.attr("data-index")),
                (o = !0),
                a && e.stopPropagation(),
                "touchstart" == e.type && r.closest(".mbsc-no-touch").removeClass("mbsc-no-touch"),
                "mousedown" == e.type && e.preventDefault(),
                (t = "keydown" != e.type ? ((d = xe(e, "X")), (p = xe(e, "Y")), me(e, this)) : 32 === e.keyCode),
                c || !t || r.hasClass("mbsc-disabled") || (_(l, h, e) && (r.addClass("mbsc-active"), i && i.addRipple(r.find(".mbsc-segmented-content"), e)), "mousedown" == e.type && ct(document).on("mousemove", v).on("mouseup", g));
        }
        function v(e) {
            (7 < Math.abs(d - xe(e, "X")) || 7 < Math.abs(p - xe(e, "Y"))) && ((o = !0), y());
        }
        function g(e) {
            "touchend" == e.type && e.preventDefault(), y(), "mouseup" == e.type && ct(document).off("mousemove", v).off("mouseup", g);
        }
        function y() {
            (c = !1),
                clearInterval(m),
                r &&
                    (r.removeClass("mbsc-active"),
                    i &&
                        setTimeout(function () {
                            i.removeRipple();
                        }, 100));
        }
        function _(e, t, s) {
            return c || f(e) || ((l = e), (h = t), (u = s), (o = !(c = !0)), setTimeout(w, 100)), c;
        }
        function w() {
            r && r.hasClass("mbsc-disabled")
                ? y()
                : ((!c && o) || ((o = !0), t(l, h, u, w)),
                  c &&
                      s &&
                      (clearInterval(m),
                      (m = setInterval(function () {
                          t(l, h, u);
                      }, s))));
        }
        return (
            e.each(function (e, t) {
                it(t, "touchstart", b, { passive: !0 }), it(t, "mousedown", b), it(t, "keydown", b), it(t, "touchmove", v, { passive: !0 }), it(t, "touchend", g), it(t, "touchcancel", g), it(t, "keyup", g);
            }),
            {
                start: _,
                stop: y,
                destroy: function () {
                    e.each(function (e, t) {
                        be(t, "touchstart", b, { passive: !0 }), be(t, "mousedown", b), be(t, "keydown", b), be(t, "touchmove", v, { passive: !0 }), be(t, "touchend", g), be(t, "touchcancel", g), be(t, "keyup", g);
                    });
                },
            }
        );
    }
    o.datetime = { formatDate: qe, parseDate: je };
    var Ke,
        Qe = "position:absolute;left:0;top:0;",
        et = Qe + "right:0;bottom:0;overflow:hidden;z-index:-1;",
        tt = '<div style="' + et + '"><div style="' + Qe + '"></div></div><div style="' + et + '"><div style="' + Qe + 'width:200%;height:200%;"></div></div>',
        st = 0;
    function nt(e) {
        e.preventDefault();
    }
    function _t(s, n, e) {
        var M,
            u,
            d,
            k,
            T,
            D,
            S,
            O,
            N,
            V,
            a,
            E,
            P,
            I,
            L,
            A,
            p,
            $,
            F,
            H,
            Y,
            h,
            U,
            R,
            W,
            t,
            m,
            z,
            q,
            j,
            B,
            X,
            G,
            J = this,
            Z = ct(s),
            i = [],
            r = new Date();
        function K(e) {
            z.stopProp && e.stopPropagation();
            var t = C(this, e.target, ".mbsc-fr-btn-e");
            t && (a && a.removeClass("mbsc-active"), (a = ct(t)).hasClass("mbsc-disabled") || a.hasClass("mbsc-fr-btn-nhl") || a.addClass("mbsc-active"), "mousedown" === e.type && ct(document).on("mouseup", Q));
        }
        function Q(e) {
            a && (a.removeClass("mbsc-active"), (a = null)), "mouseup" === e.type && ct(document).off("mouseup", Q);
        }
        function f(e) {
            q && $.contains(e.target) && e.preventDefault();
        }
        function b(e) {
            se.activeInstance == J && (13 != e.keyCode || (ct(e.target).is('textarea,button,input[type="button"],input[type="submit"]') && !e.shiftKey) ? 27 == e.keyCode && J.cancel() : J.select());
        }
        function ee(e) {
            e || Mt || !J._activeElm || ((r = new Date()), J._activeElm.focus());
        }
        function o(e) {
            var t = wt,
                s = z.focusOnClose;
            J._markupRemove(),
                k.remove(),
                L &&
                    (E.mbscModals--,
                    z.scrollLock && E.mbscLock--,
                    E.mbscLock || d.removeClass("mbsc-fr-lock"),
                    h && (E.mbscIOSLock--, E.mbscIOSLock || (d.removeClass("mbsc-fr-lock-ios"), M.css({ top: "", left: "" }), O.scrollLeft(E.mbscScrollLeft), O.scrollTop(E.mbscScrollTop))),
                    E.mbscModals || d.removeClass("mbsc-fr-lock-ctx"),
                    (E.mbscModals && !m) ||
                        e ||
                        ((t = t || Z),
                        setTimeout(function () {
                            void 0 === s || !0 === s ? ((xt = !0), t[0].focus()) : s && ct(s)[0].focus();
                        }, 200))),
                (m = void 0),
                (A = !1),
                B("onHide");
        }
        function te() {
            clearTimeout(t),
                (t = setTimeout(function () {
                    J.position(!0) && ((W.style.visibility = "hidden"), W.offsetHeight, (W.style.visibility = ""));
                }, 200));
        }
        function v(e) {
            se.activeInstance == J && e.target.nodeType && !R.contains(e.target) && 100 < new Date() - r && ((r = new Date()), J._activeElm.focus());
        }
        function g(e, t) {
            function s(e) {
                r || e.target != R || ((i = !(r = !0)), (o = xe(e, "X")), (l = xe(e, "Y")));
            }
            function n(e) {
                r && !i && (9 < Math.abs(xe(e, "X") - o) || 9 < Math.abs(xe(e, "Y") - l)) && (i = !0);
            }
            if (J._isVisible) {
                if (L) k.appendTo(M);
                else if (Z.is("div") && !J._hasContent) Z.empty().append(k);
                else if (Z.hasClass("mbsc-control")) {
                    var a = Z.closest(".mbsc-control-w");
                    k.insertAfter(a), a.hasClass("mbsc-select") && a.addClass("mbsc-select-inline");
                } else k.insertAfter(Z);
                var i, r, o, l, c, u, d, p, h, m, f, b, v, g, y;
                if (((A = !0), J._markupInserted(k), B("onMarkupInserted", { target: $ }), L && z.closeOnOverlayTap))
                    it(R, "touchstart", s, { passive: !0 }),
                        it(R, "touchmove", n, { passive: !0 }),
                        T.on("mousedown", s)
                            .on("mousemove", n)
                            .on("touchcancel", function () {
                                r = !1;
                            })
                            .on("touchend click", function (e) {
                                r && !i && (J.cancel(), "touchend" == e.type && ot()), (r = !1);
                            });
                if (
                    (k
                        .on("mousedown", ".mbsc-btn-e,.mbsc-fr-btn-e", nt)
                        .on("keydown", ".mbsc-fr-btn-e", function (e) {
                            32 == e.keyCode && (e.preventDefault(), e.stopPropagation(), this.click());
                        })
                        .on("keydown", function (e) {
                            if (32 != e.keyCode || ct(e.target).is(St)) {
                                if (9 == e.keyCode && L && z.focusTrap) {
                                    var t = k.find('input,select,textarea,button,[tabindex="0"]').filter(function () {
                                            return 0 < this.offsetWidth || 0 < this.offsetHeight;
                                        }),
                                        s = t.index(ct(":focus", k)),
                                        n = t.length - 1,
                                        a = 0;
                                    e.shiftKey && ((n = 0), (a = -1)), s === n && (t.eq(a)[0].focus(), e.preventDefault());
                                }
                            } else e.preventDefault();
                        })
                        .on("touchend", ".mbsc-fr-btn-e", Q),
                    it($, "touchstart", K, { passive: !0 }),
                    it($, "mousedown", K),
                    it(
                        $,
                        "touchstart",
                        function () {
                            j || ((j = !0), M.find(".mbsc-no-touch").removeClass("mbsc-no-touch"));
                        },
                        { passive: !0, capture: !0 }
                    ),
                    ct.each(V, function (e, t) {
                        J.tap(
                            ct(".mbsc-fr-btn" + e, k),
                            function (e) {
                                (t = _e(t) ? J.buttons[t] : t), (_e(t.handler) ? J.handlers[t.handler] : t.handler).call(this, e, J);
                            },
                            !0
                        );
                    }),
                    J._attachEvents(k),
                    !1 !== J.position())
                )
                    (L || J._checkSize) &&
                        ((c = $),
                        (u = te),
                        (d = z.zone),
                        (y = 0),
                        window.ResizeObserver
                            ? ((Ke =
                                  Ke ||
                                  new ResizeObserver(function (e) {
                                      var t = e,
                                          s = Array.isArray(t),
                                          n = 0;
                                      for (t = s ? t : t[Symbol.iterator](); ; ) {
                                          var a;
                                          if (s) {
                                              if (n >= t.length) break;
                                              a = t[n++];
                                          } else {
                                              if ((n = t.next()).done) break;
                                              a = n.value;
                                          }
                                          a.target.__mbscResize();
                                      }
                                  })),
                              st++,
                              (c.__mbscResize = u),
                              Ke.observe(c))
                            : (((m = document.createElement("div")).innerHTML = tt),
                              (m.dir = "ltr"),
                              (v = m.childNodes[1]),
                              (p = m.childNodes[0]),
                              (h = p.childNodes[0]),
                              c.appendChild(m),
                              p.addEventListener("scroll", x),
                              v.addEventListener("scroll", x),
                              d
                                  ? d.runOutsideAngular(function () {
                                        pe(w);
                                    })
                                  : pe(w)),
                        (U = {
                            detach: function () {
                                Ke ? (st--, Ke.unobserve(c), st || (Ke = null)) : (c.removeChild(m), (g = !0));
                            },
                        })),
                        L &&
                            (k.removeClass("mbsc-fr-pos"),
                            P && !e
                                ? k
                                      .addClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + P)
                                      .on(ne, function e() {
                                          k
                                              .off(ne, e)
                                              .removeClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + P)
                                              .find(".mbsc-fr-popup")
                                              .removeClass("mbsc-anim-" + P),
                                              ee(t);
                                      })
                                      .find(".mbsc-fr-popup")
                                      .addClass("mbsc-anim-" + P)
                                : ee(t)),
                        B("onShow", { target: $, valueText: J._tempValue });
            }
            function _() {
                (h.style.width = "100000px"), (h.style.height = "100000px"), (p.scrollLeft = 1e5), (p.scrollTop = 1e5), (v.scrollLeft = 1e5), (v.scrollTop = 1e5);
            }
            function w() {
                var e = new Date();
                (f = 0), g || (200 < e - y && !p.scrollTop && !p.scrollLeft && ((y = e), _()), (f = f || pe(w)));
            }
            function x() {
                b = b || pe(C);
            }
            function C() {
                (b = 0), _(), u();
            }
        }
        function l(e, t) {
            J._isVisible || (e && e(), !1 !== J.show() && (wt = t));
        }
        function c() {
            J._fillValue(), B("onSet", { valueText: J._value });
        }
        function y() {
            B("onCancel", { valueText: J._value });
        }
        function _() {
            J.setVal(null, !0);
        }
        ke.call(this, s, n, !0),
            (J.position = function (e) {
                var t,
                    s,
                    n,
                    a,
                    i,
                    r,
                    o,
                    l,
                    c,
                    u,
                    d,
                    p,
                    h,
                    m,
                    f,
                    b,
                    v,
                    g,
                    y,
                    _ = {},
                    w = 0,
                    x = 0,
                    C = 0,
                    T = 0;
                if (!A) return !1;
                if (((b = X), (f = G), (h = Math.min($.offsetHeight, I ? 1 / 0 : window.innerHeight)), (m = Math.min($.offsetWidth, I ? 1 / 0 : window.innerWidth)) && h && (X !== m || G !== h || !e))) {
                    if (J._checkResp(m)) return !1;
                    if (
                        ((X = m),
                        (G = h),
                        J._isFullScreen || /top|bottom/.test(z.display) ? S.width(m) : L && N.width(""),
                        J._position(k),
                        !J._isFullScreen &&
                            /center|bubble/.test(z.display) &&
                            (ct(".mbsc-w-p", k).each(function () {
                                (v = this.getBoundingClientRect().width), (T += v), (C = C < v ? v : C);
                            }),
                            (p = m - 16 < T || !0 === z.tabs),
                            N.css({ width: J._isLiquid ? Math.min(z.maxPopupWidth, m - 16) : Math.ceil(p ? C : T), "white-space": p ? "" : "nowrap" })),
                        !1 !== B("onPosition", { target: $, popup: W, hasTabs: p, oldWidth: b, oldHeight: f, windowWidth: m, windowHeight: h }) && L)
                    )
                        return (
                            Y && ((w = O.scrollLeft()), (x = O.scrollTop()), X && D.css({ width: "", height: "" })),
                            (F = W.offsetWidth),
                            (H = W.offsetHeight),
                            (q = H <= h && F <= m),
                            "center" == z.display
                                ? ((y = Math.max(0, w + (m - F) / 2)), (g = Math.max(0, x + (h - H) / 2)))
                                : "bubble" == z.display
                                ? ((t = void 0 === z.anchor ? Z : ct(z.anchor)),
                                  (o = ct(".mbsc-fr-arr-i", k)[0]),
                                  (i = (a = t.offset()).top + (I ? x - M.offset().top : 0)),
                                  (r = a.left + (I ? w - M.offset().left : 0)),
                                  (s = t[0].offsetWidth),
                                  (n = t[0].offsetHeight),
                                  (l = o.offsetWidth),
                                  (c = o.offsetHeight),
                                  (y = we(r - (F - s) / 2, w + 3, w + m - F - 3)),
                                  x + h < (g = i + n + c / 2) + H + 8 && x < i - H - c / 2
                                      ? (S.removeClass("mbsc-fr-bubble-bottom").addClass("mbsc-fr-bubble-top"), (g = i - H - c / 2))
                                      : S.removeClass("mbsc-fr-bubble-top").addClass("mbsc-fr-bubble-bottom"),
                                  ct(".mbsc-fr-arr", k).css({ left: we(r + s / 2 - (y + (F - l) / 2), 0, l) }),
                                  (q = x < g && w < y && g + H <= x + h && y + F <= w + m))
                                : ((y = w), (g = "top" == z.display ? x : Math.max(0, x + h - H))),
                            Y &&
                                ((u = Math.max(g + H, I ? E.scrollHeight : ct(document).height())),
                                (d = Math.max(y + F, I ? E.scrollWidth : ct(document).width())),
                                D.css({ width: d, height: u }),
                                z.scroll && "bubble" == z.display && (x + h < g + H + 8 || x + h < i || i + n < x) && O.scrollTop(Math.min(i, g + H - h + 8, u - h))),
                            (_.top = Math.floor(g)),
                            (_.left = Math.floor(y)),
                            S.css(_),
                            !0
                        );
                }
            }),
            (J.attachShow = function (e, t) {
                var s,
                    n = ct(e).off(".mbsc"),
                    a = n.prop("readonly");
                ae(n),
                    "inline" !== z.display &&
                        ((z.showOnFocus || z.showOnTap) &&
                            n.is("input,select") &&
                            (n
                                .prop("readonly", !0)
                                .on("mousedown.mbsc", function (e) {
                                    e.preventDefault();
                                })
                                .on("focus.mbsc", function () {
                                    J._isVisible && this.blur();
                                }),
                            (s = ct('label[for="' + n.attr("id") + '"]')).length || (s = n.closest("label"))),
                        n.is("select") ||
                            (z.showOnFocus &&
                                n.on("focus.mbsc", function () {
                                    xt ? (xt = !1) : l(t, n);
                                }),
                            z.showOnTap &&
                                (n.on("keydown.mbsc", function (e) {
                                    (32 != e.keyCode && 13 != e.keyCode) || (e.preventDefault(), e.stopPropagation(), l(t, n));
                                }),
                                J.tap(n, function (e) {
                                    e.isMbscTap && (j = !0), l(t, n);
                                }),
                                s &&
                                    s.length &&
                                    J.tap(s, function (e) {
                                        e.preventDefault(), e.target !== n[0] && l(t, n);
                                    }))),
                        i.push({ readOnly: a, el: n, lbl: s }));
            }),
            (J.select = function () {
                L ? J.hide(!1, "set", !1, c) : c();
            }),
            (J.cancel = function () {
                L ? J.hide(!1, "cancel", !1, y) : y();
            }),
            (J.clear = function () {
                J._clearValue(), B("onClear"), L && J._isVisible && !J.live ? J.hide(!1, "clear", !1, _) : _();
            }),
            (J.enable = function () {
                (z.disabled = !1),
                    ct.each(i, function (e, t) {
                        t.el.is("input,select") && (t.el[0].disabled = !1);
                    });
            }),
            (J.disable = function () {
                (z.disabled = !0),
                    ct.each(i, function (e, t) {
                        t.el.is("input,select") && (t.el[0].disabled = !0);
                    });
            }),
            (J.show = function (e, t) {
                var s, n, a, i;
                if (!z.disabled && !J._isVisible) {
                    if ((J._readValue(), !1 === B("onBeforeShow"))) return !1;
                    if (
                        ((wt = null),
                        (P = z.animate),
                        (V = z.buttons || []),
                        (Y = I || "bubble" == z.display),
                        (h = Tt && !Y && z.scrollLock),
                        (s = 0 < V.length),
                        !1 !== P && ("top" == z.display ? (P = P || "slidedown") : "bottom" == z.display ? (P = P || "slideup") : ("center" != z.display && "bubble" != z.display) || (P = P || "pop")),
                        L &&
                            ((G = X = 0),
                            h && !d.hasClass("mbsc-fr-lock-ios") && ((E.mbscScrollTop = i = Math.max(0, O.scrollTop())), (E.mbscScrollLeft = a = Math.max(0, O.scrollLeft())), M.css({ top: -i + "px", left: -a + "px" })),
                            d.addClass((z.scrollLock ? "mbsc-fr-lock" : "") + (h ? " mbsc-fr-lock-ios" : "") + (I ? " mbsc-fr-lock-ctx" : "")),
                            ct(document.activeElement).is("input,textarea") && document.activeElement.blur(),
                            (m = se.activeInstance),
                            (se.activeInstance = J),
                            (E.mbscModals = (E.mbscModals || 0) + 1),
                            h && (E.mbscIOSLock = (E.mbscIOSLock || 0) + 1),
                            z.scrollLock && (E.mbscLock = (E.mbscLock || 0) + 1)),
                        (n =
                            '<div lang="' +
                            z.lang +
                            '" class="mbsc-fr mbsc-' +
                            z.theme +
                            (z.baseTheme ? " mbsc-" + z.baseTheme : "") +
                            " mbsc-fr-" +
                            z.display +
                            " " +
                            (z.cssClass || "") +
                            " " +
                            (z.compClass || "") +
                            (J._isLiquid ? " mbsc-fr-liq" : "") +
                            (L ? " mbsc-fr-pos" + (z.showOverlay ? "" : " mbsc-fr-no-overlay") : "") +
                            (p ? " mbsc-fr-pointer" : "") +
                            (Dt ? " mbsc-fr-hb" : "") +
                            (j ? "" : " mbsc-no-touch") +
                            (h ? " mbsc-platform-ios" : "") +
                            (s ? (3 <= V.length ? " mbsc-fr-btn-block " : "") : " mbsc-fr-nobtn") +
                            '">' +
                            (L ? '<div class="mbsc-fr-persp">' + (z.showOverlay ? '<div class="mbsc-fr-overlay"></div>' : "") + '<div role="dialog" class="mbsc-fr-scroll">' : "") +
                            '<div class="mbsc-fr-popup' +
                            (z.rtl ? " mbsc-rtl" : " mbsc-ltr") +
                            (z.headerText ? " mbsc-fr-has-hdr" : "") +
                            '">' +
                            ("bubble" === z.display ? '<div class="mbsc-fr-arr-w"><div class="mbsc-fr-arr-i"><div class="mbsc-fr-arr"></div></div></div>' : "") +
                            (L ? '<div class="mbsc-fr-focus" tabindex="-1"></div>' : "") +
                            '<div class="mbsc-fr-w">' +
                            (z.headerText ? '<div class="mbsc-fr-hdr">' + (_e(z.headerText) ? z.headerText : "") + "</div>" : "") +
                            '<div class="mbsc-fr-c">'),
                        (n += J._generateContent()),
                        (n += "</div>"),
                        s)
                    ) {
                        var r,
                            o,
                            l,
                            c = V.length;
                        for (n += '<div class="mbsc-fr-btn-cont">', o = 0; o < V.length; o++)
                            (l = z.btnReverse ? c - o - 1 : o),
                                "set" === (r = _e((r = V[l])) ? J.buttons[r] : r).handler && (r.parentClass = "mbsc-fr-btn-s"),
                                "cancel" === r.handler && (r.parentClass = "mbsc-fr-btn-c"),
                                (n +=
                                    "<div" +
                                    (z.btnWidth ? ' style="width:' + 100 / V.length + '%"' : "") +
                                    ' class="mbsc-fr-btn-w ' +
                                    (r.parentClass || "") +
                                    '"><div tabindex="0" role="button" class="mbsc-fr-btn' +
                                    l +
                                    " mbsc-fr-btn-e " +
                                    (void 0 === r.cssClass ? z.btnClass : r.cssClass) +
                                    (r.icon ? " mbsc-ic mbsc-ic-" + r.icon : "") +
                                    '">' +
                                    (r.text || "") +
                                    "</div></div>");
                        n += "</div>";
                    }
                    (k = ct((n += "</div></div></div></div>" + (L ? "</div></div>" : "")))),
                        (D = ct(".mbsc-fr-persp", k)),
                        (T = ct(".mbsc-fr-scroll", k)),
                        (N = ct(".mbsc-fr-w", k)),
                        (S = ct(".mbsc-fr-popup", k)),
                        (u = ct(".mbsc-fr-hdr", k)),
                        ($ = k[0]),
                        (R = T[0]),
                        (W = S[0]),
                        (J._activeElm = ct(".mbsc-fr-focus", k)[0]),
                        (J._markup = k),
                        (J._isVisible = !0),
                        (J.markup = $),
                        J._markupReady(k),
                        B("onMarkupReady", { target: $ }),
                        L &&
                            (ct(window).on("keydown", b),
                            z.scrollLock && (it(document, "touchmove", f, { passive: !1 }), it(document, "mousewheel", f, { passive: !1 }), it(document, "wheel", f, { passive: !1 })),
                            z.focusTrap && O.on("focusin", v)),
                        L
                            ? setTimeout(
                                  function () {
                                      g(e, t);
                                  },
                                  h ? 100 : 0
                              )
                            : g(e, t);
                }
            }),
            (J.hide = function (t, e, s, n) {
                if (!J._isVisible || (!s && !J._isValid && "set" == e) || (!s && !1 === B("onBeforeClose", { valueText: J._tempValue, button: e }))) return !1;
                (J._isVisible = !1),
                    U && (U.detach(), (U = null)),
                    L &&
                        (ct(document.activeElement).is("input,textarea") && W.contains(document.activeElement) && document.activeElement.blur(),
                        se.activeInstance == J && (se.activeInstance = m),
                        ct(window).off("keydown", b),
                        O.off("focusin", v),
                        be(document, "touchmove", f, { passive: !1 }),
                        be(document, "mousewheel", f, { passive: !1 }),
                        be(document, "wheel", f, { passive: !1 })),
                    k &&
                        (L && P && !t
                            ? k
                                  .addClass("mbsc-anim-out mbsc-anim-trans mbsc-anim-trans-" + P)
                                  .on(ne, function e() {
                                      k.off(ne, e), o(t);
                                  })
                                  .find(".mbsc-fr-popup")
                                  .addClass("mbsc-anim-" + P)
                            : o(t),
                        J._detachEvents(k)),
                    n && n(),
                    Z.trigger("blur"),
                    B("onClose", { valueText: J._value });
            }),
            (J.isVisible = function () {
                return J._isVisible;
            }),
            (J.setVal = rt),
            (J.getVal = rt),
            (J._generateContent = rt),
            (J._attachEvents = rt),
            (J._detachEvents = rt),
            (J._readValue = rt),
            (J._clearValue = rt),
            (J._fillValue = rt),
            (J._markupReady = rt),
            (J._markupInserted = rt),
            (J._markupRemove = rt),
            (J._position = rt),
            (J.__processSettings = rt),
            (J.__init = rt),
            (J.__destroy = rt),
            (J._destroy = function () {
                J.hide(!0, !1, !0),
                    Z.off(".mbsc"),
                    ae(Z),
                    ct.each(i, function (e, t) {
                        t.el.off(".mbsc").prop("readonly", t.readOnly), ae(t.el), t.lbl && (t.lbl.off(".mbsc"), ae(t.lbl));
                    }),
                    J.__destroy();
            }),
            (J._updateHeader = function () {
                var e = z.headerText,
                    t = e ? ("function" == typeof e ? e.call(s, J._tempValue) : e.replace(/\{value\}/i, J._tempValue)) : "";
                u.html(t || "&nbsp;");
            }),
            (J._getRespCont = function () {
                return (I = "body" != z.context), (O = ct(I ? z.context : window)), "inline" == z.display ? (Z.is("div") ? Z : Z.parent()) : O;
            }),
            (J._processSettings = function (e) {
                var t, s;
                for (
                    J.__processSettings(e),
                        (p = !z.touchUi) && ((z.display = e.display || n.display || "bubble"), (z.buttons = e.buttons || n.buttons || []), (z.showOverlay = e.showOverlay || n.showOverlay || !1)),
                        z.buttons = z.buttons || ("inline" !== z.display ? ["cancel", "set"] : []),
                        z.headerText = void 0 === z.headerText ? "inline" !== z.display && "{value}" : z.headerText,
                        V = z.buttons || [],
                        L = "inline" !== z.display,
                        M = ct(z.context),
                        d = I ? M : ct("body,html"),
                        E = M[0],
                        J.live = !0,
                        s = 0;
                    s < V.length;
                    s++
                )
                    ("ok" != (t = V[s]) && "set" != t && "set" != t.handler) || (J.live = !1);
                (J.buttons.set = { text: z.setText, icon: z.setIcon, handler: "set" }),
                    (J.buttons.cancel = { text: z.cancelText, icon: z.cancelIcon, handler: "cancel" }),
                    (J.buttons.close = { text: z.closeText, icon: z.closeIcon, handler: "cancel" }),
                    (J.buttons.clear = { text: z.clearText, icon: z.clearIcon, handler: "clear" }),
                    (J._isInput = Z.is("input"));
            }),
            (J._init = function (e) {
                var t = J._isVisible,
                    s = t && !k.hasClass("mbsc-fr-pos");
                t && J.hide(!0, !1, !0),
                    Z.off(".mbsc"),
                    ae(Z),
                    J.__init(e),
                    (J._isLiquid = "liquid" == z.layout),
                    L ? (J._readValue(), J._hasContent || z.skipShow || J.attachShow(Z), t && J.show(s)) : J.show(),
                    Z.removeClass("mbsc-cloak")
                        .filter("input, select, textarea")
                        .on("change.mbsc", function () {
                            J._preventChange || J.setVal(Z.val(), !0, !1), (J._preventChange = !1);
                        });
            }),
            (J.buttons = {}),
            (J.handlers = { set: J.select, cancel: J.cancel, clear: J.clear }),
            (J._value = null),
            (J._isValid = !0),
            (J._isVisible = !1),
            (z = J.settings),
            (B = J.trigger),
            e || J.init();
    }
    var wt,
        xt,
        Ct = se.themes,
        Tt = /(iphone|ipod)/i.test(p) && 7 <= n,
        Mt = "android" == t,
        kt = "ios" == t,
        Dt = kt && 7 < n,
        St = "input,select,textarea,button";
    (_t.prototype._defaults = {
        lang: "en",
        setText: "Set",
        selectedText: "{count} selected",
        closeText: "Close",
        cancelText: "Cancel",
        clearText: "Clear",
        context: "body",
        maxPopupWidth: 600,
        disabled: !1,
        closeOnOverlayTap: !0,
        showOnFocus: Mt || kt,
        showOnTap: !0,
        display: "center",
        scroll: !0,
        scrollLock: !0,
        showOverlay: !0,
        tap: !0,
        touchUi: !0,
        btnClass: "mbsc-fr-btn",
        btnWidth: !0,
        focusTrap: !0,
        focusOnClose: !(kt && 8 == n),
    }),
        (Ce.Frame = _t),
        (Ct.frame.mobiscroll = { headerText: !1, btnWidth: !1 }),
        (Ct.scroller.mobiscroll = ut({}, Ct.frame.mobiscroll, {
            rows: 5,
            showLabel: !1,
            selectedLineBorder: 1,
            weekDays: "min",
            checkIcon: "ion-ios7-checkmark-empty",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        })),
        u &&
            ct(window).on("focus", function () {
                wt && (xt = !0);
            });
    function Ot(a, e, t) {
        var n,
            s,
            i,
            r,
            c,
            o,
            l,
            u,
            d,
            p,
            h,
            m,
            f,
            b,
            v,
            g,
            y,
            _,
            w,
            x,
            C,
            T,
            M,
            k,
            D,
            S,
            O,
            N,
            V,
            E,
            P,
            I,
            L,
            A,
            $,
            F,
            H,
            Y,
            U,
            R,
            W,
            z,
            q,
            j,
            B,
            X = this,
            G = 0,
            J = 1,
            Z = e,
            K = ct(a);
        function Q(e) {
            q("onStart", { domEvent: e }),
                Z.stopProp && e.stopPropagation(),
                Z.prevDef && "mousedown" == e.type && e.preventDefault(),
                Z.readonly ||
                    (Z.lock && C) ||
                    (me(e, this) &&
                        !x &&
                        (n && n.removeClass("mbsc-active"),
                        (v = !1),
                        C ||
                            ((n = ct(e.target).closest(".mbsc-btn-e", this)).length &&
                                !n.hasClass("mbsc-disabled") &&
                                ((v = !0),
                                (r = setTimeout(function () {
                                    n.addClass("mbsc-active");
                                }, 100)))),
                        (T = V = !(x = !0)),
                        (X.scrolled = C),
                        (H = xe(e, "X")),
                        (Y = xe(e, "Y")),
                        (m = H),
                        (u = l = o = 0),
                        (F = new Date()),
                        ($ = +fe(R, j) || 0),
                        C && de($, Nt ? 0 : 1),
                        "mousedown" === e.type && ct(document).on("mousemove", ee).on("mouseup", se)));
        }
        function ee(e) {
            x &&
                (Z.stopProp && e.stopPropagation(),
                (m = xe(e, "X")),
                (f = xe(e, "Y")),
                (o = m - H),
                (l = f - Y),
                (u = j ? l : o),
                v && (Math.abs(l) > Z.thresholdY || Math.abs(o) > Z.thresholdX) && (clearTimeout(r), n.removeClass("mbsc-active"), (v = !1)),
                (X.scrolled || (!T && Math.abs(u) > z)) && (V || q("onGestureStart", b), (X.scrolled = V = !0), k || ((k = !0), (M = pe(te)))),
                j || Z.scrollLock ? e.preventDefault() : X.scrolled ? e.preventDefault() : 7 < Math.abs(l) && ((T = !0), (X.scrolled = !0), se()));
        }
        function te() {
            _ && (u = we(u, -L * _, L * _)), de(we($ + u, w - h, y + h)), (k = !1);
        }
        function se(e) {
            if (x) {
                var t,
                    s = new Date() - F;
                Z.stopProp && e && e.stopPropagation(),
                    he(M),
                    (k = !1),
                    !T && X.scrolled && (Z.momentum && s < 300 && ((t = u / s), (u = Math.max(Math.abs(u), (t * t) / Z.speedUnit) * (u < 0 ? -1 : 1))), ue(u)),
                    v &&
                        (clearTimeout(r),
                        n.addClass("mbsc-active"),
                        setTimeout(function () {
                            n.removeClass("mbsc-active");
                        }, 100),
                        T || X.scrolled || q("onBtnTap", { target: n[0], domEvent: e })),
                    e && "mouseup" == e.type && ct(document).off("mousemove", ee).off("mouseup", se),
                    (x = !1);
            }
        }
        function ne(e) {
            X.scrolled && ((X.scrolled = !1), e.stopPropagation(), e.preventDefault());
        }
        function ae(e) {
            if (a.contains(e.target) && ((e = e.originalEvent || e), (u = j ? (null == e.deltaY ? e.wheelDelta || e.detail : e.deltaY) : e.deltaX), q("onStart", { domEvent: e }), Z.stopProp && e.stopPropagation(), u)) {
                if ((e.preventDefault(), e.deltaMode && 1 == e.deltaMode && (u *= 15), (u = we(-u, -P, P)), ($ = B), Z.readonly)) return;
                if ((V || ce(), $ + u < w && (($ = w), (u = 0)), y < $ + u && (($ = y), (u = 0)), k || ((k = !0), (M = pe(te))), !u && V)) return;
                (V = !0),
                    clearTimeout(E),
                    (E = setTimeout(function () {
                        he(M), (V = k = !1), ue(u);
                    }, 200));
            }
        }
        function ie(e) {
            q("onStart", { domEvent: e }), Z.readonly || (e.stopPropagation(), ($ = B), (V = !1), e.target == D ? ((Y = xe(e, "Y", !0)), ct(document).on("mousemove", re).on("mouseup", oe)) : ((Y = s.offset().top), re(e), oe()));
        }
        function re(e) {
            var t = (xe(e, "Y", !0) - Y) / c;
            (u = g ? we((u = -(_ * L * 2 + c) * t), -L * _, L * _) : (w - y - c) * t), V || ce(), (V = !0), de(we($ + u, w - h, y + h));
        }
        function oe() {
            ($ = B), ue(0), ct(document).off("mousemove", re).off("mouseup", oe);
        }
        function le(e) {
            e.stopPropagation();
        }
        function ce() {
            q("onGestureStart", (b = { posX: j ? 0 : B, posY: j ? B : 0, originX: j ? 0 : $, originY: j ? $ : 0, direction: 0 < u ? (j ? 270 : 360) : j ? 90 : 180 }));
        }
        function ue(e) {
            var t, s, n;
            if ((_ && (e = we(e, -L * _, L * _)), (n = we(Math.round(($ + e) / L) * L, w, y)), A)) {
                if (e < 0) {
                    for (t = A.length - 1; 0 <= t; t--)
                        if (Math.abs(n) + c >= A[t].breakpoint) {
                            (J = 2), (n = A[(G = t)].snap2);
                            break;
                        }
                } else if (0 <= e)
                    for (t = 0; t < A.length; t++)
                        if (Math.abs(n) <= A[t].breakpoint) {
                            (J = 1), (n = A[(G = t)].snap1);
                            break;
                        }
                n = we(n, w, y);
            }
            (s = Z.time || (B < w || y < B ? 1e3 : Math.max(1e3, Math.abs(n - B) * Z.timeUnit))), (b.destinationX = j ? 0 : n), (b.destinationY = j ? n : 0), (b.duration = s), (b.transitionTiming = p), q("onGestureEnd", b), X.scroll(n, s);
        }
        function de(t, e, s, n) {
            function a() {
                clearInterval(I), clearTimeout(W), (C = !1), (B = t), (b.posX = j ? 0 : t), (b.posY = j ? t : 0), r && q("onMove", b), o && q("onAnimationEnd", b), n && n();
            }
            var i,
                r = t != B,
                o = 1 < e,
                l = e ? ve + "transform " + Math.round(e) + "ms " + p : "";
            (b = { posX: j ? 0 : B, posY: j ? B : 0, originX: j ? 0 : $, originY: j ? $ : 0, direction: 0 < t - B ? (j ? 270 : 360) : j ? 90 : 180 }),
                (B = t),
                o && ((b.destinationX = j ? 0 : t), (b.destinationY = j ? t : 0), (b.duration = e), (b.transitionTiming = p), q("onAnimationStart", b)),
                (U[ge + "Transition"] = l),
                (U[ge + "Transform"] = "translate3d(" + (j ? "0," + t + "px," : t + "px,0,") + "0)"),
                D && S && ((i = g ? (O - t) / (_ * L * 2) : (t - y) / (w - y)), (D.style[ge + "Transition"] = l), (D.style[ge + "Transform"] = "translate3d(0," + Math.max(0, Math.min((c - S) * i, c - S)) + "px,0)")),
                (!r && !C) || !e || e <= 1
                    ? a()
                    : e &&
                      ((C = !s),
                      clearInterval(I),
                      (I = setInterval(function () {
                          var e = +fe(R, j) || 0;
                          (b.posX = j ? 0 : e), (b.posY = j ? e : 0), q("onMove", b), Math.abs(e - t) < 2 && a();
                      }, 100)),
                      clearTimeout(W),
                      (W = setTimeout(function () {
                          a();
                      }, e))),
                Z.sync && Z.sync(t, e, p);
        }
        ke.call(this, a, e, !0),
            (X.scrolled = !1),
            (X.scroll = function (e, t, s, n) {
                (e = we((e = ye(e) ? Math.round(e / L) * L : Math.ceil((ct(e, a).length ? Math.round(R.offset()[d] - ct(e, a).offset()[d]) : B) / L) * L), w, y)), (G = Math.round(e / L)), ($ = B), (O = _ * L + e), de(e, t, s, n);
            }),
            (X.refresh = function (e) {
                var t;
                for (
                    c = (void 0 === Z.contSize ? (j ? K.height() : K.width()) : Z.contSize) || 0,
                        y = (void 0 === Z.maxScroll ? 0 : Z.maxScroll) || 0,
                        w = Math.min(y, void 0 === Z.minScroll ? Math.min(0, j ? c - R.height() : c - R.width()) : Z.minScroll) || 0,
                        A = null,
                        !j && Z.rtl && ((t = y), (y = -w), (w = -t)),
                        _e(Z.snap) &&
                            ((A = []),
                            R.find(Z.snap).each(function () {
                                var e = j ? this.offsetTop : this.offsetLeft,
                                    t = j ? this.offsetHeight : this.offsetWidth;
                                A.push({ breakpoint: e + t / 2, snap1: -e, snap2: c - e - t });
                            })),
                        L = ye(Z.snap) ? Z.snap : 1,
                        _ = Z.snap ? Z.maxSnapScroll : 0,
                        p = Z.easing,
                        h = Z.elastic ? (ye(Z.snap) ? L : ye(Z.elastic) ? Z.elastic : 0) : 0,
                        P = L;
                    44 < P;

                )
                    P /= 2;
                (P = Math.round(44 / P) * P),
                    D && ((g = w == -1 / 0 || y == 1 / 0), (S = w < y ? Math.max(20, (c * c) / (y - w + c)) : 0), (D.style.height = S + "px"), (N.style.height = S ? "" : 0)),
                    void 0 === B && ((B = Z.initialPos), (G = Math.round(B / L))),
                    e || X.scroll(Z.snap ? (A && A[G] ? A[G]["snap" + J] : G * L) : B);
            }),
            (X._processSettings = function () {
                (j = "Y" == Z.axis),
                    (d = j ? "top" : "left"),
                    (R = Z.moveElement || K.children().eq(0)),
                    (U = R[0].style),
                    (z = j ? Z.thresholdY : Z.thresholdX),
                    Z.scrollbar && ((i = Z.scrollbar), (s = i.find(".mbsc-sc-bar")), (D = s[0]), (N = i[0]));
            }),
            (X._init = function () {
                X.refresh(),
                    it(a, "mousedown", Q),
                    it(a, "touchstart", Q, { passive: !0 }),
                    it(a, "touchend", se),
                    it(a, "touchcancel", se),
                    it(a, "click", ne, !0),
                    it(document, "touchmove", ee, { passive: !1 }),
                    Z.mousewheel && (it(document, "wheel", ae, { passive: !1, capture: !0 }), it(document, "mousewheel", ae, { passive: !1, capture: !0 })),
                    D && i.on("mousedown", ie).on("click", le);
            }),
            (X._destroy = function () {
                clearInterval(I),
                    be(a, "mousedown", Q),
                    be(a, "touchstart", Q, { passive: !0 }),
                    be(a, "touchend", se),
                    be(a, "touchcancel", se),
                    be(a, "click", ne, !0),
                    be(document, "touchmove", ee, { passive: !1 }),
                    be(document, "wheel", ae, { passive: !1, capture: !0 }),
                    be(document, "mousewheel", ae, { passive: !1, capture: !0 }),
                    D && i.off("mousedown", ie).off("click", le);
            }),
            (Z = X.settings),
            (q = X.trigger),
            t || X.init();
    }
    var Nt = "ios" == t;
    Ot.prototype = { _defaults: { speedUnit: 0.0022, timeUnit: 3, initialPos: 0, axis: "Y", thresholdX: 10, thresholdY: 5, easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)", stopProp: !0, momentum: !0, mousewheel: !0, elastic: !0 } };
    var Vt = {},
        Et = u ? window.CSS : null,
        Pt = Et && Et.supports && Et.supports("(transform-style: preserve-3d)");
    function It(e) {
        return (e + "").replace('"', "___");
    }
    function Lt(f, t, e) {
        var s,
            p,
            g,
            b,
            y,
            c,
            a,
            _,
            w,
            u,
            d,
            v,
            x,
            C,
            T,
            M,
            r,
            k = 40,
            D = 1e3,
            S = this,
            o = ct(f);
        function n(e) {
            var t,
                s,
                n = +ct(this).attr("data-index");
            38 == e.keyCode ? ((t = !0), (s = -1)) : 40 == e.keyCode ? ((t = !0), (s = 1)) : 32 == e.keyCode && ((t = !0), l(n, ct(e.target))), t && (e.stopPropagation(), e.preventDefault(), s && a.start(n, s, e));
        }
        function i() {
            a.stop();
        }
        function l(e, t) {
            var s = M[e],
                n = +t.attr("data-index"),
                a = E(s, n),
                i = S._tempSelected[e],
                r = ye(s.multiple) ? s.multiple : 1 / 0;
            !1 === C("onItemTap", { target: t[0], index: e, value: a, selected: t.hasClass("mbsc-sc-itm-sel") }) ||
                S._prevItemTap ||
                (s.multiple &&
                    !s._disabled[a] &&
                    (void 0 !== i[a]
                        ? (t.removeClass(y).removeAttr("aria-selected"), delete i[a])
                        : (1 == r && ((S._tempSelected[e] = i = {}), s._$markup.find(".mbsc-sc-itm-sel").removeClass(y).removeAttr("aria-selected")), B(i).length < r && (t.addClass(y).attr("aria-selected", "true"), (i[a] = a)))),
                H(s, e, n, D, s._index < n ? 1 : 2, !0, s.multiple),
                S.live &&
                    (!s.multiple || (1 === s.multiple && x.tapSelect)) &&
                    (!0 === x.setOnTap || x.setOnTap[e]) &&
                    setTimeout(
                        function () {
                            S.select();
                        },
                        x.tapSelect ? 0 : 200
                    )),
                (S._prevItemTap = !1);
        }
        function h(e) {
            return -(e.max - e._offset - (e.multiple && !b ? Math.floor(x.rows / 2) : 0)) * w;
        }
        function m(e) {
            return -(e.min - e._offset + (e.multiple && !b ? Math.floor(x.rows / 2) : 0)) * w;
        }
        function O(e, t) {
            return (e._array ? e._map[t] : +e.getIndex(t, S)) || 0;
        }
        function N(e, t) {
            var s = e.data;
            if (t >= e.min && t <= e.max) return e._array ? (e.circular ? ct(s).get(t % e._length) : s[t]) : ct.isFunction(s) ? s(t, S) : "";
        }
        function V(e) {
            return ct.isPlainObject(e) ? (void 0 !== e.value ? e.value : e.display) : e;
        }
        function E(e, t) {
            return V(N(e, t));
        }
        function P(e, t, s) {
            var n = M[e];
            H(n, e, n._index + t, x.delay + 100, 1 == t ? 1 : 2, !1, !1, "keydown" == s.type);
        }
        function I(e) {
            return ct.isArray(x.readonly) ? x.readonly[e] : x.readonly;
        }
        function L(e, t, s) {
            var n = ut(M[t] || {}, e),
                a = n._index - n._batch;
            return (
                (n.data = n.data || []),
                (n.key = void 0 !== n.key ? n.key : t),
                (n.label = void 0 !== n.label ? n.label : t),
                (n._map = {}),
                (n._array = ct.isArray(n.data)),
                n._array &&
                    ((n._length = n.data.length),
                    ct.each(n.data, function (e, t) {
                        n._map[V(t)] = e;
                    })),
                (n.circular = void 0 === x.circular ? (void 0 === n.circular ? n._array && n._length > x.rows : n.circular) : ct.isArray(x.circular) ? x.circular[t] : x.circular),
                (n.min = n._array ? (n.circular ? -1 / 0 : 0) : void 0 === n.min ? -1 / 0 : n.min),
                (n.max = n._array ? (n.circular ? 1 / 0 : n._length - 1) : void 0 === n.max ? 1 / 0 : n.max),
                (n._nr = t),
                (n._index = O(n, _[t])),
                (n._disabled = {}),
                (n._batch = 0),
                (n._current = n._index),
                (n._first = n._index - k),
                (n._last = n._index + k),
                (n._offset = n._first),
                s ? ((n._offset -= n._margin / w + (n._index - a)), (n._margin += (n._index - a) * w)) : (n._margin = 0),
                (n._refresh = function (e) {
                    ut(n._scroller.settings, { minScroll: h(n), maxScroll: m(n) }), n._scroller.refresh(e);
                }),
                (r[n.key] = n)
            );
        }
        function A(e, t, s, n, a) {
            var i,
                r,
                o,
                l,
                c,
                u,
                d,
                p,
                h,
                m,
                f = "",
                b = S._tempSelected[t],
                v = e._disabled || {};
            for (i = s; i <= n; i++)
                (o = N(e, i)),
                    (h = o),
                    (c = void 0 === (m = ct.isPlainObject(h) ? h.display : h) ? "" : m),
                    (l = V(o)),
                    (r = o && void 0 !== o.cssClass ? o.cssClass : ""),
                    (u = o && void 0 !== o.label ? o.label : ""),
                    (d = o && o.invalid),
                    (p = void 0 !== l && l == _[t] && !e.multiple),
                    (f +=
                        '<div role="option" tabindex="-1" aria-selected="' +
                        !!b[l] +
                        '" class="mbsc-sc-itm ' +
                        (a ? "mbsc-sc-itm-3d " : "") +
                        r +
                        " " +
                        (p ? "mbsc-sc-itm-sel " : "") +
                        (b[l] ? y : "") +
                        (void 0 === l ? " mbsc-sc-itm-ph" : " mbsc-btn-e") +
                        (d ? " mbsc-sc-itm-inv-h mbsc-disabled" : "") +
                        (v[l] ? " mbsc-sc-itm-inv mbsc-disabled" : "") +
                        '" data-index="' +
                        i +
                        '" data-val="' +
                        It(l) +
                        '"' +
                        (u ? ' aria-label="' + u + '"' : "") +
                        (p ? ' aria-selected="true"' : "") +
                        ' style="height:' +
                        w +
                        "px;line-height:" +
                        w +
                        "px;" +
                        (a ? ve + "transform:rotateX(" + (((e._offset - i) * g) % 360) + "deg) translateZ(" + (w * x.rows) / 2 + "px);" : "") +
                        '">' +
                        (1 < T ? '<div class="mbsc-sc-itm-ml" style="line-height:' + Math.round(w / T) + "px;font-size:" + Math.round((w / T) * 0.8) + 'px;">' : "") +
                        c +
                        (1 < T ? "</div>" : "") +
                        "</div>");
            return f;
        }
        function $(e, t, s, n) {
            var a,
                i = M[e],
                r = n || i._disabled,
                o = O(i, t),
                l = E(i, o),
                c = l,
                u = l,
                d = 0,
                p = 0;
            if (!0 === r[l]) {
                for (a = 0; o - d >= i.min && r[c] && a < 100; ) a++, (c = E(i, o - ++d));
                for (a = 0; o + p < i.max && r[u] && a < 100; ) a++, (u = E(i, o + ++p));
                l = ((p < d && p && 2 !== s) || !d || o - d < 0 || 1 == s) && !r[u] ? u : c;
            }
            return l;
        }
        function F(n, a, i, e, r, t, o) {
            var l,
                c,
                u,
                d,
                s,
                p,
                h,
                m = S._isVisible;
            (v = !0),
                (d = x.validate.call(f, { values: _.slice(0), index: a, direction: i }, S) || {}),
                (v = !1),
                d.valid && (S._tempWheelArray = _ = d.valid.slice(0)),
                t ||
                    ct.each(M, function (e, s) {
                        if (
                            (m && s._$markup.find(".mbsc-sc-itm-inv").removeClass("mbsc-sc-itm-inv mbsc-disabled"),
                            (s._disabled = {}),
                            d.disabled &&
                                d.disabled[e] &&
                                ct.each(d.disabled[e], function (e, t) {
                                    (s._disabled[t] = !0), m && s._$markup.find('.mbsc-sc-itm[data-val="' + It(t) + '"]').addClass("mbsc-sc-itm-inv mbsc-disabled");
                                }),
                            (_[e] = s.multiple ? _[e] : $(e, _[e], i)),
                            m)
                        ) {
                            if (
                                ((s.multiple && void 0 !== a) || s._$markup.find(".mbsc-sc-itm-sel").removeClass(y).removeAttr("aria-selected"),
                                (c = O(s, _[e])),
                                (l = c - s._index + s._batch),
                                Math.abs(l) > 2 * k + 1 && ((u = l + (2 * k + 1) * (0 < l ? -1 : 1)), (s._offset += u), (s._margin -= u * w), s._refresh()),
                                (s._index = c + s._batch),
                                s.multiple)
                            ) {
                                if (void 0 === a)
                                    for (var t in S._tempSelected[e])
                                        s._$markup
                                            .find('.mbsc-sc-itm[data-val="' + It(t) + '"]')
                                            .addClass(y)
                                            .attr("aria-selected", "true");
                            } else
                                s._$markup
                                    .find('.mbsc-sc-itm[data-val="' + It(_[e]) + '"]')
                                    .addClass("mbsc-sc-itm-sel")
                                    .attr("aria-selected", "true");
                            s._$active && s._$active.attr("tabindex", -1),
                                (s._$active = s._$markup
                                    .find('.mbsc-sc-itm[data-index="' + s._index + '"]')
                                    .eq(b && s.multiple ? 1 : 0)
                                    .attr("tabindex", 0)),
                                o && a === e && s._$active.length && (s._$active[0].focus(), s._$scroller.parent().scrollTop(0)),
                                s._scroller.scroll(-(c - s._offset + s._batch) * w, a === e || void 0 === a ? n : D, r);
                        }
                    }),
                C("onValidated", { index: a, time: n }),
                (S._tempValue = x.formatValue.call(f, _, S)),
                m && S._updateHeader(),
                S.live && ((p = t), (h = M[(s = a)]) && (!h.multiple || (1 !== h.multiple && p && (!0 === x.setOnTap || x.setOnTap[s])))) && ((S._hasValue = e || S._hasValue), Y(e, e, 0, !0), e && C("onSet", { valueText: S._value })),
                e && C("onChange", { index: a, valueText: S._tempValue });
        }
        function H(e, t, s, n, a, i, r, o) {
            var l = E(e, s);
            void 0 !== l &&
                ((_[t] = l),
                (e._batch = e._array ? Math.floor(s / e._length) * e._length : 0),
                (e._index = s),
                setTimeout(function () {
                    F(n, t, a, !0, i, r, o);
                }, 10));
        }
        function Y(e, t, s, n, a) {
            if ((n ? (S._tempValue = x.formatValue.call(f, S._tempWheelArray, S)) : F(s), !a)) {
                S._wheelArray = [];
                for (var i = 0; i < _.length; i++) S._wheelArray[i] = M[i] && M[i].multiple ? Object.keys(S._tempSelected[i] || {})[0] : _[i];
                (S._value = S._hasValue ? S._tempValue : null), (S._selected = ut(!0, {}, S._tempSelected));
            }
            e && (S._isInput && o.val(S._hasValue ? S._tempValue : ""), C("onFill", { valueText: S._hasValue ? S._tempValue : "", change: t }), t && ((S._preventChange = !0), o.trigger("change")));
        }
        _t.call(this, f, t, !0),
            (S.setVal = S._setVal = function (e, t, s, n, a) {
                (S._hasValue = null != e), (S._tempWheelArray = _ = ct.isArray(e) ? e.slice(0) : x.parseValue.call(f, e, S) || []), Y(t, void 0 === s ? t : s, a, !1, n);
            }),
            (S.getVal = S._getVal = function (e) {
                var t = S._hasValue || e ? S[e ? "_tempValue" : "_value"] : null;
                return ye(t) ? +t : t;
            }),
            (S.setArrayVal = S.setVal),
            (S.getArrayVal = function (e) {
                return e ? S._tempWheelArray : S._wheelArray;
            }),
            (S.changeWheel = function (e, t, s) {
                var n, a, i;
                ct.each(e, function (e, t) {
                    (i = r[e]) &&
                        ((n = i._nr),
                        (a = L(t, n, !0)),
                        S._isVisible && (b && a._$3d.html(A(a, n, a._first + k - p + 1, a._last - k + p, !0)), a._$scroller.html(A(a, n, a._first, a._last)).css("margin-top", a._margin + "px"), a._refresh(v)));
                }),
                    !S._isVisible || S._isLiquid || v || S.position(),
                    v || F(t, void 0, void 0, s);
            }),
            (S.getValidValue = $),
            (S._generateContent = function () {
                var n,
                    a = 0,
                    i = "",
                    r = b ? ve + "transform: translateZ(" + ((w * x.rows) / 2 + 3) + "px);" : "",
                    o = '<div class="mbsc-sc-whl-l" style="' + r + "height:" + w + "px;margin-top:-" + (w / 2 + (x.selectedLineBorder || 0)) + 'px;"></div>',
                    l = 0;
                return (
                    ct.each(x.wheels, function (e, t) {
                        (i +=
                            '<div class="mbsc-w-p mbsc-sc-whl-gr-c' +
                            (b ? " mbsc-sc-whl-gr-3d-c" : "") +
                            (x.showLabel ? " mbsc-sc-lbl-v" : "") +
                            '">' +
                            o +
                            '<div class="mbsc-sc-whl-gr' +
                            (b ? " mbsc-sc-whl-gr-3d" : "") +
                            (c ? " mbsc-sc-cp" : "") +
                            (x.width || x.maxWidth ? '"' : '" style="max-width:' + x.maxPopupWidth + 'px;"') +
                            ">"),
                            ct.each(t, function (e, t) {
                                S._tempSelected[l] = ut({}, S._selected[l]);
                                var s = L(t, l);
                                (M[l] = s),
                                    (a += x.maxWidth ? x.maxWidth[l] || x.maxWidth : x.width ? x.width[l] || x.width : 0),
                                    (n = void 0 !== s.label ? s.label : e),
                                    (i +=
                                        '<div class="mbsc-sc-whl-w ' +
                                        (s.cssClass || "") +
                                        (s.multiple ? " mbsc-sc-whl-multi" : "") +
                                        '" style="' +
                                        (x.width
                                            ? "width:" + (x.width[l] || x.width) + "px;"
                                            : (x.minWidth ? "min-width:" + (x.minWidth[l] || x.minWidth) + "px;" : "") + (x.maxWidth ? "max-width:" + (x.maxWidth[l] || x.maxWidth) + "px;" : "")) +
                                        '">' +
                                        (d ? '<div class="mbsc-sc-bar-c"><div class="mbsc-sc-bar"></div></div>' : "") +
                                        '<div class="mbsc-sc-whl-o" style="' +
                                        r +
                                        '"></div>' +
                                        o +
                                        '<div aria-live="off" aria-label="' +
                                        n +
                                        '"' +
                                        (s.multiple ? ' aria-multiselectable="true"' : "") +
                                        ' role="listbox" data-index="' +
                                        l +
                                        '" class="mbsc-sc-whl" style="height:' +
                                        x.rows * w * (b ? 1.1 : 1) +
                                        'px;">' +
                                        (c
                                            ? '<div data-index="' +
                                              l +
                                              '" data-step="1" class="mbsc-sc-btn mbsc-sc-btn-plus ' +
                                              (x.btnPlusClass || "") +
                                              '"></div><div data-index="' +
                                              l +
                                              '" data-step="-1" class="mbsc-sc-btn mbsc-sc-btn-minus ' +
                                              (x.btnMinusClass || "") +
                                              '"></div>'
                                            : "") +
                                        '<div class="mbsc-sc-lbl">' +
                                        n +
                                        '</div><div class="mbsc-sc-whl-c" style="height:' +
                                        u +
                                        "px;margin-top:-" +
                                        (u / 2 + 1) +
                                        "px;" +
                                        r +
                                        '"><div class="mbsc-sc-whl-sc" style="top:' +
                                        (u - w) / 2 +
                                        'px;">'),
                                    (i += A(s, l, s._first, s._last) + "</div></div>"),
                                    b && ((i += '<div class="mbsc-sc-whl-3d" style="height:' + w + "px;margin-top:-" + w / 2 + 'px;">'), (i += A(s, l, s._first + k - p + 1, s._last - k + p, !0)), (i += "</div>")),
                                    (i += "</div></div>"),
                                    l++;
                            }),
                            (i += "</div></div>");
                    }),
                    a && (x.maxPopupWidth = a),
                    i
                );
            }),
            (S._attachEvents = function (e) {
                (a = yt(ct(".mbsc-sc-btn", e), P, x.delay, I, !0)), ct(".mbsc-sc-whl", e).on("keydown", n).on("keyup", i);
            }),
            (S._detachEvents = function () {
                a.stop();
                for (var e = 0; e < M.length; e++) M[e]._scroller.destroy();
            }),
            (S._markupReady = function (e) {
                ct(".mbsc-sc-whl-w", (s = e)).each(function (u) {
                    var a,
                        e = ct(this),
                        d = M[u];
                    (d._$markup = e),
                        (d._$scroller = ct(".mbsc-sc-whl-sc", this)),
                        (d._$3d = ct(".mbsc-sc-whl-3d", this)),
                        (d._scroller = new Ot(this, {
                            mousewheel: x.mousewheel,
                            moveElement: d._$scroller,
                            scrollbar: ct(".mbsc-sc-bar-c", this),
                            initialPos: (d._first - d._index) * w,
                            contSize: x.rows * w,
                            snap: w,
                            minScroll: h(d),
                            maxScroll: m(d),
                            maxSnapScroll: k,
                            prevDef: !0,
                            stopProp: !0,
                            timeUnit: 3,
                            easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
                            sync: function (e, t, s) {
                                var n = t ? ve + "transform " + Math.round(t) + "ms " + s : "";
                                b && ((d._$3d[0].style[ge + "Transition"] = n), (d._$3d[0].style[ge + "Transform"] = "rotateX(" + (-e / w) * g + "deg)"));
                            },
                            onStart: function (e, t) {
                                t.settings.readonly = I(u);
                            },
                            onGestureStart: function () {
                                e.addClass("mbsc-sc-whl-a mbsc-sc-whl-anim"), C("onWheelGestureStart", { index: u });
                            },
                            onGestureEnd: function (e) {
                                var t = 90 == e.direction ? 1 : 2,
                                    s = e.duration,
                                    n = e.destinationY;
                                (a = Math.round(-n / w) + d._offset), H(d, u, a, s, t);
                            },
                            onAnimationStart: function () {
                                e.addClass("mbsc-sc-whl-anim");
                            },
                            onAnimationEnd: function () {
                                e.removeClass("mbsc-sc-whl-a mbsc-sc-whl-anim"), C("onWheelAnimationEnd", { index: u }), d._$3d.find(".mbsc-sc-itm-del").remove();
                            },
                            onMove: function (e) {
                                var t, s, n, a, i, r, o, l, c;
                                (t = d),
                                    (s = u),
                                    (n = e.posY),
                                    (a = Math.round(-n / w) + t._offset),
                                    (i = a - t._current),
                                    (r = t._first),
                                    (o = t._last),
                                    (l = r + k - p + 1),
                                    (c = o - k + p),
                                    i &&
                                        ((t._first += i),
                                        (t._last += i),
                                        (t._current = a),
                                        0 < i
                                            ? (t._$scroller.append(A(t, s, Math.max(o + 1, r + i), o + i)),
                                              ct(".mbsc-sc-itm", t._$scroller)
                                                  .slice(0, Math.min(i, o - r + 1))
                                                  .remove(),
                                              b &&
                                                  (t._$3d.append(A(t, s, Math.max(c + 1, l + i), c + i, !0)),
                                                  ct(".mbsc-sc-itm", t._$3d)
                                                      .slice(0, Math.min(i, c - l + 1))
                                                      .attr("class", "mbsc-sc-itm-del")))
                                            : i < 0 &&
                                              (t._$scroller.prepend(A(t, s, r + i, Math.min(r - 1, o + i))),
                                              ct(".mbsc-sc-itm", t._$scroller)
                                                  .slice(Math.max(i, r - o - 1))
                                                  .remove(),
                                              b &&
                                                  (t._$3d.prepend(A(t, s, l + i, Math.min(l - 1, c + i), !0)),
                                                  ct(".mbsc-sc-itm", t._$3d)
                                                      .slice(Math.max(i, l - c - 1))
                                                      .attr("class", "mbsc-sc-itm-del"))),
                                        (t._margin += i * w),
                                        t._$scroller.css("margin-top", t._margin + "px"));
                            },
                            onBtnTap: function (e) {
                                l(u, ct(e.target));
                            },
                        }));
                }),
                    F();
            }),
            (S._fillValue = function () {
                Y((S._hasValue = !0), !0, 0, !0);
            }),
            (S._clearValue = function () {
                ct(".mbsc-sc-whl-multi .mbsc-sc-itm-sel", s).removeClass(y).removeAttr("aria-selected");
            }),
            (S._readValue = function () {
                var e = o.val() || "",
                    s = 0;
                "" !== e && (S._hasValue = !0),
                    (S._tempWheelArray = _ = S._hasValue && S._wheelArray ? S._wheelArray.slice(0) : x.parseValue.call(f, e, S) || []),
                    (S._tempSelected = ut(!0, {}, S._selected)),
                    ct.each(x.wheels, function (e, t) {
                        ct.each(t, function (e, t) {
                            (M[s] = L(t, s)), s++;
                        });
                    }),
                    Y(!1, !1, 0, !0),
                    C("onRead");
            }),
            (S.__processSettings = function (e) {
                (x = S.settings), (C = S.trigger), (T = x.multiline), (y = "mbsc-sc-itm-sel mbsc-ic mbsc-ic-" + x.checkIcon), (d = !x.touchUi) && ((x.tapSelect = !0), (x.circular = !1), (x.rows = e.rows || t.rows || 7));
            }),
            (S.__init = function (e) {
                e && (S._wheelArray = null),
                    (M = []),
                    (r = {}),
                    (c = x.showScrollArrows),
                    (b = x.scroll3d && Pt && !c && !d && ("ios" == x.theme || "ios" == x.baseTheme)),
                    (w = x.height),
                    (u = b ? 2 * Math.round((w - 0.03 * ((w * x.rows) / 2 + 3)) / 2) : w),
                    (p = Math.round(1.8 * x.rows)),
                    (g = 360 / (2 * p)),
                    c && (x.rows = Math.max(3, x.rows));
            }),
            (S._getItemValue = V),
            (S._tempSelected = {}),
            (S._selected = {}),
            e || S.init();
    }
    (Lt.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _class: "scroller",
        _presets: Vt,
        _defaults: ut({}, _t.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 200,
            readonly: !1,
            showLabel: !0,
            setOnTap: !1,
            wheels: [],
            preset: "",
            speedUnit: 0.0012,
            timeUnit: 0.08,
            checkIcon: "checkmark",
            compClass: "mbsc-sc",
            validate: function () {},
            formatValue: function (e) {
                return e.join(" ");
            },
            parseValue: function (e, s) {
                var n,
                    a,
                    i = [],
                    r = [],
                    o = 0;
                return (
                    null != e && (i = (e + "").split(" ")),
                    ct.each(s.settings.wheels, function (e, t) {
                        ct.each(t, function (e, t) {
                            (a = t.data),
                                (n = s._getItemValue(a[0])),
                                ct.each(a, function (e, t) {
                                    if (i[o] == s._getItemValue(t)) return (n = s._getItemValue(t)), !1;
                                }),
                                r.push(n),
                                o++;
                        });
                    }),
                    r
                );
            },
        }),
    }),
        (Ce.Scroller = Lt);
    function At(g) {
        function e(e) {
            var t,
                s,
                n,
                a,
                i = [];
            if (e) {
                for (t = 0; t < e.length; t++)
                    if ((s = e[t]).start && s.end && !Je.test(s.start)) for (n = new Date(ft(s.start, D, I)), a = new Date(ft(s.end, D, I)); n <= a; ) i.push(dt(n.getFullYear(), n.getMonth(), n.getDate())), n.setDate(n.getDate() + 1);
                    else i.push(s);
                return i;
            }
            return e;
        }
        function V(e, t, s, n) {
            return Math.min(n, Math.floor(e / t) * t + s);
        }
        function t(e, t, s) {
            return Math.floor((s - t) / e) * e + t;
        }
        function i(e) {
            return e.getFullYear() + "-" + re(e.getMonth() + 1) + "-" + re(e.getDate());
        }
        function o(e, t, s, n) {
            var a;
            return void 0 === M[t] || ((a = +e[M[t]]), isNaN(a)) ? (s ? ae[t](s) : void 0 !== r[t] ? r[t] : ae[t](n)) : a;
        }
        function y(e) {
            var t,
                s = new Date(new Date().setHours(0, 0, 0, 0));
            if (null === e) return e;
            void 0 !== M.dd && ((t = e[M.dd].split("-")), (t = new Date(t[0], t[1] - 1, t[2]))), void 0 !== M.tt && ((t = t || s), (t = new Date(t.getTime() + (e[M.tt] % 86400) * 1e3)));
            var n = o(e, "y", t, s),
                a = o(e, "m", t, s),
                i = Math.min(o(e, "d", t, s), I.getMaxDayOfMonth(n, a)),
                r = o(e, "h", t, s);
            return I.getDate(n, a, i, R && o(e, "a", t, s) ? r + 12 : r, o(e, "i", t, s), o(e, "s", t, s), o(e, "u", t, s));
        }
        function _(e, t) {
            var s,
                n,
                a = ["y", "m", "d", "a", "h", "i", "s", "u", "dd", "tt"],
                i = [];
            if (null == e) return e;
            for (s = 0; s < a.length; s++) void 0 !== M[(n = a[s])] && (i[M[n]] = ae[n](e)), t && (r[n] = ae[n](e));
            return i;
        }
        function s(e, t) {
            return t ? Math.floor(new Date(e) / 864e5) : e.getMonth() + 12 * (e.getFullYear() - 1970);
        }
        function p(e) {
            return { value: e, display: (/yy/i.test(N) ? e : (e + "").substr(2, 2)) + (I.yearSuffix || "") };
        }
        function h(e) {
            return e;
        }
        function m(n) {
            var a = /d/i.test(n);
            return {
                label: "",
                cssClass: "mbsc-dt-whl-date",
                min: H ? s(i(H), a) : void 0,
                max: Y ? s(i(Y), a) : void 0,
                data: function (e) {
                    var t = new Date(new Date().setHours(0, 0, 0, 0)),
                        s = a ? new Date(864e5 * e) : new Date(1970, e, 1);
                    return a && (s = new Date(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())), { invalid: a && !x(s, !0), value: i(s), display: t.getTime() == s.getTime() ? I.todayText : qe(n, s, I) };
                },
                getIndex: function (e) {
                    return s(e, a);
                },
            };
        }
        function f(e) {
            var t,
                s,
                n,
                a = [];
            for (/s/i.test(e) ? (s = B) : /i/i.test(e) ? (s = 60 * j) : /h/i.test(e) && (s = 3600 * q), E = ne.tt = s, t = 0; t < 86400; t += s)
                (n = new Date(new Date().setHours(0, 0, 0, 0) + 1e3 * t)), a.push({ value: t, display: qe(e, n, I) });
            return { label: "", cssClass: "mbsc-dt-whl-time", data: a };
        }
        function w(e, t) {
            return I.getYear(e) === I.getYear(t) && I.getMonth(e) === I.getMonth(t);
        }
        function x(e, t) {
            return !(!t && e < H) && !(!t && Y < e) && (!!n(e, F) || !n(e, $));
        }
        function n(e, t) {
            var s, n, a, i;
            if (t)
                for (n = 0; n < t.length; n++)
                    if (((a = (i = (s = t[n]).d || s) + ""), !s.start))
                        if (gt.test(a)) {
                            if ((a = +a.replace("w", "")) == e.getDay()) return !0;
                        } else if (vt.test(a)) {
                            if ((a = a.split("/"))[1]) {
                                if (a[0] - 1 == e.getMonth() && a[1] == e.getDate()) return !0;
                            } else if (a[0] == e.getDate()) return !0;
                        } else if (((s = ft(i, D, I)), e.getFullYear() == s.getFullYear() && e.getMonth() == s.getMonth() && e.getDate() == s.getDate())) return !0;
            return !1;
        }
        function C(e, t, s, n, a, i, r) {
            var o, l, c, u, d;
            if (e)
                for (c = 0; c < e.length; c++)
                    if (((d = (l = (o = e[c]).d || o) + ""), !o.start))
                        if (gt.test(d)) for (u = (d = +d.replace("w", "")) - n; u < a; u += 7) 0 <= u && (i[u + 1] = r);
                        else vt.test(d) ? ((d = d.split("/"))[1] ? d[0] - 1 == s && (i[d[1]] = r) : (i[d[0]] = r)) : ((o = ft(l, D, I)), I.getYear(o) == t && I.getMonth(o) == s && (i[I.getDay(o)] = r));
        }
        function T(e, t, s, n, a, i, r, o) {
            var l,
                c,
                u,
                d,
                p,
                h,
                m,
                f,
                b,
                v,
                g,
                y,
                _,
                w,
                x,
                C,
                T,
                M,
                k,
                D,
                S = {},
                O = I.getDate(n, a, i),
                N = ["a", "h", "i", "s"];
            if (e) {
                for (m = 0; m < e.length; m++)
                    (g = e[m]).start &&
                        ((g.apply = !1),
                        (M = (T = (u = g.d) + "").split("/")),
                        u &&
                            ((u.getTime && n == I.getYear(u) && a == I.getMonth(u) && i == I.getDay(u)) ||
                                (!gt.test(T) && ((M[1] && i == M[1] && a == M[0] - 1) || (!M[1] && i == M[0]))) ||
                                (gt.test(T) && O.getDay() == +T.replace("w", ""))) &&
                            ((g.apply = !0), (S[O] = !0)));
                for (m = 0; m < e.length; m++)
                    if (((g = e[m]), (C = l = 0), (f = te[s]), (b = se[s]), (c = !(x = w = !0)), g.start && (g.apply || (!g.d && !S[O])))) {
                        for (y = g.start.split(":"), _ = g.end.split(":"), v = 0; v < 3; v++) void 0 === y[v] && (y[v] = 0), void 0 === _[v] && (_[v] = 59), (y[v] = +y[v]), (_[v] = +_[v]);
                        if ("tt" == s)
                            (f = V(Math.round((new Date(O).setHours(y[0], y[1], y[2]) - new Date(O).setHours(0, 0, 0, 0)) / 1e3), E, 0, 86400)),
                                (b = V(Math.round((new Date(O).setHours(_[0], _[1], _[2]) - new Date(O).setHours(0, 0, 0, 0)) / 1e3), E, 0, 86400));
                        else {
                            for (y.unshift(11 < y[0] ? 1 : 0), _.unshift(11 < _[0] ? 1 : 0), R && (12 <= y[1] && (y[1] = y[1] - 12), 12 <= _[1] && (_[1] = _[1] - 12)), v = 0; v < t; v++)
                                void 0 !== P[v] &&
                                    ((k = V(y[v], ne[N[v]], te[N[v]], se[N[v]])),
                                    (D = V(_[v], ne[N[v]], te[N[v]], se[N[v]])),
                                    (h = p = d = 0),
                                    R && 1 == v && ((d = y[0] ? 12 : 0), (p = _[0] ? 12 : 0), (h = P[0] ? 12 : 0)),
                                    w || (k = 0),
                                    x || (D = se[N[v]]),
                                    (w || x) && k + d < P[v] + h && P[v] + h < D + p && (c = !0),
                                    P[v] != k && (w = !1),
                                    P[v] != D && (x = !1));
                            if (!o) for (v = t + 1; v < 4; v++) 0 < y[v] && (l = ne[s]), _[v] < se[N[v]] && (C = ne[s]);
                            c || ((k = V(y[t], ne[s], te[s], se[s]) + l), (D = V(_[t], ne[s], te[s], se[s]) - C), w && (f = k), x && (b = D));
                        }
                        if (w || x || c) for (v = f; v <= b; v += ne[s]) r[v] = !o;
                    }
            }
        }
        var E,
            b,
            a,
            M = {},
            r = {},
            v = {},
            P = [],
            l = (function (e) {
                var t,
                    s,
                    n,
                    a = {};
                if (e.is("input")) {
                    switch (e.attr("type")) {
                        case "date":
                            t = "yy-mm-dd";
                            break;
                        case "datetime":
                            t = "yy-mm-ddTHH:ii:ssZ";
                            break;
                        case "datetime-local":
                            t = "yy-mm-ddTHH:ii:ss";
                            break;
                        case "month":
                            (t = "yy-mm"), (a.dateOrder = "mmyy");
                            break;
                        case "time":
                            t = "HH:ii:ss";
                    }
                    (a.format = t), (s = e.attr("min")), (n = e.attr("max")), s && "undefined" != s && (a.min = je(t, s)), n && "undefined" != n && (a.max = je(t, n));
                }
                return a;
            })(ct(this)),
            c = ut({}, g.settings),
            u = ie[c.calendarSystem],
            I = ut(g.settings, Ze, u, $t, l, c),
            k = I.preset,
            d = "datetime" == k ? I.dateFormat + I.separator + I.timeFormat : "time" == k ? I.timeFormat : I.dateFormat,
            D = l.format || d,
            S = I.dateWheels || I.dateFormat,
            O = I.timeWheels || I.timeFormat,
            N = I.dateWheels || I.dateDisplay,
            L = O,
            A = I.baseTheme || I.theme,
            $ = e(I.invalid),
            F = e(I.valid),
            H = ft(I.min, D, I),
            Y = ft(I.max, D, I),
            U = /time/i.test(k),
            R = /h/.test(L),
            W = /D/.test(N),
            z = I.steps || {},
            q = z.hour || I.stepHour || 1,
            j = z.minute || I.stepMinute || 1,
            B = z.second || I.stepSecond || 1,
            X = z.zeroBased,
            G = X || !H ? 0 : H.getHours() % q,
            J = X || !H ? 0 : H.getMinutes() % j,
            Z = X || !H ? 0 : H.getSeconds() % B,
            K = t(q, G, R ? 11 : 23),
            Q = t(j, J, 59),
            ee = t(j, J, 59),
            te = { y: H ? H.getFullYear() : -1 / 0, m: 0, d: 1, h: G, i: J, s: Z, a: 0, tt: 0 },
            se = { y: Y ? Y.getFullYear() : 1 / 0, m: 11, d: 31, h: K, i: Q, s: ee, a: 1, tt: 86400 },
            ne = { y: 1, m: 1, d: 1, h: q, i: j, s: B, a: 1, tt: 1 },
            ae = {
                y: function (e) {
                    return I.getYear(e);
                },
                m: function (e) {
                    return I.getMonth(e);
                },
                d: function (e) {
                    return I.getDay(e);
                },
                h: function (e) {
                    var t = e.getHours();
                    return V((t = R && 12 <= t ? t - 12 : t), q, G, K);
                },
                i: function (e) {
                    return V(e.getMinutes(), j, J, Q);
                },
                s: function (e) {
                    return V(e.getSeconds(), B, Z, ee);
                },
                u: function (e) {
                    return e.getMilliseconds();
                },
                a: function (e) {
                    return 11 < e.getHours() ? 1 : 0;
                },
                dd: i,
                tt: function (e) {
                    return V(Math.round((e.getTime() - new Date(e).setHours(0, 0, 0, 0)) / 1e3), E || 1, 0, 86400);
                },
            };
        return (
            (g.getVal = function (e) {
                return g._hasValue || e ? Xe(y(g.getArrayVal(e)), I, D) : null;
            }),
            (g.getDate = function (e) {
                return g._hasValue || e ? y(g.getArrayVal(e)) : null;
            }),
            (g.setDate = function (e, t, s, n, a) {
                g.setArrayVal(_(e, !0), t, a, n, s);
            }),
            (a = (function () {
                var e,
                    t,
                    s,
                    n,
                    a,
                    i,
                    r,
                    o,
                    l = 0,
                    c = [],
                    u = [],
                    d = [];
                if (/date/i.test(k)) {
                    for (e = S.split(/\|/.test(S) ? "|" : ""), n = 0; n < e.length; n++)
                        if (((i = 0), (s = e[n]).length))
                            if ((/y/i.test(s) && ((v.y = 1), i++), /m/i.test(s) && ((v.y = 1), (v.m = 1), i++), /d/i.test(s) && ((v.y = 1), (v.m = 1), (v.d = 1), i++), 1 < i && void 0 === M.dd))
                                (M.dd = l), l++, u.push(m(s)), (d = u), (b = !0);
                            else if (/y/i.test(s) && void 0 === M.y) (M.y = l), l++, u.push({ cssClass: "mbsc-dt-whl-y", label: I.yearText, min: H ? I.getYear(H) : void 0, max: Y ? I.getYear(Y) : void 0, data: p, getIndex: h });
                            else if (/m/i.test(s) && void 0 === M.m) {
                                for (M.m = l, r = [], l++, a = 0; a < 12; a++)
                                    (o = N.replace(/[dy|]/gi, "")
                                        .replace(/mm/, re(a + 1) + (I.monthSuffix || ""))
                                        .replace(/m/, a + 1 + (I.monthSuffix || ""))),
                                        r.push({
                                            value: a,
                                            display: /MM/.test(o) ? o.replace(/MM/, '<span class="mbsc-dt-month">' + I.monthNames[a] + "</span>") : o.replace(/M/, '<span class="mbsc-dt-month">' + I.monthNamesShort[a] + "</span>"),
                                        });
                                u.push({ cssClass: "mbsc-dt-whl-m", label: I.monthText, data: r });
                            } else if (/d/i.test(s) && void 0 === M.d) {
                                for (M.d = l, r = [], l++, a = 1; a < 32; a++) r.push({ value: a, display: (/dd/i.test(N) ? re(a) : a) + (I.daySuffix || "") });
                                u.push({ cssClass: "mbsc-dt-whl-d", label: I.dayText, data: r });
                            }
                    c.push(u);
                }
                if (/time/i.test(k)) {
                    for (t = O.split(/\|/.test(O) ? "|" : ""), n = 0; n < t.length; n++)
                        if (((i = 0), (s = t[n]).length && (/h/i.test(s) && ((v.h = 1), i++), /i/i.test(s) && ((v.i = 1), i++), /s/i.test(s) && ((v.s = 1), i++), /a/i.test(s) && i++), 1 < i && void 0 === M.tt))
                            (M.tt = l), l++, d.push(f(s));
                        else if (/h/i.test(s) && void 0 === M.h) {
                            for (r = [], M.h = l, v.h = 1, l++, a = G; a < (R ? 12 : 24); a += q) r.push({ value: a, display: R && 0 === a ? 12 : /hh/i.test(L) ? re(a) : a });
                            d.push({ cssClass: "mbsc-dt-whl-h", label: I.hourText, data: r });
                        } else if (/i/i.test(s) && void 0 === M.i) {
                            for (r = [], M.i = l, v.i = 1, l++, a = J; a < 60; a += j) r.push({ value: a, display: /ii/i.test(L) ? re(a) : a });
                            d.push({ cssClass: "mbsc-dt-whl-i", label: I.minuteText, data: r });
                        } else if (/s/i.test(s) && void 0 === M.s) {
                            for (r = [], M.s = l, v.s = 1, l++, a = Z; a < 60; a += B) r.push({ value: a, display: /ss/i.test(L) ? re(a) : a });
                            d.push({ cssClass: "mbsc-dt-whl-s", label: I.secText, data: r });
                        } else
                            /a/i.test(s) &&
                                void 0 === M.a &&
                                ((M.a = l),
                                l++,
                                d.push({
                                    cssClass: "mbsc-dt-whl-a",
                                    label: I.ampmText,
                                    data: /A/.test(s)
                                        ? [
                                              { value: 0, display: I.amText.toUpperCase() },
                                              { value: 1, display: I.pmText.toUpperCase() },
                                          ]
                                        : [
                                              { value: 0, display: I.amText },
                                              { value: 1, display: I.pmText },
                                          ],
                                }));
                    d != u && c.push(d);
                }
                return c;
            })()),
            (I.isoParts = v),
            (g._format = d),
            (g._order = M),
            (g.handlers.now = function () {
                g.setDate(new Date(), g.live, 1e3, !0, !0);
            }),
            (g.buttons.now = { text: I.nowText, icon: I.nowIcon, handler: "now" }),
            {
                minWidth: b && U ? { bootstrap: 46, ios: 50, material: 46, mobiscroll: 46, windows: 50 }[A] : void 0,
                compClass: "mbsc-dt mbsc-sc",
                wheels: a,
                headerText:
                    !!I.headerText &&
                    function () {
                        return qe(d, y(g.getArrayVal(!0)), I);
                    },
                formatValue: function (e) {
                    return qe(D, y(e), I);
                },
                parseValue: function (e) {
                    return e || ((r = {}), (g._hasValue = !1)), _(ft(e || I.defaultValue || new Date(), D, I, v), !!e);
                },
                validate: function (e) {
                    var t,
                        o,
                        s,
                        n,
                        a = e.values,
                        i = e.index,
                        r = e.direction,
                        l = I.wheels[0][M.d],
                        c = (function (e, t) {
                            var s,
                                n,
                                a = !1,
                                i = !1,
                                r = 0,
                                o = 0,
                                l = H ? y(_(H)) : -1 / 0,
                                c = Y ? y(_(Y)) : 1 / 0;
                            if (x(e)) return e;
                            if ((e < l && (e = l), c < e && (e = c), (n = s = e), 2 !== t)) for (a = x(s, !0); !a && s < c && r < 100; ) (a = x((s = new Date(s.getTime() + 864e5)), !0)), r++;
                            if (1 !== t) for (i = x(n, !0); !i && l < n && o < 100; ) (i = x((n = new Date(n.getTime() - 864e5)), !0)), o++;
                            return 1 === t && a ? s : 2 === t && i ? n : w(e, s) ? s : w(e, n) ? n : o <= r && i ? n : s;
                        })(y(a), r),
                        u = _(c),
                        d = [],
                        p = {},
                        h = ae.y(c),
                        m = ae.m(c),
                        f = I.getMaxDayOfMonth(h, m),
                        b = !0,
                        v = !0;
                    if (
                        (ct.each(["dd", "y", "m", "d", "tt", "a", "h", "i", "s"], function (e, s) {
                            var t = te[s],
                                n = se[s],
                                a = ae[s](c);
                            if (((d[M[s]] = []), b && H && (t = ae[s](H)), v && Y && (n = ae[s](Y)), a < t && (a = t), n < a && (a = n), "dd" !== s && "tt" !== s && ((b = b && a == t), (v = v && a == n)), void 0 !== M[s])) {
                                if ("y" != s && "dd" != s) for (o = te[s]; o <= se[s]; o += ne[s]) (o < t || n < o) && d[M[s]].push(o);
                                if ("d" == s) {
                                    var i = I.getDate(h, m, 1).getDay(),
                                        r = {};
                                    C($, h, m, i, f, r, 1),
                                        C(F, h, m, i, f, r, 0),
                                        ct.each(r, function (e, t) {
                                            t && d[M[s]].push(e);
                                        });
                                }
                            }
                        }),
                        U &&
                            ct.each(["a", "h", "i", "s", "tt"], function (e, s) {
                                var t = ae[s](c),
                                    n = ae.d(c),
                                    a = {};
                                void 0 !== M[s] &&
                                    (T($, e, s, h, m, n, a, 0),
                                    T(F, e, s, h, m, n, a, 1),
                                    ct.each(a, function (e, t) {
                                        t && d[M[s]].push(e);
                                    }),
                                    (P[e] = g.getValidValue(M[s], t, r, a)));
                            }),
                        l && (l.data.length !== f || (W && (void 0 === i || i === M.y || i === M.m))))
                    ) {
                        for ((p[M.d] = l).data = [], t = 1; t <= f; t++)
                            (n = I.getDate(h, m, t).getDay()),
                                (s = N.replace(/[my|]/gi, "")
                                    .replace(/dd/, (t < 10 ? "0" + t : t) + (I.daySuffix || ""))
                                    .replace(/d/, t + (I.daySuffix || ""))),
                                l.data.push({ value: t, display: /DD/.test(s) ? s.replace(/DD/, '<span class="mbsc-dt-day">' + I.dayNames[n] + "</span>") : s.replace(/D/, '<span class="mbsc-dt-day">' + I.dayNamesShort[n] + "</span>") });
                        (g._tempWheelArray[M.d] = u[M.d]), g.changeWheel(p);
                    }
                    return { disabled: d, valid: u };
                },
            }
        );
    }
    var $t = {
        separator: " ",
        dateFormat: "mm/dd/yy",
        dateDisplay: "MMddyy",
        timeFormat: "h:ii A",
        dayText: "Day",
        monthText: "Month",
        yearText: "Year",
        hourText: "Hours",
        minuteText: "Minutes",
        ampmText: "&nbsp;",
        secText: "Seconds",
        nowText: "Now",
        todayText: "Today",
    };
    (Vt.date = At), (Vt.time = At), (Vt.datetime = At);
    var Ft = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).mbscInit = { preset: "datetime" }), t;
        }
        return l(e, s), e;
    })(ze);
    Ft.propTypes = g({}, Ft.propTypes, {}, Ae, {}, $e);
    var Ht = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).mbscInit = { preset: "date" }), t;
        }
        return l(e, s), e;
    })(ze);
    Ht.propTypes = g({}, Ht.propTypes, {}, Ae, {}, $e);
    var Yt = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).mbscInit = { preset: "time" }), t;
        }
        return l(e, s), e;
    })(ze);
    (Yt.propTypes = g({}, Yt.propTypes, {}, Ae, {}, $e)), (se.Datetime = Ft), (se.Date = Ht), (se.Time = Yt);
    var Ut = 0;
    o.getJson = function (e, t, s) {
        var n, a, i, r, o, l, c;
        "jsonp" == s
            ? ((r = e),
              (o = t),
              (l = document.createElement("script")),
              (c = "mbscjsonp" + ++Ut),
              (window[c] = function (e) {
                  l.parentNode.removeChild(l), delete window[c], e && o(e);
              }),
              (l.src = r + (0 <= r.indexOf("?") ? "&" : "?") + "callback=" + c),
              document.body.appendChild(l))
            : ((n = e),
              (a = t),
              (i = new XMLHttpRequest()).open("GET", n, !0),
              (i.onload = function () {
                  200 <= this.status && this.status < 400 && a(JSON.parse(this.response));
              }),
              (i.onerror = function () {}),
              i.send());
    };
    function Rt(S) {
        var f,
            b,
            v,
            a,
            i,
            g,
            c,
            r,
            l,
            e,
            O,
            y,
            _,
            o,
            w,
            x,
            s,
            N,
            u,
            C,
            T,
            V,
            M,
            k,
            E,
            D,
            P,
            d,
            I,
            L,
            A,
            $,
            p,
            h,
            F,
            m,
            H,
            Y,
            U,
            R,
            W,
            z,
            q,
            j,
            B,
            X,
            G,
            J,
            Z,
            K,
            Q,
            ee,
            te,
            se,
            ne,
            ae,
            ie,
            re,
            oe,
            le,
            ce,
            ue,
            de,
            pe,
            he,
            me,
            fe,
            be,
            ve,
            ge,
            ye,
            _e,
            we,
            xe,
            t,
            n,
            Ce,
            Te = 1,
            Me = this;
        function ke(e) {
            e.hasClass("mbsc-cal-h") || e.addClass("mbsc-cal-h");
        }
        function De(e) {
            var t;
            e.hasClass("mbsc-cal-h") ? (t = e).hasClass("mbsc-cal-h") && t.removeClass("mbsc-cal-h") : ke(e);
        }
        function Se(e, t, s) {
            (e[t] = e[t] || []), e[t].push(s);
        }
        function Oe(e, o, l) {
            var c,
                u,
                d,
                p,
                h,
                m,
                f,
                b = ue.getDate,
                v = ue.getYear,
                g = ue.getMonth,
                y = ue.getDay,
                _ = ue.getMaxDayOfMonth,
                w = v(o),
                x = g(o),
                C = {};
            return (
                e &&
                    ct.each(e, function (e, t) {
                        if (((c = t.d || t.start || t), (u = c + ""), t.start && t.end)) for (f = ht(ft(t.start, k, ue)), m = ht(ft(t.end, k, ue)); f <= m; ) Se(C, f, t), (f = b(v(f), g(f), y(f) + 1));
                        else if (gt.test(u)) for (f = Je(o, !1, +u.replace("w", "")); f <= l; ) Se(C, f, t), (f = b(v(f), g(f), y(f) + 7));
                        else if (vt.test(u)) {
                            var s = !!(u = u.split("/"))[1],
                                n = s ? 1 : 0,
                                a = s ? 0 : 1,
                                i = s ? u[0] - 1 : x,
                                r = s ? +u[1] : +u[0];
                            for (h = _(w, i), f = b(w, i, Math.min(r, h)); f <= l; ) (d = v(f)), (p = g(f)), y(f) === r && Se(C, f, t), (h = _(d + n, p + a)), (f = b(d + n, p + a, Math.min(r, h)));
                        } else Se(C, ht(ft(c, k, ue)), t);
                    }),
                C
            );
        }
        function Ne(e) {
            var t,
                s,
                n,
                a,
                i = !!W[e] && W[e],
                r = !!z[e] && z[e],
                o = r && r[0].background ? r[0].background : i && i[0].background,
                l = "";
            if (r) for (t = 0; t < r.length; t++) l += (r[t].cssClass || "") + " ";
            if (i) {
                for (n = '<div class="mbsc-cal-marks">', t = 0; t < i.length; t++) (l += ((s = i[t]).cssClass || "") + " "), (n += '<div class="mbsc-cal-mark"' + (s.color ? ' style="background:' + s.color + ';"' : "") + "></div>");
                n += "</div>";
            }
            return (a = { marked: i, background: o, cssClass: l, markup: T[e] ? T[e].join("") : d ? n : "" }), ut(a, S._getDayProps(e, a));
        }
        function Ve(e) {
            return ' style="' + (U ? "transform: translateY(" + 100 * e + "%)" : "left:" + 100 * e * ce + "%") + '"';
        }
        function Ee(e) {
            return Ze(e, re - 1) > q && (e = Ze(q, 1 - re)), e < J && (e = J), e;
        }
        function Pe(e, t, s) {
            var n = "none" === e.background,
                a = n ? "none" : e.color,
                i = n ? e.color : at(a),
                r = e.text;
            return (
                '<div data-id="' +
                e._id +
                '" data-index="' +
                t +
                '" class="mbsc-cal-txt' +
                (n ? " mbsc-cal-txt-only" : "") +
                '" title="' +
                ct("<div>" + r + "</div>").text() +
                '"' +
                (a ? ' style="background:' + a + (s && i ? ";color:" + i : "") + ';"' : "") +
                ">" +
                (s ? r : "") +
                "</div>"
            );
        }
        function Ie(e) {
            var t = Je(Ze(e, -oe - ie), !1),
                s = Je(Ze(e, -oe + re + ie - 1), !1);
            (s = ue.getDate(ue.getYear(s), ue.getMonth(s), ue.getDay(s) + 7 * O)),
                S._onGenMonth(t, s),
                ($ = Oe(ue.invalid, t, s)),
                (me = Oe(ue.valid, t, s)),
                (W = Oe(ue.labels || ue.events || ue.marked, t, s)),
                (z = Oe(ue.colors, t, s)),
                (R = S._labels || W || z),
                (P = ue.labels || S._labels) &&
                    (function () {
                        T = {};
                        for (
                            var g = {},
                                y = t,
                                e = function () {
                                    y.getDay() == E && (g = {});
                                    for (var e = B, t = R[y] || [], s = t.length, n = [], a = void 0, i = void 0, r = 0, o = 0, l = 0, c = void 0; r < e; )
                                        if (
                                            ((a = null),
                                            t.forEach(function (e, t) {
                                                g[r] == e && ((a = e), (i = t));
                                            }),
                                            r == e - 1 && (o < s - 1 || (s && l == s && !a)))
                                        ) {
                                            var u = s - o,
                                                d = ((1 < u && ue.moreEventsPluralText) || ue.moreEventsText).replace(/{count}/, u);
                                            u && n.push('<div class="mbsc-cal-txt-more">' + d + "</div>"),
                                                a &&
                                                    ((g[r] = null),
                                                    a._days.forEach(function (e) {
                                                        T[e][r] = '<div class="mbsc-cal-txt-more">' + ue.moreEventsText.replace(/{count}/, 1) + "</div>";
                                                    })),
                                                o++,
                                                r++;
                                        } else if (a) i == l && l++, bt(y, ft(a.end)) && (g[r] = null), n.push(Pe(a, i)), r++, o++, a._days.push(y);
                                        else if (l < s) {
                                            var p = t[l],
                                                h = p.start && ft(p.start),
                                                m = p.end && ft(p.end),
                                                f = y.getDay(),
                                                b = 0 < E - f ? 7 : 0,
                                                v = m && !bt(h, m);
                                            (h && !bt(y, h) && f != E) ||
                                                (void 0 === p._id && (p._id = Te++),
                                                v && (g[r] = p),
                                                (p._days = [y]),
                                                (c = v ? 100 * Math.min(pt(y, ht(m)) + 1, 7 + E - f - b) : 100),
                                                n.push(v ? '<div class="mbsc-cal-txt-w" style="width:' + c + '%">' + Pe(p, l, !0) + "</div>" + Pe(p, l) : Pe(p, l, !0)),
                                                r++,
                                                o++),
                                                l++;
                                        } else n.push('<div class="mbsc-cal-txt-ph"></div>'), r++;
                                    (T[y] = n), (y = ue.getDate(ue.getYear(y), ue.getMonth(y), ue.getDay(y) + 1));
                                };
                            y < s;

                        )
                            e();
                    })();
        }
        function Le(e) {
            var t = ue.getYear(e),
                s = ue.getMonth(e);
            ze((l = C = e)), he("onMonthChange", { year: t, month: s }), he("onMonthLoading", { year: t, month: s }), he("onPageChange", { firstDay: e }), he("onPageLoading", { firstDay: e }), Ie(e);
        }
        function Ae(e) {
            var t = ue.getYear(e),
                s = ue.getMonth(e);
            void 0 === ae ? $e(e, t, s) : Ye(e, ae, !0), Ue(l, M.focus), (M.focus = !1);
        }
        function $e(e, t, s) {
            var n = M.$scroller;
            ct(".mbsc-cal-slide", n).removeClass("mbsc-cal-slide-a"),
                ct(".mbsc-cal-slide", n)
                    .slice(ie, ie + re)
                    .addClass("mbsc-cal-slide-a"),
                ct(".mbsc-cal-slide-a .mbsc-cal-day", n)
                    .on("mouseenter", function () {
                        var e = ct(this);
                        be ||
                            H ||
                            (A = setTimeout(function () {
                                try{
                                    (p = !0), he("onCellHoverIn", je(e));
                                }catch(error){
                                    console.log(error)
                                }
                            }, 150));
                    })
                    .on("mouseleave", function () {
                        clearTimeout(A), !be && p && ((p = !1), he("onCellHoverOut", je(ct(this))));
                    }),
                P &&
                    ct(".mbsc-cal-slide-a .mbsc-cal-txt", n)
                        .on("mouseenter", function () {
                            var e = ct(this).attr("data-id");
                            ct('.mbsc-cal-txt[data-id="' + e + '"]', n).addClass("mbsc-hover");
                        })
                        .on("mouseleave", function () {
                            ct(".mbsc-cal-txt.mbsc-hover", n).removeClass("mbsc-hover");
                        }),
                he("onMonthLoaded", { year: t, month: s }),
                he("onPageLoaded", { firstDay: e });
        }
        function Fe(e, t) {
            var s,
                n = ue.getYear(e),
                a = '<div class="mbsc-cal-slide"' + Ve(t) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">';
            for (s = 0; s < 12; s++)
                s && s % 3 == 0 && (a += '</div><div role="row" class="mbsc-cal-row">'),
                    (a +=
                        '<div role="gridcell" tabindex="-1" aria-label="' +
                        n +
                        '" data-val="' +
                        n +
                        '" class="mbsc-cal-cell mbsc-btn-e ' +
                        (n < Q || G < n ? " mbsc-disabled " : "") +
                        (n == ue.getYear(C) ? N : "") +
                        '"><div class="mbsc-cal-cell-i mbsc-cal-cell-txt">' +
                        n +
                        xe +
                        "</div></div>"),
                    n++;
            return (a += "</div></div></div>");
        }
        function He(e, t) {
            var s,
                n,
                a,
                i,
                r,
                o,
                l,
                c,
                u,
                d,
                p,
                h,
                m,
                f,
                b,
                v,
                g,
                y,
                _ = 1,
                w = ue.getYear(e),
                x = ue.getMonth(e),
                C = ue.getDay(e),
                T = null !== ue.defaultValue || S._hasValue ? S.getDate(!0) : null,
                M = ue.getDate(w, x, C).getDay(),
                k = 0 < E - M ? 7 : 0,
                D = '<div class="mbsc-cal-slide"' + Ve(t) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">';
            for (g = 0; g < 7 * O; g++)
                (v = g + E - k),
                    (i = (n = ue.getDate(w, x, v - M + C)).getFullYear()),
                    (r = n.getMonth()),
                    (o = n.getDate()),
                    (l = ue.getMonth(n)),
                    (c = ue.getDay(n)),
                    (b = ue.getMaxDayOfMonth(i, r)),
                    (u = i + "-" + (r + 1) + "-" + o),
                    (s = "none" !== (d = ut({ valid: !((y = n) < J || q < y || (void 0 !== $[y] && void 0 === me[y])), selected: T && bt(T, n) }, Ne(n))).background && d.background),
                    (p = d.valid),
                    (h = d.selected),
                    (a = d.cssClass),
                    (m = new Date(n).setHours(12, 0, 0, 0) === new Date().setHours(12, 0, 0, 0)),
                    (f = l !== x),
                    (V[u] = d),
                    g && g % 7 == 0 && (D += '</div><div role="row" class="mbsc-cal-row">'),
                    ve &&
                        g % 7 == 0 &&
                        ("month" == ve && f && 1 < _ ? (_ = 1 == o ? 1 : 2) : "year" == ve && (_ = ue.getWeekNumber(ue.getDate(i, r, o + ((7 - E + 1) % 7)))),
                        (D += '<div role="gridcell" class="mbsc-cal-cell mbsc-cal-week-nr">' + _ + "</div>"),
                        _++),
                    (D +=
                        '<div role="gridcell" aria-label="' +
                        (m ? ue.todayText + ", " : "") +
                        ue.dayNames[n.getDay()] +
                        ", " +
                        ue.monthNames[l] +
                        " " +
                        c +
                        " " +
                        (d.ariaLabel ? ", " + d.ariaLabel : "") +
                        '"' +
                        (f && !pe ? ' aria-hidden="true"' : ' data-full="' + u + '"') +
                        (f || !p ? ' aria-disabled="true"' : "") +
                        (h ? ' aria-selected="true"' : "") +
                        (p ? ' tabindex="-1"' : "") +
                        ' class="mbsc-cal-cell mbsc-cal-day mbsc-cal-day' +
                        (v % 7) +
                        " " +
                        (ue.dayClass || "") +
                        " " +
                        (h ? N : "") +
                        (m ? " " + ue.todayClass : "") +
                        (a ? " " + a : "") +
                        (1 == c ? " mbsc-cal-day-first" : "") +
                        (c == b ? " mbsc-cal-day-last" : "") +
                        (f ? " mbsc-cal-day-diff" : "") +
                        (p ? " mbsc-btn-e" : " mbsc-disabled") +
                        (d.marked ? " mbsc-cal-day-marked" : "") +
                        (s ? " mbsc-cal-day-colored" : "") +
                        '"><div class="mbsc-cal-cell-i mbsc-cal-day-i"><div class="mbsc-cal-day-date mbsc-cal-cell-txt"' +
                        (s ? ' style="background:' + s + ";color:" + at(s) + '"' : "") +
                        ">" +
                        c +
                        "</div>" +
                        (d.markup ? '<div class="mbsc-cal-day-markup">' + d.markup + "</div>" : "") +
                        "</div></div>");
            return (D += "</div></div></div>");
        }
        function Ye(e, t, s) {
            var n,
                a = ue.getYear(e),
                i = ue.getMonth(e),
                r = M ? M.pos : 0,
                o = "";
            if (((V = {}), O)) for (t || (he("onMonthLoading", { year: a, month: i }), he("onPageLoading", { firstDay: e })), Ie(e), n = 0; n < le; n++) o += He(Ze(e, n - oe - ie), r * ce + n - ie);
            return (ae = void 0), s && M && ((M.$active = null), M.$scroller.html(o), $e(e, a, i)), o;
        }
        function Ue(e, t) {
            if (M) {
                var s = M.$active;
                s && s.length && (s[0].blur(), s.hasClass("mbsc-disabled") ? s.removeAttr("tabindex") : s.attr("tabindex", "-1")),
                    (M.$active = ct('.mbsc-cal-slide-a .mbsc-cal-day[data-full="' + mt(e) + '"]', M.$scroller).attr("tabindex", "0")),
                    t && M.$active.length && M.$active[0].focus();
            }
        }
        function Re(e, t) {
            ct(".mbsc-selected", t).removeClass(N).removeAttr("aria-selected"),
                ct('.mbsc-cal-cell[data-val="' + e + '"]', t)
                    .addClass(N)
                    .attr("aria-selected", "true");
        }
        function We(e, t, s, n) {
            var a, i, r, o;
            fe &&
                (e < J && (e = J),
                q < e && (e = q),
                ("calendar" !== fe && I && !t) ||
                    ((S._isSetDate = !t),
                    D &&
                        O &&
                        ((i = Je(Ee(e), m)),
                        ne && (e < Ze(C, -oe) || e >= Ze(C, re - oe)) && (a = m ? ue.getMonth(i) - ue.getMonth(C) + 12 * (ue.getYear(i) - ue.getYear(C)) : Math.floor(pt(C, i) / (7 * O))) && ((M.queue = []), (M.focus = n && s), Qe(M, a, s)),
                        (a && s) || Ue(e, n),
                        t ||
                            ((r = e),
                            (o = M && M.$scroller),
                            ue.highlight &&
                                M &&
                                (ct(".mbsc-selected", o).removeClass(N).removeAttr("aria-selected"),
                                (null === ue.defaultValue && !S._hasValue) ||
                                    ct('.mbsc-cal-day[data-full="' + mt(r) + '"]', o)
                                        .addClass(N)
                                        .attr("aria-selected", "true"))),
                        m || a || ze(C, !0),
                        (l = e),
                        (ne = !0)),
                    S._onSetDate(e, a),
                    (S._isSetDate = !1)));
        }
        function ze(e, t) {
            var s,
                n,
                a,
                i,
                r = ue.getYear(e),
                o = ue.getMonth(e),
                l = r + xe;
            if (L) {
                if ((Re(o, se.$scroller), Re(r, we.$scroller), Qe(we, Math.floor(r / 12) - Math.floor(ue.getYear(we.first) / 12), !0), ct(".mbsc-cal-cell", se.$scroller).removeClass("mbsc-disabled"), r === Q))
                    for (s = 0; s < K; s++) ct('.mbsc-cal-cell[data-val="' + s + '"]', se.$scroller).addClass("mbsc-disabled");
                if (r === G) for (s = X + 1; s <= 12; s++) ct('.mbsc-cal-cell[data-val="' + s + '"]', se.$scroller).addClass("mbsc-disabled");
            }
            for (
                t ||
                    (qe(ct(".mbsc-cal-prev-m", b), Ze(e, -oe) <= J),
                    qe(ct(".mbsc-cal-next-m", b), Ze(e, re - oe) > q),
                    qe(ct(".mbsc-cal-prev-y", b), ue.getDate(r - 1, o + 1, 1) <= J),
                    qe(ct(".mbsc-cal-next-y", b), ue.getDate(r + 1, o, 1) > q)),
                    c.attr("aria-label", r).html(l),
                    s = 0;
                s < re;
                s++
            )
                (i = Ze(e, s - oe)) <= de && de < Ze(i, 1) && (i = de),
                    (n = ue.getYear(i)),
                    (a = ue.getMonth(i)),
                    (l = n + xe),
                    v
                        .eq(s)
                        .attr("aria-label", ue.monthNames[a] + (ye ? "" : " " + r))
                        .html((!ye && _e < ee ? l + " " : "") + te[a] + (!ye && ee < _e ? " " + l : ""));
        }
        function qe(e, t) {
            t ? e.addClass(s).attr("aria-disabled", "true") : e.removeClass(s).removeAttr("aria-disabled");
        }
        function je(e) {
            var t = e[0],
                s = e.attr("data-full"),
                n = s ? s.split("-") : [],
                a = dt(n[0], n[1] - 1, n[2]),
                i = e.hasClass("mbsc-selected");
            return ut(V[s], { date: a, target: t, selected: i });
        }
        function Be(e, t) {
            var s = S.getDate(!0),
                n = je(e),
                a = e[0],
                i = n.date,
                r = dt(i.getFullYear(), i.getMonth(), i.getDate(), s.getHours(), s.getMinutes(), s.getSeconds()),
                o = ct(t.target),
                l = o[0];
            if (pe || !e.hasClass("mbsc-cal-day-diff")) {
                if (((n.date = r), P && a.contains(l)))
                    for (; l != a; ) {
                        if (o.hasClass("mbsc-cal-txt") || o.hasClass("mbsc-cal-txt-more")) {
                            var c = o.attr("data-index"),
                                u = R[i];
                            if (!1 === he("onLabelTap", { date: r, domEvent: t, target: o[0], labels: u, label: u[c] })) return;
                            break;
                        }
                        l = (o = o.parent())[0];
                    }
                !1 === he("onDayChange", n) || ue.readonly || e.hasClass("mbsc-disabled") || S._selectDay(e, i, r, n.selected);
            }
        }
        function Xe(e) {
            ke(a), We(ue.getDate(ue.getYear(M.first), e.attr("data-val"), 1), !0, !0);
        }
        function Ge(e) {
            ke(r), We(ue.getDate(e.attr("data-val"), ue.getMonth(M.first), 1), !0, !0);
        }
        function Je(e, t, s) {
            var n = ue.getYear(e),
                a = ue.getMonth(e),
                i = e.getDay(),
                r = 0 < E - i ? 7 : 0;
            return t ? ue.getDate(n, a, 1) : ue.getDate(n, a, (void 0 === s ? E : s) - r - i + ue.getDay(e));
        }
        function Ze(e, t) {
            var s = ue.getYear(e),
                n = ue.getMonth(e),
                a = ue.getDay(e);
            return m ? ue.getDate(s, n + t, 1) : ue.getDate(s, n, a + t * O * 7);
        }
        function Ke(e, t) {
            var s = 12 * Math.floor(ue.getYear(e) / 12);
            return ue.getDate(s + 12 * t, 0, 1);
        }
        function Qe(e, t, s, n) {
            t &&
                S._isVisible &&
                (e.queue.push(arguments),
                1 == e.queue.length &&
                    (function n(a, i, e, r) {
                        var o,
                            l,
                            t = "",
                            c = a.$scroller,
                            u = a.buffer,
                            d = a.offset,
                            s = a.pages,
                            p = a.total,
                            h = a.first,
                            m = a.genPage,
                            f = a.getFirst,
                            b = 0 < i ? Math.min(i, u) : Math.max(i, -u),
                            v = a.pos * ce + b - i + d,
                            g = Math.abs(i) > u;
                        a.callback && (a.load(), a.callback(!0));
                        a.first = f(h, i);
                        a.pos += b * ce;
                        a.changing = !0;
                        a.load = function () {
                            if (g) {
                                for (o = 0; o < s; o++) t += m(f(h, (l = i + o - d)), v + l);
                                0 < i ? (ct(".mbsc-cal-slide", c).slice(-s).remove(), c.append(t)) : i < 0 && (ct(".mbsc-cal-slide", c).slice(0, s).remove(), c.prepend(t));
                            }
                        };
                        a.callback = function (e) {
                            var t = Math.abs(b),
                                s = "";
                            if (S._isVisible) {
                                for (o = 0; o < t; o++) s += m(f(h, (l = i + o - d - u + (0 < i ? p - t : 0))), v + l);
                                if ((0 < i ? (c.append(s), ct(".mbsc-cal-slide", c).slice(0, b).remove()) : i < 0 && (c.prepend(s), ct(".mbsc-cal-slide", c).slice(b).remove()), g)) {
                                    for (s = "", o = 0; o < t; o++) s += m(f(h, (l = i + o - d - u + (0 < i ? 0 : p - t))), v + l);
                                    0 < i ? (ct(".mbsc-cal-slide", c).slice(0, b).remove(), c.prepend(s)) : i < 0 && (ct(".mbsc-cal-slide", c).slice(b).remove(), c.append(s));
                                }
                                tt(a), r && !e && r(), (a.callback = null), (a.load = null), a.queue.shift(), (g = !1), a.queue.length ? n.apply(this, a.queue[0]) : ((a.changing = !1), a.onAfterChange(a.first));
                            }
                        };
                        a.onBeforeChange(a.first);
                        a.load && (a.load(), a.scroller.scroll(-a.pos * a.size, e ? 200 : 0, !1, a.callback));
                    })(e, t, s, n));
        }
        function et(e, t, s, n, a, i, r, o, l, c, u, d, p) {
            var h = U ? "Y" : "X",
                m = { $scroller: ct(".mbsc-cal-scroll", e), queue: [], buffer: n, offset: a, pages: i, first: o, total: r, pos: 0, min: t, max: s, genPage: d, getFirst: p, onBeforeChange: c, onAfterChange: u };
            return (
                (m.scroller = new Ot(e, {
                    axis: h,
                    easing: "",
                    contSize: 0,
                    maxSnapScroll: n,
                    mousewheel: void 0 === ue.mousewheel ? U : ue.mousewheel,
                    time: 200,
                    lock: !0,
                    rtl: Y,
                    stopProp: !1,
                    minScroll: 0,
                    maxScroll: 0,
                    onBtnTap: function (e) {
                        "touchend" == e.domEvent.type && ot(), l(ct(e.target), e.domEvent);
                    },
                    onStart: function () {
                        clearTimeout(A);
                    },
                    onGestureStart: function () {
                        H = !0;
                    },
                    onAnimationStart: function () {
                        m.changing = !0;
                    },
                    onAnimationEnd: function (e) {
                        (H = !1), d && Qe(m, Math.round((-m.pos * m.size - e["pos" + h]) / m.size) * ce);
                    },
                })),
                S._scrollers.push(m.scroller),
                m
            );
        }
        function tt(e, t) {
            var s,
                n = 0,
                a = 0,
                i = e.first;
            if (!e.changing || !t) {
                if (e.getFirst) {
                    for (n = e.buffer, a = e.buffer; a && e.getFirst(i, a + e.pages - e.offset - 1) > e.max; ) a--;
                    for (; n && e.getFirst(i, 1 - n - e.offset) <= e.min; ) n--;
                }
                (s = Math.round(y / e.pages)),
                    F && s && e.size != s && e.$scroller[U ? "height" : "width"](s),
                    ut(e.scroller.settings, { snap: s, minScroll: (-e.pos * ce - a) * s, maxScroll: (-e.pos * ce + n) * s }),
                    (e.size = s),
                    e.scroller.refresh();
            }
        }
        function st(e) {
            S._onRefresh(e), S._isVisible && D && O && (M && M.changing ? (ae = e) : (Ye(C, e, !0), Ue(l)));
        }
        function nt(e) {
            be = "touchstart" === e.type;
        }
        return (
            (w = {}),
            (x = []),
            (T = {}),
            (he = S.trigger),
            (Ce = ut({}, S.settings)),
            (t = (ue = ut(S.settings, Wt, Ce)).controls.join(",")),
            (E = ue.firstDay),
            (Y = ue.rtl),
            (ie = ue.pageBuffer),
            (ve = ue.weekCounter),
            (O = ue.weeks),
            (m = 6 == O),
            (U = "vertical" == ue.calendarScroll),
            (o = S._getRespCont()),
            (ge = "full" == ue.weekDays ? "" : "min" == ue.weekDays ? "Min" : "Short"),
            (n = ue.layout || ("inline" == ue.display || (/top|bottom/.test(ue.display) && ue.touchUi) ? "liquid" : "")),
            (_ = (F = "liquid" == n) ? null : ue.calendarWidth),
            (ce = Y && !U ? -1 : 1),
            (s = "mbsc-disabled " + (ue.disabledClass || "")),
            (u = "mbsc-selected " + (ue.selectedTabClass || "")),
            (N = "mbsc-selected " + (ue.selectedClass || "")),
            (B = Math.max(1, Math.floor(((ue.calendarHeight || 0) / O - 45) / 18))),
            t.match(/calendar/) && ((w.calendar = 1), (D = !0)),
            t.match(/date/) && !D && (w.date = 1),
            t.match(/time/) && (w.time = 1),
            ue.controls.forEach(function (e) {
                w[e] && x.push(e);
            }),
            (L = ue.quickNav && D && m),
            (ye = ue.yearChange && m),
            F && D && "center" == ue.display && (S._isFullScreen = !0),
            (ue.layout = n),
            (ue.preset = (w.date || D ? "date" : "") + (w.time ? "time" : "")),
            (e = At.call(this, S)),
            (te = ye ? ue.monthNamesShort : ue.monthNames),
            (xe = ue.yearSuffix || ""),
            (ee = (ue.dateWheels || ue.dateFormat).search(/m/i)),
            (_e = (ue.dateWheels || ue.dateFormat).search(/y/i)),
            (k = S._format),
            ue.min && ((J = ht(ft(ue.min, k, ue))), (Q = ue.getYear(J)), (K = ue.getMonth(J)), (Z = ue.getDate(12 * Math.floor(Q / 12), 0, 1))),
            ue.max && ((q = ht(ft(ue.max, k, ue))), (G = ue.getYear(q)), (X = ue.getMonth(q)), (j = ue.getDate(12 * Math.floor(G / 12), 0, 1))),
            (S._minDate = J),
            (S._maxDate = q),
            (S.refresh = function () {
                st(!1);
            }),
            (S.redraw = function () {
                st(!0);
            }),
            (S.navigate = function (e, t) {
                We(ft(e, k, ue), !0, t);
            }),
            (S.changeTab = function (e) {
                S._isVisible &&
                    w[e] &&
                    fe != e &&
                    ((fe = e),
                    ct(".mbsc-cal-tab", b).removeClass(u).removeAttr("aria-selected"),
                    ct('.mbsc-cal-tab[data-control="' + e + '"]', b)
                        .addClass(u)
                        .attr("aria-selected", "true"),
                    I && (g.addClass("mbsc-cal-h"), w[fe].removeClass("mbsc-cal-h")),
                    "calendar" == fe && We(S.getDate(!0), !1, !0),
                    S._showDayPicker(),
                    S.trigger("onTabChange", { tab: fe }));
            }),
            (S._checkSize = !0),
            (S._onGenMonth = rt),
            (S._onSetDate = rt),
            (S._onRefresh = rt),
            (S._getDayProps = rt),
            (S._prepareObj = Oe),
            (S._showDayPicker = function () {
                L && (ke(r), ke(a));
            }),
            (S._selectDay = S.__selectDay = function (e, t, s) {
                var n = S.live;
                (ne = ue.outerMonthChange), (h = !0), S.setDate(s, n, 1e3, !n, !0), n && he("onSet", { valueText: S._value });
            }),
            (S._checkBtn = qe),
            ut(e, {
                labels: null,
                compClass: "mbsc-calendar mbsc-dt mbsc-sc",
                onMarkupReady: function (e) {
                    var s,
                        n,
                        t = 0;
                    (b = ct(e.target)),
                        (i = ct(".mbsc-fr-c", b)),
                        (l = S.getDate(!0)),
                        (y = 0),
                        D &&
                            ((d = !((!ue.marked && !ue.data) || ue.labels || ue.multiLabel || ue.showEventCount)),
                            (ne = !0),
                            (fe = "calendar"),
                            (re = "auto" == ue.months ? Math.max(1, Math.min(3, Math.floor((_ || lt(o)) / 280))) : +ue.months),
                            (le = re + 2 * ie),
                            (U = U && re < 2),
                            (pe = void (oe = 0) === ue.showOuterDays ? (re < 2 && !U) || !m : ue.showOuterDays),
                            (C = Je(Ee(l), m)),
                            i.append(
                                (function () {
                                    var e,
                                        t,
                                        s,
                                        n,
                                        a,
                                        i,
                                        r = "",
                                        o = Y ? ue.btnCalNextClass : ue.btnCalPrevClass,
                                        l = Y ? ue.btnCalPrevClass : ue.btnCalNextClass;
                                    for (
                                        a =
                                            '<div class="mbsc-cal-btn-w"><div data-step="-1" role="button" tabindex="0" aria-label="' +
                                            ue.prevMonthText +
                                            '" class="' +
                                            o +
                                            ' mbsc-cal-prev mbsc-cal-prev-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div>',
                                            t = 0;
                                        t < (O ? re : 1);
                                        t++
                                    )
                                        a += '<div role="button" class="mbsc-cal-month"></div>';
                                    if (
                                        ((a += '<div data-step="1" role="button" tabindex="0" aria-label="' + ue.nextMonthText + '" class="' + l + ' mbsc-cal-next mbsc-cal-next-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div></div>'),
                                        ye &&
                                            (r =
                                                '<div class="mbsc-cal-btn-w"><div data-step="-12" role="button" tabindex="0" aria-label="' +
                                                ue.prevYearText +
                                                '" class="' +
                                                o +
                                                ' mbsc-cal-prev mbsc-cal-prev-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div><div role="button" class="mbsc-cal-year"></div><div data-step="12" role="button" tabindex="0" aria-label="' +
                                                ue.nextYearText +
                                                '" class="' +
                                                l +
                                                ' mbsc-cal-next mbsc-cal-next-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div></div>'),
                                        O && (i = Ye(C)),
                                        (e =
                                            '<div class="mbsc-w-p mbsc-cal-c"><div class="mbsc-cal ' +
                                            (m ? "" : " mbsc-cal-week-view") +
                                            (1 < re ? " mbsc-cal-multi " : "") +
                                            (ve ? " mbsc-cal-weeks " : "") +
                                            (U ? " mbsc-cal-vertical" : "") +
                                            (d ? " mbsc-cal-has-marks" : "") +
                                            (P ? " mbsc-cal-has-labels" : "") +
                                            (pe ? "" : " mbsc-cal-hide-diff ") +
                                            (ue.calendarClass || "") +
                                            '"' +
                                            (F ? "" : ' style="width:' + (_ || 280 * re) + 'px;"') +
                                            '><div class="mbsc-cal-hdr">' +
                                            (_e < ee || 1 < re ? r + a : a + r) +
                                            "</div>"),
                                        O)
                                    ) {
                                        for (e += '<div class="mbsc-cal-body"><div class="mbsc-cal-day-picker"><div class="mbsc-cal-days-c">', s = 0; s < re; s++) {
                                            for (e += '<div class="mbsc-cal-days">', t = 0; t < 7; t++) e += '<div class="mbsc-cal-week-day' + (n = (t + E) % 7) + '" aria-label="' + ue.dayNames[n] + '">' + ue["dayNames" + ge][n] + "</div>";
                                            e += "</div>";
                                        }
                                        e +=
                                            '</div><div class="mbsc-cal-scroll-c mbsc-cal-day-scroll-c ' +
                                            (ue.calendarClass || "") +
                                            '"' +
                                            (ue.calendarHeight ? ' style="height:' + ue.calendarHeight + 'px"' : "") +
                                            '><div class="mbsc-cal-scroll" style="width:' +
                                            100 / re +
                                            '%">' +
                                            i +
                                            "</div></div>";
                                    }
                                    if (((e += "</div>"), L)) {
                                        for (e += '<div class="mbsc-cal-month-picker mbsc-cal-picker mbsc-cal-h"><div class="mbsc-cal-scroll-c ' + (ue.calendarClass || "") + '"><div class="mbsc-cal-scroll">', t = 0; t < 3; t++) {
                                            for (e += '<div class="mbsc-cal-slide"' + Ve(t - 1) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">', s = 0; s < 12; s++)
                                                s && s % 3 == 0 && (e += '</div><div role="row" class="mbsc-cal-row">'),
                                                    (e +=
                                                        '<div role="gridcell"' +
                                                        (1 == t ? ' tabindex="-1" aria-label="' + ue.monthNames[s] + '" data-val="' + s + '"' : "") +
                                                        ' class="mbsc-cal-cell' +
                                                        (1 == t ? " mbsc-btn-e" : "") +
                                                        '"><div class="mbsc-cal-cell-i mbsc-cal-cell-txt">' +
                                                        (1 == t ? ue.monthNamesShort[s] : "&nbsp;") +
                                                        "</div></div>");
                                            e += "</div></div></div>";
                                        }
                                        for (
                                            e += "</div></div></div>",
                                                e += '<div class="mbsc-cal-year-picker mbsc-cal-picker mbsc-cal-h"><div class="mbsc-cal-scroll-c ' + (ue.calendarClass || "") + '"><div class="mbsc-cal-scroll">',
                                                t = -1;
                                            t < 2;
                                            t++
                                        )
                                            e += Fe(Ke(C, t), t);
                                        e += "</div></div></div>";
                                    }
                                    return (e += "</div></div></div>");
                                })()
                            ),
                            (v = ct(".mbsc-cal-month", b)),
                            (c = ct(".mbsc-cal-year", b)),
                            (f = ct(".mbsc-cal-day-scroll-c", b))),
                        L && ((r = ct(".mbsc-cal-year-picker", b)), (a = ct(".mbsc-cal-month-picker", b))),
                        (g = ct(".mbsc-w-p", b)),
                        1 < x.length &&
                            i.before(
                                ((s = '<div class="mbsc-cal-tabs-c"><div class="mbsc-cal-tabs" role="tablist">'),
                                x.forEach(function (e, t) {
                                    (n = ue[("calendar" == e ? "date" : e) + "Text"]),
                                        (s +=
                                            '<div role="tab" aria-controls="' +
                                            Me.id +
                                            "-mbsc-pnl-" +
                                            t +
                                            '" class="mbsc-cal-tab mbsc-fr-btn-e ' +
                                            (t ? "" : u) +
                                            '" data-control="' +
                                            e +
                                            '"' +
                                            (ue.tabLink ? '><a href="#">' + n + "</a>" : ' tabindex="0">' + n) +
                                            "</div>");
                                }),
                                (s += "</div></div>"))
                            ),
                        ["date", "time", "calendar"].forEach(function (e) {
                            w[e] ? ((w[e] = g.eq(t)), t++) : "date" == e && !w.date && D && (g.eq(t).remove(), t++);
                        }),
                        x.forEach(function (e) {
                            i.append(w[e]);
                        }),
                        !D && w.date && w.date.css("position", "relative"),
                        (S._scrollers = []),
                        (function () {
                            if (D && O) {
                                var e = ct(".mbsc-cal-scroll-c", b);
                                (M = et(e[0], J, q, ie, oe, re, le, C, Be, Le, Ae, He, Ze)),
                                    L &&
                                        ((se = et(e[1], null, null, 1, 0, 1, 3, C, Xe)),
                                        (we = et(e[2], Z, j, 1, 0, 1, 3, C, Ge, rt, rt, Fe, Ke)),
                                        S.tap(v, function () {
                                            De(a), ke(r);
                                        }),
                                        S.tap(c, function () {
                                            De(r), ke(a);
                                        })),
                                    yt(ct(".mbsc-cal-btn", b), function (e, t, s, n) {
                                        Qe(M, t, !0, n);
                                    }),
                                    Ae(C),
                                    (null === ue.defaultValue && !S._hasValue) || S._multiple || (S._activeElm = M.$active[0]),
                                    it(f[0], "touchstart", nt, { passive: !0 }),
                                    it(f[0], "mousedown", nt),
                                    f.on("keydown", function (e) {
                                        var t,
                                            s = ue.getYear(l),
                                            n = ue.getMonth(l),
                                            a = ue.getDay(l);
                                        switch (e.keyCode) {
                                            case 32:
                                                Be(M.$active, e);
                                                break;
                                            case 37:
                                                t = ue.getDate(s, n, a - 1 * ce);
                                                break;
                                            case 39:
                                                t = ue.getDate(s, n, a + 1 * ce);
                                                break;
                                            case 38:
                                                t = ue.getDate(s, n, a - 7);
                                                break;
                                            case 40:
                                                t = ue.getDate(s, n, a + 7);
                                                break;
                                            case 36:
                                                t = ue.getDate(s, n, 1);
                                                break;
                                            case 35:
                                                t = ue.getDate(s, n + 1, 0);
                                                break;
                                            case 33:
                                                t = e.altKey ? ue.getDate(s - 1, n, a) : m ? ue.getDate(s, n - 1, a) : ue.getDate(s, n, a - 7 * O);
                                                break;
                                            case 34:
                                                t = e.altKey ? ue.getDate(s + 1, n, a) : m ? ue.getDate(s, n + 1, a) : ue.getDate(s, n, a + 7 * O);
                                        }
                                        t && (e.preventDefault(), We(t, !0, !1, !0));
                                    });
                            }
                            S.tap(ct(".mbsc-cal-tab", b), function () {
                                S.changeTab(ct(this).attr("data-control"));
                            });
                        })();
                },
                onShow: function () {
                    D && O && ze(C);
                },
                onHide: function () {
                    S._scrollers.forEach(function (e) {
                        e.destroy();
                    }),
                        (fe = we = se = M = V = null);
                },
                onValidated: function (e) {
                    var t,
                        s,
                        n = e.index,
                        a = S._order;
                    (s = S.getDate(!0)),
                        (de = s),
                        h ? (t = "calendar") : void 0 !== n && (t = a.dd == n || a.d == n || a.m == n || a.y == n ? "date" : "time"),
                        he("onSetDate", { date: s, control: t }),
                        "time" !== t && We(s, !1, !!e.time, h && !S._multiple),
                        (h = !1);
                },
                onPosition: function (e) {
                    var t,
                        s,
                        n,
                        a,
                        i,
                        r,
                        o,
                        l = e.oldHeight,
                        c = e.windowHeight;
                    if (
                        ((I = (e.hasTabs || !0 === ue.tabs || (!1 !== ue.tabs && F)) && 1 < x.length),
                        F && (e.windowWidth >= ue.breakPointMd ? ct(e.target).addClass("mbsc-fr-md") : ct(e.target).removeClass("mbsc-fr-md")),
                        I
                            ? (b.addClass("mbsc-cal-tabbed"), (fe = ct(".mbsc-cal-tab.mbsc-selected", b).attr("data-control")), g.addClass("mbsc-cal-h"), w[fe].removeClass("mbsc-cal-h"))
                            : (b.removeClass("mbsc-cal-tabbed"), g.removeClass("mbsc-cal-h")),
                        S._isFullScreen && (f.height(""), (o = c - (i = e.popup.offsetHeight) + f[0].offsetHeight), i <= c && f.height(o)),
                        P && O && c != l)
                    ) {
                        var u = o || f[0].offsetHeight,
                            d = f.find(".mbsc-cal-txt,.mbsc-cal-txt-ph")[0],
                            p = d.offsetTop,
                            h = d.offsetHeight,
                            m = Math.max(1, Math.floor((u / O - p) / (h + 2)));
                        B != m && ((B = m), S.redraw());
                    }
                    if (D && O) {
                        if (((a = (r = F || U || I ? f[0][U ? "offsetHeight" : "offsetWidth"] : _ || 280 * re) != y), (y = r), F && a && ye))
                            for (te = ue.maxMonthWidth > v[0].offsetWidth ? ue.monthNamesShort : ue.monthNames, s = ue.getYear(C), n = ue.getMonth(C), t = 0; t < re; t++) v.eq(t).text(te[ue.getMonth(ue.getDate(s, n - oe + t, 1))]);
                        a && tt(M, !0);
                    }
                    L && a && (tt(se, !0), tt(we, !0));
                },
            })
        );
    }
    var Wt = {
            controls: ["calendar"],
            firstDay: 0,
            weekDays: "short",
            maxMonthWidth: 170,
            breakPointMd: 768,
            months: 1,
            pageBuffer: 1,
            weeks: 6,
            highlight: !0,
            outerMonthChange: !0,
            quickNav: !0,
            yearChange: !0,
            tabs: "auto",
            todayClass: "mbsc-cal-today",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
            dateText: "Date",
            timeText: "Time",
            todayText: "Today",
            fromText: "Start",
            toText: "End",
            moreEventsText: "{count} more",
            prevMonthText: "Previous Month",
            nextMonthText: "Next Month",
            prevYearText: "Previous Year",
            nextYearText: "Next Year",
        },
        zt = {};
    Vt.calendar = function (c) {
        function i(e) {
            var t,
                s,
                n,
                a = null;
            if (((v = {}), e && e.length)) for (s = 0; s < e.length; s++) (t = ft(e[s], r, h, h.isoParts)), (a = a || t), (v[dt((n = t).getFullYear(), n.getMonth(), n.getDate())] = t);
            return a;
        }
        function u() {
            c.redraw();
        }
        var n,
            d,
            r,
            p,
            t,
            e = ut({}, c.settings),
            h = ut(c.settings, zt, e),
            m = "mbsc-selected " + (h.selectedClass || ""),
            s = h.defaultValue,
            f = "multiple" == h.select || 1 < h.select || "week" == h.selectType,
            b = ye(h.select) ? h.select : 1 / 0,
            v = {};
        return (
            (n = Rt.call(this, c)),
            (p = void 0 === h.firstSelectDay ? h.firstDay : h.firstSelectDay),
            (r = c._format),
            f && i(s),
            (c._multiple = f),
            (c._getDayProps = function (e) {
                return { selected: f ? void 0 !== v[e] : void 0 };
            }),
            (c._selectDay = function (e, t, s, n) {
                var a = "single" == h.select || 1 == h.select || void 0 === h.select;
                if (h.setOnDayTap && a && "inline" != h.display) return c.setDate(s), void c.select();
                if (f)
                    if ("week" == h.selectType) {
                        var i,
                            r,
                            o = t.getDay() - p;
                        for (o = o < 0 ? 7 + o : o, a && (v = {}), i = 0; i < 7; i++) (r = dt(t.getFullYear(), t.getMonth(), t.getDate() - o + i)), n ? delete v[r] : B(v).length / 7 < b && (v[r] = r);
                        u();
                    } else {
                        var l = ct('.mbsc-cal-day[data-full="' + e.attr("data-full") + '"]', d);
                        n ? (l.removeClass(m).removeAttr("aria-selected"), delete v[t]) : B(v).length < b && (l.addClass(m).attr("aria-selected", "true"), (v[t] = t));
                    }
                c.__selectDay(e, t, s);
            }),
            (c.setVal = function (e, t, s, n, a) {
                f && (e = i(e)), c._setVal(e, t, s, n, a), f && u();
            }),
            (c.getVal = function (e) {
                var t,
                    s = [];
                if (f) {
                    for (t in v) s.push(Xe(v[t], h, r));
                    return s;
                }
                return Xe(c.getDate(e), h, r);
            }),
            ut({}, n, {
                highlight: !f,
                outerMonthChange: !f,
                parseValue: function (e) {
                    return f && e && "string" == typeof e && (e = i(e.split(","))), f && s && s.length && (h.defaultValue = s[0]), n.parseValue.call(this, e);
                },
                formatValue: function (e) {
                    var t,
                        s = [];
                    if (f) {
                        for (t in v) s.push(qe(r, v[t], h));
                        return s.join(", ");
                    }
                    return n.formatValue.call(this, e, c);
                },
                onClear: function () {
                    f && ((v = {}), u());
                },
                onBeforeShow: function () {
                    void 0 !== h.setOnDayTap || (h.buttons && h.buttons.length) || 1 != h.controls.length || (h.setOnDayTap = !0),
                        h.setOnDayTap && "inline" != h.display && (h.outerMonthChange = !1),
                        h.counter &&
                            f &&
                            (h.headerText = function () {
                                var e = 0,
                                    t = "week" == h.selectType ? 7 : 1;
                                return (
                                    ct.each(v, function () {
                                        e++;
                                    }),
                                    ((1 < (e = Math.round(e / t)) && h.selectedPluralText) || h.selectedText).replace(/{count}/, e)
                                );
                            });
                },
                onMarkupReady: function (e) {
                    n.onMarkupReady.call(this, e), (d = ct(e.target)), f && (ct(".mbsc-fr-hdr", d).attr("aria-live", "off"), (t = ut({}, v)));
                },
                onCancel: function () {
                    !c.live && f && (v = ut({}, t));
                },
            })
        );
    };
    var qt = e.bool,
        jt = e.func,
        Bt = e.number,
        Xt = {
            controls: e.arrayOf(e.oneOf(["time", "date", "calendar"])),
            firstSelectDay: Bt,
            select: e.oneOfType([Bt, e.oneOf(["single", "multiple"])]),
            selectType: e.oneOf(["day", "week"]),
            setOnDayTap: qt,
            onEventSelect: jt,
            onSetDate: jt,
        },
        Gt = (function (s) {
            function e(e) {
                var t;
                return ((t = s.call(this, e) || this).mbscInit = { preset: "calendar" }), t;
            }
            return l(e, s), e;
        })(ze);
    (Gt.propTypes = g({}, Gt.propTypes, {}, Ae, {}, $e, {}, Fe, {}, Xt)), (se.Calendar = Gt);
    var Jt = { wheelOrder: "hhiiss", useShortLabels: !1, min: 0, max: 1 / 0, labels: ["Years", "Months", "Days", "Hours", "Minutes", "Seconds"], labelsShort: ["Yrs", "Mths", "Days", "Hrs", "Mins", "Secs"] };
    Vt.timespan = function (d) {
        function p(s) {
            var n = {};
            return (
                ct(b).each(function (e, t) {
                    (n[t] = y[t] ? Math.floor(s / v[t].limit) : 0), (s -= n[t] * v[t].limit);
                }),
                n
            );
        }
        function r(e, t, s) {
            return (e < 10 && t ? "0" : "") + e + '<span class="mbsc-ts-lbl">' + s + "</span>";
        }
        function h(s) {
            var n = 0;
            return (
                ct.each(u, function (e, t) {
                    isNaN(+s[0]) || (n += v[t.v].limit * s[e]);
                }),
                n
            );
        }
        var o,
            s,
            i,
            m,
            f,
            e = ut({}, d.settings),
            l = ut(d.settings, Jt, e),
            c = l.wheelOrder,
            t = l.useShortLabels ? l.labelsShort : l.labels,
            b = ["years", "months", "days", "hours", "minutes", "seconds"],
            v = {
                years: { ord: 0, index: 6, until: 10, limit: 31536e6, label: t[0], re: "y", wheel: {} },
                months: { ord: 1, index: 5, until: 11, limit: 2592e6, label: t[1], re: "m", wheel: {} },
                days: { ord: 2, index: 4, until: 31, limit: 864e5, label: t[2], re: "d", wheel: {} },
                hours: { ord: 3, index: 3, until: 23, limit: 36e5, label: t[3], re: "h", wheel: {} },
                minutes: { ord: 4, index: 2, until: 59, limit: 6e4, label: t[4], re: "i", wheel: {} },
                seconds: { ord: 5, index: 1, until: 59, limit: 1e3, label: t[5], re: "s", wheel: {} },
            },
            u = [],
            g = l.steps || [],
            y = {},
            _ = "seconds",
            w = l.defaultValue || Math.max(l.min, Math.min(0, l.max)),
            n = [[]];
        return (
            ct(b).each(function (e, t) {
                -1 < (s = c.search(new RegExp(v[t].re, "i"))) && (u.push({ o: s, v: t }), v[t].index > v[_].index && (_ = t));
            }),
            u.sort(function (e, t) {
                return e.o > t.o ? 1 : -1;
            }),
            ct.each(u, function (e, t) {
                (y[t.v] = e + 1), n[0].push(v[t.v].wheel);
            }),
            (m = p(l.min)),
            (f = p(l.max)),
            ct.each(u, function (e, t) {
                !(function (e) {
                    var t = !1,
                        s = g[y[e] - 1] || 1,
                        n = v[e],
                        a = n.label,
                        i = n.wheel;
                    if (((i.data = []), (i.label = n.label), c.match(new RegExp(n.re + n.re, "i")) && (t = !0), e == _))
                        (i.min = m[e]),
                            (i.max = f[e]),
                            (i.data = function (e) {
                                return { value: e * s, display: r(e * s, t, a) };
                            }),
                            (i.getIndex = function (e) {
                                return Math.round(e / s);
                            });
                    else for (o = 0; o <= n.until; o += s) i.data.push({ value: o, display: r(o, t, a) });
                })(t.v);
            }),
            (d.getVal = function (e, t) {
                return t ? d._getVal(e) : d._hasValue || e ? h(d.getArrayVal(e)) : null;
            }),
            {
                minWidth: 100,
                showLabel: !0,
                wheels: n,
                compClass: "mbsc-ts mbsc-sc",
                parseValue: function (s) {
                    var n,
                        a = [];
                    return (
                        ye(s) || !s
                            ? ((i = p(s || w)),
                              ct.each(u, function (e, t) {
                                  a.push(i[t.v]);
                              }))
                            : ct.each(u, function (e, t) {
                                  (n = new RegExp("(\\d+)\\s?(" + l.labels[v[t.v].ord] + "|" + l.labelsShort[v[t.v].ord] + ")", "gi").exec(s)), a.push(n ? n[1] : 0);
                              }),
                        ct(a).each(function (e, t) {
                            var s, n;
                            a[e] = ((s = t), (n = g[e] || 1), Math.floor(s / n) * n);
                        }),
                        a
                    );
                },
                formatValue: function (s) {
                    var n = "";
                    return (
                        ct.each(u, function (e, t) {
                            n += +s[e] ? s[e] + " " + v[t.v].label + " " : "";
                        }),
                        n ? n.replace(/\s+$/g, "") : 0
                    );
                },
                validate: function (e) {
                    var s,
                        n,
                        a,
                        i,
                        r = e.values,
                        o = e.direction,
                        l = [],
                        c = !0,
                        u = !0;
                    return (
                        ct(b).each(function (e, t) {
                            if (void 0 !== y[t]) {
                                if (((a = y[t] - 1), (l[a] = []), (i = {}), t != _)) {
                                    if (c) for (n = f[t] + 1; n <= v[t].until; n++) i[n] = !0;
                                    if (u) for (n = 0; n < m[t]; n++) i[n] = !0;
                                }
                                (r[a] = d.getValidValue(a, r[a], o, i)),
                                    (s = p(h(r))),
                                    (c = c && s[t] == f[t]),
                                    (u = u && s[t] == m[t]),
                                    ct.each(i, function (e) {
                                        l[a].push(e);
                                    });
                            }
                        }),
                        { disabled: l }
                    );
                },
            }
        );
    };
    var Zt = e.number,
        Kt = e.string,
        Qt = { defaultValue: Zt, max: Zt, min: Zt, steps: e.arrayOf(Zt), useShortLabels: e.bool, wheelOrder: Kt, labels: e.arrayOf(Kt), labelsShort: e.arrayOf(Kt) },
        es = (function (s) {
            function e(e) {
                var t;
                return ((t = s.call(this, e) || this).mbscInit = { preset: "timespan" }), t;
            }
            return l(e, s), e;
        })(ze);
    (es.propTypes = g({}, es.propTypes, {}, Ae, {}, Qt)), (se.Timespan = es);
    var ts = { autoCorrect: !0, showSelector: !0, minRange: 1, rangeTap: !0 };
    Vt.range = function (l) {
        function s(e, t) {
            e && (e.setFullYear(t.getFullYear()), e.setMonth(t.getMonth()), e.setDate(t.getDate()));
        }
        function n(e, t) {
            var s = l._order,
                n = new Date(e);
            return void 0 === s.h && n.setHours(t ? 23 : 0), void 0 === s.i && n.setMinutes(t ? 59 : 0), void 0 === s.s && n.setSeconds(t ? 59 : 0), n.setMilliseconds(t ? 999 : 0), n;
        }
        function t(e, t) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
        }
        function a(e) {
            b
                ? (C - w > V.maxRange - 1 && (e ? (w = new Date(Math.max(y, C - V.maxRange + 1))) : (C = new Date(Math.min(g, +w + V.maxRange - 1)))),
                  C - w < V.minRange - 1 && (e ? (w = new Date(Math.max(y, C - V.minRange + 1))) : (C = new Date(Math.min(g, +w + V.minRange - 1)))))
                : (Math.ceil((C - w) / I) > A && (e ? (w = n(Math.max(y, t(C, 1 - A)), !1)) : (C = n(Math.min(g, t(w, A - 1)), !0))),
                  Math.ceil((C - w) / I) < L && (e ? (w = n(Math.max(y, t(C, 1 - L)), !1)) : (C = n(Math.min(g, t(w, L - 1)), !0))));
        }
        function i(e, t) {
            var s = !0;
            return e && w && C && (a(O), a(!O)), (w && C) || (s = !1), t && o(), s;
        }
        function r() {
            k && h && (ct(".mbsc-range-btn", h).removeClass(F).removeAttr("aria-checked"), ct(".mbsc-range-btn", h).eq(O).addClass(F).attr("aria-checked", "true"));
        }
        function o() {
            var e,
                t,
                s,
                n,
                a,
                i = 0,
                r = P || !O ? " mbsc-cal-day-hl mbsc-cal-sel-start" : " mbsc-cal-sel-start",
                o = P || O ? " mbsc-cal-day-hl mbsc-cal-sel-end" : " mbsc-cal-sel-end";
            if (
                ((l.startVal = w ? qe(f, w, V) : ""),
                (l.endVal = C ? qe(f, C, V) : ""),
                h &&
                    (ct(".mbsc-range-btn-v-start", h).html(l.startVal || "&nbsp;"),
                    ct(".mbsc-range-btn-v-end", h).html(l.endVal || "&nbsp;"),
                    (e = w ? new Date(w) : null),
                    (s = C ? new Date(C) : null),
                    !e && s && (e = new Date(s)),
                    !s && e && (s = new Date(e)),
                    (a = O ? s : e),
                    ct(".mbsc-cal-day-picker .mbsc-cal-day-hl", h).removeClass(H),
                    ct(".mbsc-cal-day-picker .mbsc-selected", h)
                        .removeClass("mbsc-cal-sel-start mbsc-cal-sel-end " + F)
                        .removeAttr("aria-selected"),
                    e && s))
            )
                for (t = e.setHours(0, 0, 0, 0), n = s.setHours(0, 0, 0, 0); e <= s && i < 126; )
                    ct('.mbsc-cal-day[data-full="' + a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + '"]', h)
                        .addClass(F + " " + (a.getTime() === t ? r : "") + (a.getTime() === n ? o : ""))
                        .attr("aria-selected", "true"),
                        a.setDate(a.getDate() + (O ? -1 : 1)),
                        a.setHours(0, 0, 0, 0),
                        i++;
        }
        function c(e, t) {
            return { h: e ? e.getHours() : t ? 23 : 0, i: e ? e.getMinutes() : t ? 59 : 0, s: e ? e.getSeconds() : t ? 59 : 0 };
        }
        function u() {
            w && ((v = !0), l.setDate(w, !1, 0, !0), (w = l.getDate(!0))), C && ((v = !0), l.setDate(C, !1, 0, !0), (C = l.getDate(!0)));
        }
        function d(e) {
            me(e, this) && (l._showDayPicker(), l.setActiveDate(ct(this).attr("data-select")));
        }
        var p,
            h,
            m,
            f,
            b,
            v,
            g,
            y,
            _,
            w,
            x,
            C,
            T,
            M,
            k,
            D = l._startDate,
            S = l._endDate,
            O = 0,
            e = new Date(),
            N = ut({}, l.settings),
            V = ut(l.settings, ts, N),
            E = V.anchor,
            P = V.rangeTap,
            I = 864e5,
            L = Math.max(1, Math.ceil(V.minRange / I)),
            A = Math.max(1, Math.ceil(V.maxRange / I)),
            $ = "mbsc-disabled " + (V.disabledClass || ""),
            F = "mbsc-selected " + (V.selectedClass || ""),
            H = "mbsc-cal-day-hl",
            Y = null === V.defaultValue ? [] : V.defaultValue || [new Date(e.setHours(0, 0, 0, 0)), new Date(e.getFullYear(), e.getMonth(), e.getDate() + 6, 23, 59, 59, 999)];
        return (
            P && (V.tabs = !0),
            (p = Rt.call(this, l)),
            (f = l._format),
            (b = /time/i.test(V.controls.join(","))),
            (M = "time" === V.controls.join("")),
            (k = V.showSelector),
            (g = V.max ? n(ft(V.max, f, V), !0) : 1 / 0),
            (y = V.min ? n(ft(V.min, f, V), !1) : -1 / 0),
            (Y[0] = ft(Y[0], f, V, V.isoParts)),
            (Y[1] = ft(Y[1], f, V, V.isoParts)),
            V.startInput &&
                l.attachShow(ct(V.startInput), function () {
                    (O = 0), (V.anchor = E || ct(V.startInput));
                }),
            V.endInput &&
                l.attachShow(ct(V.endInput), function () {
                    (O = 1), (V.anchor = E || ct(V.endInput));
                }),
            (l._getDayProps = function (e, t) {
                var s = w ? new Date(w.getFullYear(), w.getMonth(), w.getDate()) : null,
                    n = C ? new Date(C.getFullYear(), C.getMonth(), C.getDate()) : null;
                return {
                    selected: s && n && s <= e && e <= C,
                    cssClass:
                        t.cssClass +
                        " " +
                        (((P || !O) && s && s.getTime() === e.getTime()) || ((P || O) && n && n.getTime() === e.getTime()) ? H : "") +
                        (s && s.getTime() === e.getTime() ? " mbsc-cal-sel-start" : "") +
                        (n && n.getTime() === e.getTime() ? " mbsc-cal-sel-end" : ""),
                };
            }),
            (l.setVal = function (e, t, s, n, a) {
                var i,
                    r = e || [];
                (w = ft(r[0], f, V, V.isoParts)),
                    (C = ft(r[1], f, V, V.isoParts)),
                    u(),
                    (l.startVal = w ? qe(f, w, V) : ""),
                    (l.endVal = C ? qe(f, C, V) : ""),
                    (i = p.parseValue(O ? C : w, l)),
                    n || ((l._startDate = D = w), (l._endDate = S = C)),
                    (_ = !0),
                    l._setVal(i, t, s, n, a);
            }),
            (l.getVal = function (e) {
                return e ? [Xe(w, V, f), Xe(C, V, f)] : l._hasValue ? [Xe(D, V, f), Xe(S, V, f)] : null;
            }),
            (l.setActiveDate = function (e) {
                var t;
                (O = "start" == e ? 0 : 1),
                    (t = "start" == e ? w : C),
                    l.isVisible() &&
                        (r(),
                        P || (ct(".mbsc-cal-table .mbsc-cal-day-hl", h).removeClass(H), t && ct('.mbsc-cal-day[data-full="' + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + '"]', h).addClass(H)),
                        t && ((v = !0), l.setDate(t, !1, 1e3, !0)));
            }),
            (l.getValue = l.getVal),
            ut({}, p, {
                highlight: !1,
                outerMonthChange: !1,
                formatValue: function () {
                    return l.startVal + (V.endInput ? "" : l.endVal ? " - " + l.endVal : "");
                },
                parseValue: function (e) {
                    var t = e ? e.split(" - ") : [],
                        s = V.startInput ? ct(V.startInput).val() : t[0],
                        n = V.endInput ? ct(V.endInput).val() : t[1];
                    return (
                        (V.defaultValue = Y[1]),
                        (S = n ? je(f, n, V) : Y[1]),
                        (V.defaultValue = Y[0]),
                        (D = s ? je(f, s, V) : Y[2]),
                        (V.defaultValue = Y[O]),
                        (l.startVal = D ? qe(f, D, V) : ""),
                        (l.endVal = S ? qe(f, S, V) : ""),
                        (l._startDate = D),
                        (l._endDate = S),
                        p.parseValue(O ? S : D, l)
                    );
                },
                onFill: function (e) {
                    var t;
                    (t = e.change),
                        (l._startDate = D = w),
                        (l._endDate = S = C),
                        V.startInput && (ct(V.startInput).val(l.startVal), t && ct(V.startInput).trigger("change")),
                        V.endInput && (ct(V.endInput).val(l.endVal), t && ct(V.endInput).trigger("change"));
                },
                onBeforeClose: function (e) {
                    if ("set" === e.button && !i(!0, !0)) return l.setActiveDate(O ? "start" : "end"), !1;
                },
                onHide: function () {
                    p.onHide.call(l), (O = 0), (h = null), (V.anchor = E);
                },
                onClear: function () {
                    P && (O = 0);
                },
                onBeforeShow: function () {
                    (w = D || Y[0]),
                        (C = S || Y[1]),
                        (x = c(w, 0)),
                        (T = c(C, 1)),
                        V.counter &&
                            (V.headerText = function () {
                                var e = w && C ? Math.max(1, Math.round((new Date(C).setHours(0, 0, 0, 0) - new Date(w).setHours(0, 0, 0, 0)) / 864e5) + 1) : 0;
                                return ((1 < e && V.selectedPluralText) || V.selectedText).replace(/{count}/, e);
                            }),
                        (_ = !0);
                },
                onMarkupReady: function (e) {
                    var t;
                    u(),
                        ((O && C) || (!O && w)) && ((v = !0), l.setDate(O ? C : w, !1, 0, !0)),
                        o(),
                        p.onMarkupReady.call(this, e),
                        (h = ct(e.target)).addClass("mbsc-range"),
                        k &&
                            ((t =
                                '<div class="mbsc-range-btn-t" role="radiogroup"><div class="mbsc-range-btn-c mbsc-range-btn-start"><div role="radio" data-select="start" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' +
                                V.fromText +
                                '<div class="mbsc-range-btn-v mbsc-range-btn-v-start">' +
                                (l.startVal || "&nbsp;") +
                                '</div></div></div><div class="mbsc-range-btn-c mbsc-range-btn-end"><div role="radio" data-select="end" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' +
                                V.toText +
                                '<div class="mbsc-range-btn-v mbsc-range-btn-v-end">' +
                                (l.endVal || "&nbsp;") +
                                "</div></div></div></div>"),
                            V.headerText ? ct(".mbsc-fr-hdr", h).after(t) : ct(".mbsc-fr-w", h).prepend(t),
                            r()),
                        ct(".mbsc-range-btn", h).each(function (e, t) {
                            it(t, "touchstart", d, { passive: !0 }), it(t, "click", d);
                        });
                },
                onDayChange: function (e) {
                    (e.active = O ? "end" : "start"), (m = !0);
                },
                onSetDate: function (e) {
                    var t;
                    v ||
                        ((t = n(e.date, O)),
                        (_ && !m) ||
                            (P && m && (1 == O && t < w && (O = 0), O ? t.setHours(T.h, T.i, T.s, 999) : t.setHours(x.h, x.i, x.s, 0)),
                            O ? ((C = new Date(t)), (T = c(C))) : ((w = new Date(t)), (x = c(w))),
                            M && V.autoCorrect && (s(w, t), s(C, t)),
                            P && m && !O && (C = null))),
                        M && !V.autoCorrect && C < w && (C = new Date(C.setDate(C.getDate() + 1))),
                        (l._isValid = i(_ || m || V.autoCorrect, !v)),
                        (e.active = O ? "end" : "start"),
                        !v && P && (m && (O = O ? 0 : 1), r()),
                        l.isVisible() && (l._isValid ? ct(".mbsc-fr-btn-s .mbsc-fr-btn", l._markup).removeClass($) : ct(".mbsc-fr-btn-s .mbsc-fr-btn", l._markup).addClass($)),
                        (v = _ = m = !1);
                },
                onTabChange: function (e) {
                    "calendar" != e.tab && l.setDate(O ? C : w, !1, 1e3, !0), i(!0, !0);
                },
            })
        );
    };
    var ss = e.string,
        ns = e.bool,
        as = e.number,
        is = e.func,
        rs = e.object,
        os = {
            autoCorrect: ns,
            controls: e.arrayOf(e.oneOf(["time", "date", "calendar"])),
            endInput: e.oneOfType([ss, rs]),
            maxRange: as,
            minRange: as,
            showSelector: ns,
            startInput: e.oneOfType([ss, rs]),
            fromText: ss,
            toText: ss,
            onSetDate: is,
        },
        ls = (function (t) {
            function e(e) {
                return t.call(this, e) || this;
            }
            l(e, t);
            var s = e.prototype;
            return (
                (s.componentDidMount = function () {
                    function e(e) {
                        var t = ct(i.findDOMNode(e));
                        return t.is("input") ? t : t.find("input");
                    }
                    var t = i.findDOMNode(this),
                        s = ct(t).find("input"),
                        n = {};
                    this.refs.start || this.refs.end
                        ? (this.refs.start && (n.startInput = e(this.refs.start)), this.refs.end && (n.endInput = e(this.refs.end)), (n.skipShow = !0))
                        : 2 == s.length
                        ? ((n.startInput = s[0]), (n.endInput = s[1]), (n.skipShow = !0))
                        : s.length && (t = s[0]);
                    var a = ut({ preset: "range" }, n, this.getSettingsFromProps(this.props));
                    (this.instance = new Ce.Scroller(t, a)), void 0 !== this.props.value && (this.instance.setVal(this.props.value, !0), this.updateForIonInput());
                }),
                (s.render = function () {
                    var s = this,
                        e = this.props,
                        t = e.readOnly,
                        n = e.disabled,
                        a = e.placeholder,
                        i = e.type,
                        r = e.children;
                    if (((i = i || "text"), this.isIonInput(r))) {
                        this.valueState = !0;
                        var o = this.instance ? this.instance._value : "";
                        return v.cloneElement(r, g({ value: o }, r.props));
                    }
                    return 1 === v.Children.count(r)
                        ? this.props.children
                        : 0 < v.Children.count(r)
                        ? v.createElement(
                              "div",
                              null,
                              v.Children.map(r, function (e) {
                                  var t = {};
                                  return (e.type !== cs && e.type !== us) || ((t.wrapper = s), (t.ref = e.type === cs ? "start" : "end")), v.cloneElement(e, t);
                              })
                          )
                        : v.createElement("input", { className: this.initialCssClass, type: i, readOnly: t, disabled: n, placeholder: a });
                }),
                e
            );
        })(We);
    (ls.propTypes = g({}, ls.propTypes, {}, Ae, {}, $e, {}, Fe, {}, os)), (se.Range = ls);
    var cs = (function (s) {
        function e(e) {
            var t;
            return r(b((t = s.call(this, e) || this)), "rangeIndex", 0), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidUpdate = function () {
                if (this.props.value) {
                    var e = this.props.wrapper.instance.getVal() || [null, null];
                    Ye(this.props.value, e[this.rangeIndex]) || ((e[this.rangeIndex] = this.props.value), this.props.wrapper.instance.setVal(e, !0));
                }
            }),
            (t.render = function () {
                var e = this.props,
                    t = (e.value, e.wrapper, y(e, ["value", "wrapper"]));
                return 1 === v.Children.count(this.props.children) ? this.props.children : this.props.children ? v.createElement("div", null, this.props.children) : v.createElement("input", t);
            }),
            e
        );
    })(v.Component);
    cs.propTypes = { value: e.oneOfType([e.string, e.object]) };
    var us = (function (s) {
        function e(e) {
            var t;
            return r(b((t = s.call(this, e) || this)), "rangeIndex", 1), t;
        }
        return l(e, s), e;
    })((se.RangeStart = cs));
    (us.propTypes = g({}, cs.propTypes)), (se.RangeEnd = us);
    var ds,
        ps = "mbsc-input-wrap",
        hs = ["touchend", "touchcancel", "mousedown", "mousemove", "mouseup", "mouseleave"],
        ms = { tap: D };
    function fs(e, t) {
        var s = {},
            n = e[0],
            a = e.parent(),
            i = a.find(".mbsc-err-msg"),
            r = e.attr("data-icon-align") || "left",
            o = e.attr("data-icon");
        a.hasClass(ps)
            ? (a = a.parent())
            : ct('<span class="' + ps + '"></span>')
                  .insertAfter(e)
                  .append(e),
            i && a.find("." + ps).append(i),
            o && (-1 !== o.indexOf("{") ? (s = JSON.parse(o)) : (s[r] = o)),
            "file" == n.type && (s.right = e.attr("data-icon-upload") || "upload"),
            (o || t) &&
                (ut(s, t),
                a
                    .addClass((s.right ? "mbsc-ic-right " : "") + (s.left ? " mbsc-ic-left" : ""))
                    .find("." + ps)
                    .append('<span class="mbsc-input-fill"></span>')
                    .append(s.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' + s.left + '"></span>' : "")
                    .append(s.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + s.right + '"></span>' : ""));
    }
    function bs(e, t, s, n, a) {
        "segmented" == t
            ? e
                  .closest(".mbsc-segmented")
                  .addClass("box" == s ? "mbsc-input-box" : "")
                  .addClass("outline" == s ? "mbsc-input-outline" : "")
            : "button" != t &&
              "submit" != t &&
              (e
                  .addClass("mbsc-control-w")
                  .addClass("box" == s ? "mbsc-input-box" : "")
                  .addClass("outline" == s ? "mbsc-input-outline" : "")
                  .addClass("inline" == n ? "mbsc-label-inline" : "")
                  .addClass("stacked" == n ? "mbsc-label-stacked" : "")
                  .addClass("floating" == n ? "mbsc-label-floating" : "")
                  .addClass("floating" == n && a.value ? "mbsc-label-floating-active" : "")
                  .find("label")
                  .addClass("mbsc-label")
                  .each(function (e, t) {
                      ct(t).attr("title", ct(t).text());
                  }),
              e
                  .contents()
                  .filter(function () {
                      return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue);
                  })
                  .each(function () {
                      ct('<span class="mbsc-label" title="' + this.textContent.trim() + '"></span>')
                          .insertAfter(this)
                          .append(this);
                  }));
    }
    function vs(e) {
        var t = se.themes.form[e];
        return t && t.addRipple ? t : null;
    }
    function gs(e, t, s) {
        var n = e.attr(t);
        return void 0 === n || "" === n ? s : n;
    }
    function ys(e) {
        var t = oe(e),
            s = se.themes.form[t].baseTheme;
        return "mbsc-" + t + (s ? " mbsc-" + s : "") + (e.rtl ? " mbsc-rtl" : " mbsc-ltr");
    }
    var _s = (function () {
        function e(e, t) {
            var s = this,
                n = ut({}, ms, se.settings, t),
                a = ct(e),
                i = a.parent(),
                r = i.hasClass("mbsc-input-wrap") ? i.parent() : i,
                o = a.next().hasClass("mbsc-fr") ? a.next() : null,
                l = Q(a),
                c = gs(a, "data-input-style", n.inputStyle),
                u = gs(a, "data-label-style", n.labelStyle);
            e.mbscInst && e.mbscInst.destroy(),
                o && o.insertAfter(r),
                (n.theme = oe(n)),
                void 0 === n.rtl && n.lang && se.i18n[n.lang] && (n.rtl = se.i18n[n.lang].rtl),
                bs(r, l, c, u, e),
                a.addClass("mbsc-control"),
                (this._handle = this._handle.bind(this)),
                hs.forEach(function (e) {
                    a.on(e, s._handle);
                }),
                it(e, "touchstart", this._handle, { passive: !0 }),
                it(e, "touchmove", this._handle, { passive: !0 }),
                (this.settings = n),
                (this._type = l),
                (this._elm = e),
                (this._$elm = a),
                (this._$parent = r),
                (this._$frame = o),
                (this._ripple = vs(n.theme)),
                (this._isFloating = "floating" == u || r.hasClass("mbsc-label-floating")),
                (this.cssClass = ys(n)),
                this.getClassElm().addClass(this.cssClass),
                (e.mbscInst = this);
        }
        var t = e.prototype;
        return (
            (t.getClassElm = function () {
                return this._$parent;
            }),
            (t.destroy = function () {
                var t = this,
                    s = this._$elm,
                    e = this._elm;
                s.removeClass("mbsc-control"),
                    this.getClassElm().removeClass(this.cssClass),
                    hs.forEach(function (e) {
                        s.off(e, t._handle);
                    }),
                    be(e, "touchstart", this._handle, { passive: !0 }),
                    be(e, "touchmove", this._handle, { passive: !0 }),
                    delete e.mbscInst;
            }),
            (t.option = function (e) {
                ut(this.settings, e);
                var t = this.getClassElm();
                this.cssClass && t.removeClass(this.cssClass), (this.cssClass = ys(this.settings)), t.addClass(this.cssClass), (this._ripple = vs(this.settings.theme));
            }),
            (t._handle = function (e) {
                switch (e.type) {
                    case "touchstart":
                    case "mousedown":
                        this._onStart(e);
                        break;
                    case "touchmove":
                    case "mousemove":
                        this._onMove(e);
                        break;
                    case "touchend":
                    case "touchcancel":
                    case "mouseup":
                    case "mouseleave":
                        this._onEnd(e);
                }
            }),
            (t._addRipple = function (e) {
                this._ripple && this._$rippleElm && this._ripple.addRipple(this._$rippleElm, e);
            }),
            (t._removeRipple = function () {
                this._ripple && this._$rippleElm && this._ripple.removeRipple();
            }),
            (t._onStart = function (e) {
                var t = this._elm;
                me(e, t) && ((this._startX = xe(e, "X")), (this._startY = xe(e, "Y")), ds && ds.removeClass("mbsc-active"), t.disabled || ((this._isActive = !0), (ds = this._$elm).addClass("mbsc-active"), this._addRipple(e))),
                    "touchstart" == e.type && this._$elm.closest(".mbsc-no-touch").removeClass("mbsc-no-touch");
            }),
            (t._onMove = function (e) {
                ((this._isActive && 9 < Math.abs(xe(e, "X") - this._startX)) || 9 < Math.abs(xe(e, "Y") - this._startY)) && (this._$elm.removeClass("mbsc-active"), this._removeRipple(), (this._isActive = !1));
            }),
            (t._onEnd = function (e) {
                var t,
                    s,
                    n,
                    a = this,
                    i = this._elm,
                    r = this._type;
                this._isActive && this.settings.tap && "touchend" == e.type && !i.readOnly && ((s = r), (n = e), (t = i).focus(), /(button|submit|checkbox|switch|radio)/.test(s) && n.preventDefault(), /select/.test(s) || K(n, t)),
                    this._isActive &&
                        setTimeout(function () {
                            a._$elm.removeClass("mbsc-active"), a._removeRipple();
                        }, 100),
                    (this._isActive = !1),
                    (ds = null);
            }),
            e
        );
    })();
    se.themes.form.mobiscroll = {};
    var ws = ["focus", "change", "blur", "animationstart"],
        xs = (function (f) {
            function e(e, t) {
                var s,
                    n,
                    a,
                    i,
                    r,
                    o,
                    l,
                    c,
                    u,
                    d = (s = f.call(this, e, t) || this)._$elm,
                    p = s._$parent,
                    h = p.find(".mbsc-select-input, .mbsc-color-input");
                if (
                    ((n = b(s)),
                    (a = p),
                    (r = {}),
                    (o = (i = d)[0]),
                    (l = i.attr("data-password-toggle")),
                    (c = i.attr("data-icon-show") || "eye"),
                    (u = i.attr("data-icon-hide") || "eye-blocked"),
                    l && (r.right = "password" == o.type ? c : u),
                    fs(i, r),
                    l &&
                        ee(n, a.find(".mbsc-right-ic").addClass("mbsc-input-toggle"), function () {
                            "text" == o.type
                                ? ((o.type = "password"),
                                  ct(this)
                                      .addClass("mbsc-ic-" + c)
                                      .removeClass("mbsc-ic-" + u))
                                : ((o.type = "text"),
                                  ct(this)
                                      .removeClass("mbsc-ic-" + c)
                                      .addClass("mbsc-ic-" + u));
                        }),
                    (s._checkLabel = s._checkLabel.bind(b(s))),
                    (s._mouseDown = s._mouseDown.bind(b(s))),
                    (s._setText = s._setText.bind(b(s))),
                    "file" == e.type)
                ) {
                    var m = p.find(".mbsc-file-input");
                    (s._$input = m.length ? m : ct('<input type="text" class="' + (d.attr("class") || "") + ' mbsc-file-input" placeholder="' + (d.attr("placeholder") || "") + '"/>').insertAfter(d)), d.on("change", s._setText);
                }
                return (
                    p.addClass("mbsc-input").on("mousedown", s._mouseDown),
                    ws.forEach(function (e) {
                        d.on(e, s._checkLabel);
                    }),
                    h.length && (d.after(h), h.hasClass("mbsc-select-input") && ((s._delm = h[0]), s.refresh())),
                    s
                );
            }
            l(e, f);
            var t = e.prototype;
            return (
                (t._setText = function (e) {
                    for (var t = e.target.files, s = [], n = 0; n < t.length; ++n) s.push(t[n].name);
                    this._$input.val(s);
                }),
                (t._checkLabel = function (e) {
                    if (this._isFloating) {
                        var t = this._delm || this._elm;
                        t.value || document.activeElement === t || (e && ("focus" == e.type || ("animationstart" == e.type && this._$elm.is("*:-webkit-autofill"))))
                            ? this._$parent.addClass("mbsc-label-floating-active")
                            : this._$parent.removeClass("mbsc-label-floating-active");
                    }
                }),
                (t._mouseDown = function (e) {
                    document.activeElement === this._elm && e.target !== this._elm && e.preventDefault();
                }),
                (t.refresh = function () {
                    this._checkLabel();
                }),
                (t.destroy = function () {
                    var t = this;
                    f.prototype.destroy.call(this),
                        this._$parent.off("mousedown", this._mouseDown).removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-input-ic").remove(),
                        this._$parent.find(".mbsc-input-fill").remove(),
                        ws.forEach(function (e) {
                            t._$elm.off(e, t._checkLabel);
                        }),
                        this._$elm.off("change", this._setText);
                }),
                e
            );
        })(_s);
    le("[mbsc-input]", xs);
    var Cs = (function (i) {
        function e(e, t) {
            var s,
                n = (s = i.call(this, e, t) || this)._$elm,
                a = n.attr("data-icon");
            return (
                n.addClass("mbsc-btn mbsc-no-touch").find(".mbsc-btn-ic").remove(), a && (n.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + a + '"></span>'), "" === n.text() && n.addClass("mbsc-btn-icon-only")), (s._$rippleElm = n), s
            );
        }
        return (
            l(e, i),
            (e.prototype.getClassElm = function () {
                return this._$elm;
            }),
            e
        );
    })(_s);
    le("[mbsc-button]", Cs);
    var Ts = (function (n) {
        function e(e, t) {
            var s;
            return (s = n.call(this, e, t) || this)._$parent.prepend(s._$elm).addClass("mbsc-checkbox mbsc-control-w").find(".mbsc-checkbox-box").remove(), s._$elm.after('<span class="mbsc-checkbox-box"></span>'), s;
        }
        return l(e, n), e;
    })(_s);
    le("[mbsc-checkbox]", Ts);
    var Ms = (function (n) {
        function e(e, t) {
            var s;
            return (s = n.call(this, e, t) || this)._$parent.addClass("mbsc-radio mbsc-control-w").find(".mbsc-radio-box").remove(), s._$elm.after('<span class="mbsc-radio-box"><span></span></span>'), s;
        }
        return l(e, n), e;
    })(_s);
    le("[mbsc-radio]", Ms);
    var ks = (function (o) {
        function e(e, t) {
            var s,
                n = (s = o.call(this, e, t) || this)._$elm,
                a = s._$parent,
                i = a.find(".mbsc-select-input"),
                r = i.length ? i : ct('<input tabindex="-1" class="mbsc-select-input mbsc-control" readonly>');
            return (
                (s._$input = r),
                (s._delm = r[0]),
                (s._setText = s._setText.bind(b(s))),
                a.addClass("mbsc-select" + (s._$frame ? " mbsc-select-inline" : "")),
                n.after(r),
                r.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>'),
                n.on("change", s._setText),
                s._setText(),
                s
            );
        }
        l(e, o);
        var t = e.prototype;
        return (
            (t.destroy = function () {
                o.prototype.destroy.call(this), this._$parent.find(".mbsc-select-ic").remove(), this._$elm.off("change", this._setText);
            }),
            (t._setText = function () {
                var e = this._elm,
                    t = ct(e);
                t.is("select") && !t.hasClass("mbsc-comp") && this._$input.val(-1 != e.selectedIndex ? e.options[e.selectedIndex].text : ""), this.refresh();
            }),
            e
        );
    })(xs);
    le("[mbsc-dropdown]", ks);
    var Ds,
        Ss = ["change", "keydown", "input", "scroll"];
    function Os() {
        clearTimeout(Ds),
            (Ds = setTimeout(function () {
                ct("textarea.mbsc-control").each(function () {
                    Ns(this);
                });
            }, 100));
    }
    function Ns(e) {
        var t,
            s,
            n,
            a = ct(e).attr("rows") || 6;
        e.offsetHeight &&
            ((e.style.height = ""),
            (n = e.scrollHeight - e.offsetHeight),
            (t = e.offsetHeight + (0 < n ? n : 0)),
            a < (s = Math.round(t / 24)) ? ((t = 24 * a + (t - 24 * s)), ct(e).addClass("mbsc-textarea-scroll")) : ct(e).removeClass("mbsc-textarea-scroll"),
            t && (e.style.height = t + "px"));
    }
    u && ct(window).on("resize orientationchange", Os);
    var Vs = (function (n) {
        function e(e, t) {
            var s;
            return (
                (s = n.call(this, e, t) || this)._$parent.addClass("mbsc-textarea"),
                Ss.forEach(function (e) {
                    s._$elm.on(e, s._handle);
                }),
                Ns(e),
                s
            );
        }
        l(e, n);
        var t = e.prototype;
        return (
            (t.destroy = function () {
                var t = this;
                n.prototype.destroy.call(this),
                    Ss.forEach(function (e) {
                        t._$elm.off(e, t._handle);
                    });
            }),
            (t.refresh = function () {
                n.prototype.refresh.call(this), clearTimeout(this._debounce), Ns(this._elm);
            }),
            (t._handle = function (e) {
                switch ((n.prototype._handle.call(this, e), e.type)) {
                    case "change":
                        Ns(this._elm);
                        break;
                    case "keydown":
                    case "input":
                        this._onInput(e);
                        break;
                    case "scroll":
                        !(function (e) {
                            var t = ct(e);
                            if (!t.hasClass("mbsc-textarea-scroll")) {
                                var s = e.scrollHeight - e.offsetHeight,
                                    n = e.offsetHeight + s;
                                Math.round(n / 24) <= (t.attr("rows") || 6) && ((e.scrollTop = 0), (e.style.height = n + "px"));
                            }
                        })(this._elm);
                }
            }),
            (t._onInput = function () {
                var e = this;
                clearTimeout(this._debounce),
                    (this._debounce = setTimeout(function () {
                        Ns(e._elm);
                    }, 100));
            }),
            e
        );
    })(xs);
    le("[mbsc-textarea]", Vs);
    var Es = (function (o) {
        function e(e, t) {
            var s,
                n,
                a,
                i = (s = o.call(this, e, t) || this)._$elm,
                r = s._$parent;
            return (
                r.hasClass("mbsc-segmented-item-ready") ||
                    ((n = ct('<div class="mbsc-segmented mbsc-no-touch"></div>')),
                    r.after(n),
                    r
                        .parent()
                        .find('input[name="' + i.attr("name") + '"]')
                        .each(function () {
                            var e = ct(this);
                            (a = e.parent().addClass("mbsc-segmented-item mbsc-segmented-item-ready")),
                                ct('<span class="mbsc-segmented-content">' + (e.attr("data-icon") ? '<span class="mbsc-ic mbsc-ic-' + e.attr("data-icon") + '"></span>' : "") + "</span>")
                                    .append(a.contents())
                                    .appendTo(a),
                                a.prepend(e),
                                n.append(a);
                        })),
                (s._$rippleElm = i.next()),
                s
            );
        }
        return (
            l(e, o),
            (e.prototype.getClassElm = function () {
                return this._$elm.closest(".mbsc-segmented");
            }),
            e
        );
    })(_s);
    le("[mbsc-segmented]", Es);
    function Ps(t, e) {
        var n,
            a,
            i,
            s,
            r,
            o,
            l,
            c,
            u,
            d,
            p,
            h,
            m,
            f,
            b,
            v,
            g = "",
            y = this,
            _ = ct(t),
            w = f;
        function x() {
            var e;
            t.disabled || ((e = parseFloat(ct(this).val())), M(isNaN(e) ? f : e));
        }
        function C() {
            return t.disabled;
        }
        function T(e, t) {
            M(f + t * d);
        }
        function M(e, t, s) {
            (w = f),
                void 0 === t && (t = !0),
                void 0 === s && (s = t),
                (f = D(e)),
                i.removeClass("mbsc-disabled"),
                t && _.val(f),
                f == o ? a.addClass("mbsc-disabled") : f == r && n.addClass("mbsc-disabled"),
                f !== w && s && _.trigger("change");
        }
        function k(e, t, s) {
            var n = _.attr(e);
            return void 0 === n || "" === n ? t : s ? n : +n;
        }
        function D(e) {
            return +Math.min(r, Math.max(Math.round(e / d) * d, o)).toFixed(u);
        }
        ke.call(this, t, e, !0),
            (y.getVal = function () {
                var e = parseFloat(_.val());
                return D((e = isNaN(e) ? f : e));
            }),
            (y.setVal = function (e, t, s) {
                (e = parseFloat(e)), M(isNaN(e) ? f : e, t, s);
            }),
            (y._init = function () {
                (b = _.parent().hasClass("mbsc-stepper")),
                    (v = b ? _.closest(".mbsc-stepper-cont") : _.parent()),
                    (h = y.settings),
                    (o = void 0 === e.min ? k("min", h.min) : e.min),
                    (r = void 0 === e.max ? k("max", h.max) : e.max),
                    (d = void 0 === e.step ? k("step", h.step) : e.step),
                    (u = Math.abs(d) < 1 ? (d + "").split(".")[1].length : 0),
                    (l = void 0 === e.inputStyle ? k("data-input-style", h.inputStyle, !0) : e.inputStyle),
                    (s = _.attr("data-val") || h.val),
                    (f = D(+t.value || 0)),
                    (m = se.themes.form[h.theme]),
                    (c = m && m.addRipple ? m : null),
                    b ||
                        v
                            .addClass("mbsc-stepper-cont mbsc-no-touch mbsc-control-w")
                            .addClass("box" == l ? "mbsc-input-box" : "")
                            .addClass("outline" == l ? "mbsc-input-outline" : "")
                            .append('<span class="mbsc-segmented mbsc-stepper"></span>')
                            .find(".mbsc-stepper")
                            .append(
                                '<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' +
                                    (f == o ? "mbsc-disabled" : "") +
                                    '" data-step="-1" tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>'
                            )
                            .append(
                                '<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' +
                                    (f == r ? "mbsc-disabled" : "") +
                                    '"  data-step="1" tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span></span></span>'
                            )
                            .prepend(_),
                    g && v.removeClass(g).find(".mbsc-segmented").removeClass(g),
                    (g = "mbsc-" + h.theme + (m.baseTheme ? " mbsc-" + m.baseTheme : "") + (h.rtl ? " mbsc-rtl" : " mbsc-ltr")),
                    v.addClass(g).find(".mbsc-segmented").addClass(g),
                    (a = ct(".mbsc-stepper-minus", v)),
                    (n = ct(".mbsc-stepper-plus", v)),
                    (i = ct(".mbsc-stepper-control", v)),
                    b ||
                        ("left" == s
                            ? (v.addClass("mbsc-stepper-val-left"), _.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>'))
                            : "right" == s
                            ? (v.addClass("mbsc-stepper-val-right"), n.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>'))
                            : a.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>')),
                    p || (_.on("change", x), (p = yt(i, T, 150, C, !1, c))),
                    _.val(f).attr("data-role", "stepper").attr("min", o).attr("max", r).attr("step", d).addClass("mbsc-control"),
                    (t.mbscInst = y);
            }),
            (y._destroy = function () {
                _.removeClass("mbsc-control").off("change", x), p.destroy(), delete t.mbscInst;
            }),
            y.init();
    }
    (Ps.prototype = { _class: "stepper", _hasDef: !0, _hasTheme: !0, _hasLang: !0, _defaults: { min: 0, max: 100, step: 1 } }), le("[mbsc-stepper]", (Ce.Stepper = Ps));
    function Is(t, e, s) {
        var n,
            a,
            i,
            r,
            o = this;
        ke.call(this, t, e, !0),
            (o.__init = rt),
            (o.__destroy = rt),
            (o._init = function () {
                var e;
                (r = o.settings),
                    (n = ct(t)),
                    (e = !!a),
                    (a = (a = n.parent()).hasClass("mbsc-input-wrap") ? a.parent() : a),
                    (o._$parent = a),
                    i && a.removeClass(i),
                    (i = o._css + " mbsc-progress-w mbsc-control-w " + ys(r)),
                    a.addClass(i),
                    n.addClass("mbsc-control"),
                    o.__init(),
                    e || o._attachChange(),
                    o.refresh(),
                    (t.mbscInst = o);
            }),
            (o._destroy = function () {
                o.__destroy(), a.removeClass(i), n.removeClass("mbsc-control"), delete t.mbscInst;
            }),
            s || o.init();
    }
    function Ls(s, e, t) {
        var n,
            a,
            i,
            l,
            r,
            o,
            c,
            u,
            d,
            p,
            h,
            m,
            f,
            b,
            v,
            g,
            y,
            _,
            w,
            x,
            C,
            T,
            M,
            k,
            D,
            S,
            O,
            N,
            V,
            E,
            P,
            I,
            L,
            A,
            $ = this,
            F = new Date();
        function H(e) {
            "mousedown" === e.type && e.preventDefault(),
                !me(e, this) ||
                    (c && !g) ||
                    s.disabled ||
                    s.readOnly ||
                    (O.stopProp && e.stopPropagation(),
                    (d = M = !(c = !0)),
                    (V = xe(e, "X")),
                    (E = xe(e, "Y")),
                    (f = V),
                    o.removeClass("mbsc-progress-anim"),
                    (a = k ? ct(".mbsc-slider-handle", this) : l),
                    i && i.removeClass("mbsc-handle-curr"),
                    (i = a.parent().addClass("mbsc-active mbsc-handle-curr")),
                    n.addClass("mbsc-active"),
                    (v = +a.attr("data-index")),
                    (L = o[0].offsetWidth),
                    (m = o[0].getBoundingClientRect().left),
                    "mousedown" === e.type && ((y = !0), ct(document).on("mousemove", Y).on("mouseup", U)),
                    "mouseenter" === e.type && ((g = !0), ct(document).on("mousemove", Y)));
        }
        function Y(e) {
            c &&
                ((f = xe(e, "X")),
                (b = xe(e, "Y")),
                (p = f - V),
                (h = b - E),
                5 < Math.abs(p) && (M = !0),
                (M || y || g) && 50 < Math.abs(F - new Date()) && ((F = new Date()), G(f, O.round, x && (!g || y))),
                M ? e.preventDefault() : 7 < Math.abs(h) && "touchmove" == e.type && X());
        }
        function U(e) {
            c &&
                (e.preventDefault(),
                k || o.addClass("mbsc-progress-anim"),
                g && !y ? J(A[v], v, !1, !1, !0) : G(f, !0, !0),
                M || d || ("touchend" == e.type && ot(), $._onTap(A[v])),
                "mouseup" == e.type && (y = !1),
                "mouseleave" == e.type && (g = !1),
                g || X());
        }
        function R() {
            c && X();
        }
        function W() {
            var e = $._readValue(ct(this)),
                t = +ct(this).attr("data-index");
            e !== A[t] && ((A[t] = e), J((D[t] = e), t));
        }
        function z(e) {
            e.stopPropagation();
        }
        function q(e) {
            e.preventDefault();
        }
        function j(e) {
            var t;
            if (!s.disabled) {
                switch (e.keyCode) {
                    case 38:
                    case 39:
                        t = 1;
                        break;
                    case 40:
                    case 37:
                        t = -1;
                }
                t &&
                    (e.preventDefault(),
                    I ||
                        ((v = +ct(this).attr("data-index")),
                        J(A[v] + S * t, v, !0),
                        (I = setInterval(function () {
                            J(A[v] + S * t, v, !0);
                        }, 200))));
            }
        }
        function B(e) {
            e.preventDefault(), clearInterval(I), (I = null);
        }
        function X() {
            (c = !1), i.removeClass("mbsc-active"), n.removeClass("mbsc-active"), ct(document).off("mousemove", Y).off("mouseup", U);
        }
        function G(e, t, s) {
            var n = t ? Math.min((Math[$._rounding || "round"](Math.max((100 * (e - m)) / L, 0) / N / S) * S * 100) / (C - T + u), 100) : Math.max(0, Math.min((100 * (e - m)) / L, 100));
            _ && (n = 100 - n), J(Math.round((T - u + n / N) * P) / P, v, s, n);
        }
        function J(e, t, s, n, a, i) {
            var r = l.eq(t),
                o = r.parent();
            (e = Math.min(C, Math.max(e, T))),
                void 0 === i && (i = s),
                $._update ? (e = $._update(e, A, t, n, k, a, o)) : o.css({ left: _ ? "auto" : (n || Z(e, T, C)) + "%", right: _ ? (n || Z(e, T, C)) + "%" : "auto" }),
                T < e ? o.removeClass("mbsc-slider-start") : (A[t] > T || a) && o.addClass("mbsc-slider-start"),
                s && (A[t] = e),
                s && D[t] != e && ((d = !0), (D[t] = e), $._fillValue(e, t, i)),
                r.attr("aria-valuenow", e);
        }
        Is.call(this, s, e, !0),
            ($._onTap = rt),
            ($.___init = rt),
            ($.___destroy = rt),
            ($._attachChange = function () {
                n.on(O.changeEvent, W);
            }),
            ($.__init = function () {
                var e;
                l && ((e = !0), l.parent().remove()),
                    $.___init(),
                    (r = $._$parent),
                    (o = $._$track),
                    (n = r.find("input")),
                    (O = $.settings),
                    (T = $._min),
                    (C = $._max),
                    (u = $._base || 0),
                    (S = $._step),
                    (x = $._live),
                    (P = S % 1 != 0 ? 100 / (100 * (S % 1).toFixed(2)) : 1),
                    (N = 100 / (C - T + u) || 100),
                    (k = 1 < n.length),
                    (_ = O.rtl),
                    (A = []),
                    (D = []),
                    n.each(function (e) {
                        (A[e] = $._readValue(ct(this))), ct(this).attr("data-index", e);
                    }),
                    (l = r.find(".mbsc-slider-handle")),
                    (w = r.find(k ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont")[0]),
                    l.on("keydown", j).on("keyup", B).on("blur", B),
                    it(w, "touchstart", H, { passive: !0 }),
                    it(w, "mousedown", H),
                    it(w, "touchend", U),
                    it(w, "touchcancel", U),
                    it(w, "pointercancel", R),
                    O.hover && (it(w, "mouseenter", H), it(w, "mouseleave", U)),
                    e || (n.on("click", z), r.on("click", q), it(document, "touchmove", Y, { passive: !1 }));
            }),
            ($.__destroy = function () {
                r.off("click", q),
                    n.off(O.changeEvent, W).off("click", z),
                    l.off("keydown", j).off("keyup", B).off("blur", B),
                    be(w, "touchstart", H, { passive: !0 }),
                    be(w, "mousedown", H),
                    be(w, "touchend", U),
                    be(w, "touchcancel", U),
                    be(w, "pointercancel", R),
                    be(w, "mouseenter", H),
                    be(w, "mouseleave", U),
                    be(document, "touchmove", Y, { passive: !1 }),
                    $.___destroy();
            }),
            ($.refresh = function () {
                n.each(function (e) {
                    J($._readValue(ct(this)), e, !0, !1, !0, !1);
                });
            }),
            ($.getVal = function () {
                return k ? A.slice(0) : A[0];
            }),
            ($.setVal = $._setVal = function (e, t, s) {
                ct.isArray(e) || (e = [e]),
                    ct.each(e, function (e, t) {
                        A[e] = t;
                    }),
                    ct.each(e, function (e, t) {
                        J(t, e, !0, !1, !0, s);
                    });
            }),
            t || $.init();
    }
    function As(e, t) {
        var n,
            s,
            a,
            i,
            r = this;
        ut((t = t || {}), { changeEvent: "click", round: !1 }),
            Ls.call(this, e, t, !0),
            (r._readValue = function () {
                return e.checked ? 1 : 0;
            }),
            (r._fillValue = function (e, t, s) {
                n.prop("checked", !!e), s && n.trigger("change");
            }),
            (r._onTap = function (e) {
                r._setVal(e ? 0 : 1);
            }),
            (r.___init = function () {
                (a = r.settings),
                    (n = ct(e)),
                    (s = n.parent()).find(".mbsc-switch-track").remove(),
                    s.prepend(n),
                    n
                        .attr("data-role", "switch")
                        .after(
                            '<span class="mbsc-progress-cont mbsc-switch-track"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-slider-handle-cont"><span class="mbsc-slider-handle mbsc-switch-handle" data-index="0"><span class="mbsc-switch-txt-off">' +
                                a.offText +
                                '</span><span class="mbsc-switch-txt-on">' +
                                a.onText +
                                "</span></span></span></span></span>"
                        ),
                    i && i.destroy(),
                    (i = new _s(e, a)),
                    (r._$track = s.find(".mbsc-progress-track")),
                    (r._min = 0),
                    (r._max = 1),
                    (r._step = 1);
            }),
            (r.___destroy = function () {
                i.destroy();
            }),
            (r.getVal = function () {
                return e.checked;
            }),
            (r.setVal = function (e, t, s) {
                r._setVal(e ? 1 : 0, t, s);
            }),
            r.init();
    }
    (As.prototype = { _class: "switch", _css: "mbsc-switch", _hasTheme: !0, _hasLang: !0, _hasDef: !0, _defaults: { stopProp: !0, offText: "Off", onText: "On" } }), le("[mbsc-switch]", (Ce.Switch = As));
    function $s(a, i, e) {
        var r,
            o,
            l,
            c,
            u,
            d,
            p,
            h,
            m,
            f,
            b,
            v,
            g,
            t,
            y = this;
        function s() {
            var e = _("value", p);
            e !== g && n(e);
        }
        function _(e, t, s) {
            var n = o.attr(e);
            return void 0 === n || "" === n ? t : s ? n : +n;
        }
        function n(e, t, s, n) {
            (e = Math.min(h, Math.max(e, p))),
                c.css("width", (100 * (e - p)) / (h - p) + "%"),
                void 0 === s && (s = !0),
                void 0 === n && (n = s),
                (e === g && !t) || y._display(e),
                e !== g && ((g = e), s && o.attr("value", g), n && o.trigger("change"));
        }
        Is.call(this, a, i, !0),
            (y._display = function (e) {
                (t = v && b.returnAffix ? v.replace(/\{value\}/, e).replace(/\{max\}/, h) : e), u && u.html(t), r && r.html(t);
            }),
            (y._attachChange = function () {
                o.on("change", s);
            }),
            (y.__init = function () {
                var e, t, s, n;
                if (
                    ((b = y.settings),
                    (o = ct(a)),
                    (n = !!l),
                    (l = y._$parent),
                    (p = y._min = void 0 === i.min ? _("min", b.min) : i.min),
                    (h = y._max = void 0 === i.max ? _("max", b.max) : i.max),
                    (m = void 0 === i.inputStyle ? _("data-input-style", b.inputStyle, !0) : i.inputStyle),
                    (f = void 0 === i.labelStyle ? _("data-label-style", b.labelStyle, !0) : i.labelStyle),
                    (g = _("value", p)),
                    (e = o.attr("data-val") || b.val),
                    (s = (s = o.attr("data-step-labels")) ? JSON.parse(s) : b.stepLabels),
                    (v = o.attr("data-template") || (100 != h || b.template ? b.template : "{value}%")),
                    n
                        ? (e && (r.remove(), l.removeClass("mbsc-progress-value-" + ("right" == e ? "right" : "left"))), s && ct(".mbsc-progress-step-label", d).remove())
                        : (bs(l, null, m, f, a),
                          fs(o),
                          l.find(".mbsc-input-wrap").append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>'),
                          (c = y._$progress = l.find(".mbsc-progress-bar")),
                          (d = y._$track = l.find(".mbsc-progress-track"))),
                    o.attr("min", p).attr("max", h),
                    e &&
                        ((r = ct('<span class="mbsc-progress-value"></span>')),
                        l
                            .addClass("mbsc-progress-value-" + ("right" == e ? "right" : "left"))
                            .find(".mbsc-input-wrap")
                            .append(r)),
                    s)
                )
                    for (t = 0; t < s.length; ++t) d.append('<span class="mbsc-progress-step-label" style="' + (b.rtl ? "right" : "left") + ": " + (100 * (s[t] - p)) / (h - p) + '%" >' + s[t] + "</span>");
                u = ct(o.attr("data-target") || b.target);
            }),
            (y.__destroy = function () {
                l.removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-progress-cont").remove(), l.find(".mbsc-input-ic").remove(), o.off("change", s);
            }),
            (y.refresh = function () {
                n(_("value", p), !0, !1);
            }),
            (y.getVal = function () {
                return g;
            }),
            (y.setVal = function (e, t, s) {
                n(e, !0, t, s);
            }),
            e || y.init();
    }
    ($s.prototype = { _class: "progress", _css: "mbsc-progress", _hasTheme: !0, _hasLang: !0, _hasDef: !0, _defaults: { min: 0, max: 100, returnAffix: !0 } }), le("[mbsc-progress]", (Ce.Progress = $s));
    function Fs(e, t, s) {
        var n,
            a,
            o,
            l,
            i,
            c,
            u,
            d,
            p,
            h,
            m,
            r,
            f,
            b = this;
        $s.call(this, e, t, !0);
        var v = b.__init,
            g = b.__destroy;
        Ls.call(this, e, t, !0);
        var y = b.__init,
            _ = b.__destroy;
        (b.__init = function () {
            v(), y();
        }),
            (b.__destroy = function () {
                g(), _();
            }),
            (b._update = function (e, t, s, n, a, i, r) {
                return (
                    d
                        ? 0 === s
                            ? ((e = Math.min(e, t[1])), o.css({ width: Z(t[1], m, h) - Z(e, m, h) + "%", left: p ? "auto" : Z(e, m, h) + "%", right: p ? Z(e, m, h) + "%" : "auto" }))
                            : ((e = Math.max(e, t[0])), o.css({ width: Z(e, m, h) - Z(t[0], m, h) + "%" }))
                        : a || !c
                        ? r.css({ left: p ? "auto" : (n || Z(e, m, h)) + "%", right: p ? (n || Z(e, m, h)) + "%" : "auto" })
                        : o.css("width", (n || Z(e, m, h)) + "%"),
                    u && l.eq(s).html(e),
                    a || (t[s] == e && !i) || b._display(e),
                    e
                );
            }),
            (b._readValue = function (e) {
                return +e.val();
            }),
            (b._fillValue = function (e, t, s) {
                n.eq(t).val(e), s && n.eq(t).trigger("change");
            }),
            (b._markupReady = function () {
                var e, t;
                if ((u && a.addClass("mbsc-slider-has-tooltip"), 1 != r)) for (t = (h - m) / r, e = 0; e <= t; ++e) i.append('<span class="mbsc-slider-step" style="' + (p ? "right" : "left") + ":" + (100 / t) * e + '%"></span>');
                n.each(function (e) {
                    "range" == this.type && ct(this).attr("min", m).attr("max", h).attr("step", r),
                        (c ? o : i).append(
                            '<span class="mbsc-slider-handle-cont' +
                                (d && !e ? " mbsc-slider-handle-left" : "") +
                                '"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' +
                                m +
                                '" aria-valuemax="' +
                                h +
                                '" data-index="' +
                                e +
                                '"></span>' +
                                (u ? '<span class="mbsc-slider-tooltip"></span>' : "") +
                                "</span>"
                        );
                }),
                    (l = a.find(".mbsc-slider-tooltip"));
            }),
            (b.___init = function () {
                a && (a.removeClass("mbsc-slider-has-tooltip"), 1 != r && ct(".mbsc-slider-step", i).remove()),
                    (a = b._$parent),
                    (i = b._$track),
                    (o = b._$progress),
                    (n = a.find("input")),
                    (f = b.settings),
                    (m = b._min),
                    (h = b._max),
                    (b._step = r = void 0 === t.step ? +n.attr("step") || f.step : t.step),
                    (b._live = X("data-live", f.live, n)),
                    (u = X("data-tooltip", f.tooltip, n)),
                    (c = X("data-highlight", f.highlight, n) && n.length < 3),
                    (d = c && 2 == n.length),
                    (p = f.rtl),
                    b._markupReady();
            }),
            s || b.init();
    }
    (Fs.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-slider",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: { changeEvent: "change", stopProp: !0, min: 0, max: 100, step: 1, live: !0, highlight: !0, round: !0, returnAffix: !0 },
    }),
        le("[mbsc-slider]", (Ce.Slider = Fs));
    function Hs(e, t, s) {
        var r,
            n,
            o,
            a,
            i,
            l,
            c,
            u = this,
            d = ct(e);
        Fs.call(this, e, t, !0),
            (u._update = function (e, t, s, n, a, i) {
                return r.css("width", Z(e, 0, o) + "%"), a || (t[s] == e && !i) || u._display(e), e;
            }),
            (u._markupReady = function () {
                var e,
                    t = "",
                    s = "";
                for (
                    n = u._$track, r = u._$progress, c = u.settings, a = u._min, o = u._max, u._base = a, u._rounding = c.rtl ? "floor" : "ceil", i = d.attr("data-empty") || c.empty, l = d.attr("data-filled") || c.filled, e = 0;
                    e < o;
                    ++e
                )
                    (t += '<span class="mbsc-ic mbsc-ic-' + i + '"></span>'), (s += '<span class="mbsc-ic mbsc-ic-' + l + '"></span>');
                n.html(t), n.append(r), r.html(s), n.append('<span class="mbsc-rating-handle-cont"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + a + '" aria-valuemax="' + o + '" data-index="0"></span></span>');
            }),
            s || u.init();
    }
    (Hs.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-rating",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: { changeEvent: "change", stopProp: !0, min: 1, max: 5, step: 1, live: !0, round: !0, hover: !0, highlight: !0, returnAffix: !0, empty: "star", filled: "star3" },
    }),
        le("[mbsc-rating]", (Ce.Rating = Hs));
    var Ys = 1,
        Us = (function () {
            function e(e, t) {
                var s,
                    n,
                    a,
                    i = this,
                    r = ct(e);
                if (
                    ((this.settings = t),
                    (this._isOpen = t.isOpen || !1),
                    r.addClass("mbsc-collapsible " + (this._isOpen ? "mbsc-collapsible-open" : "")),
                    (s = (a = r.hasClass("mbsc-card")
                        ? ((n = r.find(".mbsc-card-header").eq(0).addClass("mbsc-collapsible-header")), r.find(".mbsc-card-content").eq(0).addClass("mbsc-collapsible-content"))
                        : r.hasClass("mbsc-form-group") || r.hasClass("mbsc-form-group-inset")
                        ? ((n = r.find(".mbsc-form-group-title").eq(0).addClass("mbsc-collapsible-header")), r.find(".mbsc-form-group-content").eq(0).addClass("mbsc-collapsible-content"))
                        : ((n = r.find(".mbsc-collapsible-header").eq(0)), r.find(".mbsc-collapsible-content").eq(0)))[0]) &&
                        !s.id &&
                        (s.id = "mbsc-collapsible-" + Ys++),
                    n.length && s)
                ) {
                    var o = ct('<span class="mbsc-collapsible-icon mbsc-ic mbsc-ic-arrow-down5"></span>');
                    ee(this, n, function () {
                        i.collapse();
                    }),
                        n
                            .attr("role", "button")
                            .attr("aria-expanded", this._isOpen)
                            .attr("aria-controls", s.id)
                            .attr("tabindex", "0")
                            .on("mousedown", function (e) {
                                e.preventDefault();
                            })
                            .on("keydown", function (e) {
                                (32 !== e.which && 13 != e.keyCode) || (e.preventDefault(), i.collapse());
                            })
                            .append(o);
                }
                ((e.mbscInst = this)._$header = n),
                    (this._$content = a),
                    (this._$elm = r),
                    (this._$accordionParent = r.parent("[mbsc-accordion], mbsc-accordion, .mbsc-accordion")),
                    (this.show = this.show.bind(this)),
                    (this.hide = this.hide.bind(this)),
                    (this.toggle = this.toggle.bind(this));
            }
            var t = e.prototype;
            return (
                (t.collapse = function (e) {
                    var t = this._$elm,
                        s = this._$content;
                    void 0 === e && (e = !this._isOpen),
                        (e && this._isOpen) ||
                            (!e && !this._isOpen) ||
                            !s.length ||
                            (e
                                ? (S &&
                                      s
                                          .on("transitionend", function e() {
                                              s.off("transitionend", e).css("height", "");
                                          })
                                          .css("height", s[0].scrollHeight),
                                  t.addClass("mbsc-collapsible-open"))
                                : (S && s.css("height", getComputedStyle(s[0]).height),
                                  setTimeout(function () {
                                      s.css("height", 0), t.removeClass("mbsc-collapsible-open");
                                  }, 50)),
                            e &&
                                this._$accordionParent &&
                                this._$accordionParent.find(".mbsc-collapsible-open").each(function () {
                                    this !== t[0] && this.mbscInst.hide();
                                }),
                            (this._isOpen = e),
                            this._$header.attr("aria-expanded", this._isOpen));
                }),
                (t.show = function () {
                    this.collapse(!0);
                }),
                (t.hide = function () {
                    this.collapse(!1);
                }),
                (t.toggle = function () {
                    this.collapse();
                }),
                (t.destroy = function () {
                    this._$elm.removeClass("mbsc-collapsible mbsc-collapsible-open"), this._$content.removeClass("mbsc-collapsible-content"), this._$header.removeClass("mbsc-collapsible-header").find(".mbsc-collapsible-icon").remove();
                }),
                e
            );
        })();
    Ce.CollapsibleBase = Us;
    var Rs = 0;
    var Ws = function (e, t, s) {
        function n(e) {
            ct(".mbsc-fr-c", e).hasClass("mbsc-wdg-c") || (ct(".mbsc-fr-c", e).addClass("mbsc-wdg-c").append(r.show()), ct(".mbsc-w-p", e).length || ct(".mbsc-fr-c", e).addClass("mbsc-w-p"));
        }
        var a,
            i,
            r = ct(e),
            o = this;
        _t.call(this, e, t, !0),
            (o._generateContent = function () {
                return "";
            }),
            (o._markupReady = function (e) {
                "inline" != a.display && n(e);
            }),
            (o._markupInserted = function (e) {
                "inline" == a.display && n(e), e.trigger("mbsc-enhance", [{ theme: a.theme, lang: a.lang }]);
            }),
            (o._markupRemove = function () {
                r.hide(), i && i.parent().length && i.after(r);
            }),
            (o.__processSettings = function () {
                (a = o.settings),
                    (o.buttons.ok = { text: a.okText, icon: a.okIcon, handler: "set" }),
                    (a.buttons = a.buttons || ("inline" == a.display ? [] : ["ok"])),
                    !i && r.parent().length && ((i = ct(document.createComment("popup"))), r.before(i)),
                    r.hide();
            }),
            s || o.init();
    };
    (Ws.prototype = { _hasDef: !0, _hasTheme: !0, _hasContent: !0, _hasLang: !0, _responsive: !0, _class: "popup", _defaults: ut({}, _t.prototype._defaults, { compClass: "mbsc-wdg", okText: "OK", headerText: !1 }) }),
        (Ce.Popup = Ws),
        (Ce.Widget = Ws),
        (se.themes.popup = se.themes.frame);
    var zs,
        qs = u && !!window.Promise,
        js = [],
        Bs = [];
    function Xs(e) {
        js.length || e.show(), js.push(e);
    }
    function Gs(e, s, n, t) {
        return ut(
            {
                display: s.display || "center",
                cssClass: "mbsc-alert",
                okText: s.okText,
                cancelText: s.cancelText,
                context: s.context,
                theme: s.theme,
                closeOnOverlayTap: !1,
                onBeforeClose: function () {
                    e.shift();
                },
                onHide: function (e, t) {
                    n && n(t._resolve), s.callback && s.callback(t._resolve), t && t.destroy(), js.length ? js[0].show() : Bs.length && Bs[0].show(!1, !0);
                },
            },
            t
        );
    }
    function Js(e) {
        return (e.title ? "<h2>" + e.title + "</h2>" : "") + "<p>" + (e.message || "") + "</p>";
    }
    function Zs(e, t, s) {
        Xs(new Ws(e, Gs(js, t, s)));
    }
    function Ks(e, t, s) {
        var n = new Ws(
            e,
            Gs(js, t, s, {
                buttons: ["cancel", "ok"],
                onSet: function () {
                    n._resolve = !0;
                },
            })
        );
        (n._resolve = !1), Xs(n);
    }
    function Qs(e, t, s) {
        var n,
            a = new Ws(
                e,
                Gs(js, t, s, {
                    buttons: ["cancel", "ok"],
                    onMarkupReady: function (e, t) {
                        var s = t.settings;
                        t._markup.find("label").addClass("mbsc-" + s.theme + (s.baseTheme ? " mbsc-" + s.baseTheme : "")),
                            (n = t._markup.find("input")[0]),
                            setTimeout(function () {
                                n.focus(), n.setSelectionRange(0, n.value.length);
                            }, 300);
                    },
                    onSet: function () {
                        a._resolve = n.value;
                    },
                })
            );
        (a._resolve = null), Xs(a);
    }
    function en(e, s, t, n, a) {
        var i,
            r,
            o,
            l = new Ws(
                e,
                Gs(Bs, s, t, {
                    display: s.display || "bottom",
                    animate: a,
                    cssClass: (n || "mbsc-snackbar") + (s.color ? " mbsc-" + s.color : ""),
                    scrollLock: !1,
                    focusTrap: !1,
                    buttons: [],
                    onMarkupReady: function (e, t) {
                        var s = t.settings;
                        t._markup.find("button").addClass("mbsc-" + s.theme + (s.baseTheme ? " mbsc-" + s.baseTheme : ""));
                    },
                    onShow: function (e, t) {
                        (zs = t),
                            !1 !== s.duration &&
                                (i = setTimeout(function () {
                                    t && t.hide();
                                }, s.duration || 3e3)),
                            s.button &&
                                t.tap(ct(".mbsc-snackbar-btn", e.target), function () {
                                    t.hide(), s.button.action && s.button.action.call(this);
                                });
                    },
                    onClose: function () {
                        (zs = null), clearTimeout(i);
                    },
                })
            );
        (r = l), (o = Bs.length), Bs.push(r), js.length || (o ? Bs[0].hide() : r.show(!1, !0));
    }
    function tn(e, t, s) {
        en(e, t, s, "mbsc-toast", "fade");
    }
    function sn(t, s, n) {
        var e;
        return (
            qs
                ? (e = new Promise(function (e) {
                      t(s, n, e);
                  }))
                : t(s, n),
            e
        );
    }
    (se.alert = function (e) {
        var t = document.createElement("div");
        return (t.innerHTML = Js(e)), sn(Zs, t, e);
    }),
        (se.confirm = function (e) {
            var t = document.createElement("div");
            return (t.innerHTML = Js(e)), sn(Ks, t, e);
        }),
        (se.prompt = function (e) {
            var t = document.createElement("div");
            return (
                (t.innerHTML =
                    Js(e) +
                    '<label class="mbsc-input">' +
                    (e.label ? '<span class="mbsc-label">' + e.label + "</span>" : "") +
                    '<input class="mbsc-control" tabindex="0" type="' +
                    (e.inputType || "text") +
                    '" placeholder="' +
                    (e.placeholder || "") +
                    '" value="' +
                    (e.value || "") +
                    '"></label>'),
                sn(Qs, t, e)
            );
        }),
        (se.snackbar = function (e) {
            var t = document.createElement("div"),
                s = e.button;
            return (
                (t.innerHTML =
                    '<div class="mbsc-snackbar-cont"><div class="mbsc-snackbar-msg">' +
                    (e.message || "") +
                    "</div>" +
                    (s ? '<button class="mbsc-snackbar-btn mbsc-btn mbsc-btn-flat">' + (s.icon ? '<span class="mbsc-ic ' + (s.text ? "mbsc-btn-ic " : "") + "mbsc-ic-" + s.icon + '"></span>' : "") + (s.text || "") + "</button>" : "") +
                    "</div>"),
                sn(en, t, e)
            );
        }),
        (se.toast = function (e) {
            var t = document.createElement("div");
            return (t.innerHTML = '<div class="mbsc-toast-msg">' + (e.message || "") + "</div>"), sn(tn, t, e);
        }),
        (se.notification = {
            dismiss: function () {
                zs && zs.hide();
            },
        });
    function nn(e, t) {
        var i,
            s = "",
            r = ct(e),
            o = {},
            n = this;
        function a() {
            r.removeClass("mbsc-no-touch");
        }
        ke.call(this, e, t, !0),
            (n.refresh = function (e) {
                var t, n, a, s;
                i.enhance &&
                    ((n = o),
                    (a = i),
                    (s = e),
                    ct("input,select,textarea,progress,button", (t = r)).each(function () {
                        var e = this,
                            t = ct(e),
                            s = Q(t);
                        if ("false" != t.attr("data-enhance"))
                            if (t.hasClass("mbsc-control")) e.mbscInst && e.mbscInst.option({ theme: a.theme, lang: a.lang, rtl: a.rtl, onText: a.onText, offText: a.offText, stopProp: a.stopProp });
                            else
                                switch ((e.id || (e.id = "mbsc-form-control-" + ++Rs), s)) {
                                    case "button":
                                    case "submit":
                                        n[e.id] = new Cs(e, { theme: a.theme, rtl: a.rtl, tap: a.tap });
                                        break;
                                    case "switch":
                                        n[e.id] = new As(e, { theme: a.theme, lang: a.lang, rtl: a.rtl, tap: a.tap, onText: a.onText, offText: a.offText, stopProp: a.stopProp });
                                        break;
                                    case "checkbox":
                                        n[e.id] = new Ts(e, { tap: a.tap, theme: a.theme, rtl: a.rtl });
                                        break;
                                    case "range":
                                        ct(e).parent().hasClass("mbsc-slider") || (n[e.id] = new Fs(e, { theme: a.theme, lang: a.lang, rtl: a.rtl, stopProp: a.stopProp, labelStyle: a.labelStyle }));
                                        break;
                                    case "rating":
                                        n[e.id] = new Hs(e, { theme: a.theme, lang: a.lang, rtl: a.rtl, stopProp: a.stopProp });
                                        break;
                                    case "progress":
                                        n[e.id] = new $s(e, { theme: a.theme, lang: a.lang, rtl: a.rtl, labelStyle: a.labelStyle });
                                        break;
                                    case "radio":
                                        n[e.id] = new Ms(e, { tap: a.tap, theme: a.theme, rtl: a.rtl });
                                        break;
                                    case "select":
                                    case "select-one":
                                    case "select-multiple":
                                        n[e.id] = new ks(e, { tap: a.tap, inputStyle: a.inputStyle, labelStyle: a.labelStyle, theme: a.theme, rtl: a.rtl });
                                        break;
                                    case "textarea":
                                        n[e.id] = new Vs(e, { tap: a.tap, inputStyle: a.inputStyle, labelStyle: a.labelStyle, theme: a.theme, rtl: a.rtl });
                                        break;
                                    case "segmented":
                                        n[e.id] = new Es(e, { theme: a.theme, rtl: a.rtl, tap: a.tap, inputStyle: a.inputStyle });
                                        break;
                                    case "stepper":
                                        n[e.id] = new Ps(e, { theme: a.theme, rtl: a.rtl });
                                        break;
                                    case "hidden":
                                        return;
                                    default:
                                        n[e.id] = new xs(e, { tap: a.tap, inputStyle: a.inputStyle, labelStyle: a.labelStyle, theme: a.theme, rtl: a.rtl });
                                }
                    }),
                    ct("[data-collapsible]:not(.mbsc-collapsible)", t).each(function () {
                        var e = this,
                            t = ct(e).attr("data-open");
                        e.id || (e.id = "mbsc-form-control-" + ++Rs), (n[e.id] = new Us(e, { isOpen: void 0 !== t && "false" != t })), (de[e.id] = n[e.id]);
                    }),
                    s || Os());
            }),
            (n._init = function () {
                se.themes.form[i.theme] || (i.theme = "mobiscroll"),
                    r.hasClass("mbsc-form") || (r.show(), it(r[0], "touchstart", a, { passive: !0 })),
                    s && r.removeClass(s),
                    (s =
                        "mbsc-form mbsc-no-touch mbsc-" +
                        i.theme +
                        (an ? " mbsc-form-hb" : "") +
                        (i.baseTheme ? " mbsc-" + i.baseTheme : "") +
                        (i.rtl ? " mbsc-rtl" : " mbsc-ltr") +
                        ("box" == i.inputStyle ? " mbsc-form-box" : "") +
                        ("outline" == i.inputStyle ? " mbsc-form-outline" : "")),
                    r.addClass(s).removeClass("mbsc-cloak"),
                    n.refresh();
            }),
            (n._destroy = function () {
                for (var e in (r.removeClass(s), be(r[0], "touchstart", a, { passive: !0 }), o)) o[e].destroy();
            }),
            (n.controls = o),
            (i = n.settings),
            n.init();
    }
    var an = "ios" == t && 7 < n;
    (nn.prototype = { _hasDef: !0, _hasTheme: !0, _hasLang: !0, _class: "form", _defaults: { tap: D, stopProp: !0, rtl: !1, enhance: !0 } }), le("[mbsc-enhance],[mbsc-form]", (Ce.Form = nn), !0);
    function rn(e, t) {
        var i = "",
            r = ct(e),
            s = this,
            o = s.settings;
        ke.call(this, e, t, !0),
            (s._init = function () {
                var e = o.context,
                    t = ct(e),
                    s = t.find(".mbsc-ms-top .mbsc-ms"),
                    n = t.find(".mbsc-ms-bottom .mbsc-ms"),
                    a = {};
                "body" == e ? ct("body,html").addClass("mbsc-page-ctx") : t.addClass("mbsc-page-ctx"),
                    i && r.removeClass(i),
                    s.length && (a.paddingTop = s[0].offsetHeight),
                    n.length && (a.paddingBottom = n[0].offsetHeight),
                    (i = "mbsc-page mbsc-" + o.theme + (o.baseTheme ? " mbsc-" + o.baseTheme : "") + (o.rtl ? " mbsc-rtl" : " mbsc-ltr")),
                    r.addClass(i).removeClass("mbsc-cloak").css(a);
            }),
            (s._destroy = function () {
                r.removeClass(i);
            }),
            (o = s.settings),
            s.init();
    }
    (rn.prototype = { _hasDef: !0, _hasTheme: !0, _hasLang: !0, _class: "page", _defaults: { context: "body" } }), (Ce.Page = rn), (se.themes.page.mobiscroll = {}), le("[mbsc-page]", rn);
    var on = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        l(e, t);
        var s = e.prototype;
        return (
            (s.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new rn(i.findDOMNode(this), e);
            }),
            (s.shouldComponentUpdate = function (e) {
                var t = !Ye(this.getSettingsFromProps(this.props), this.getSettingsFromProps(e));
                return (this.optimizeUpdate = { updateOptions: t }), !0;
            }),
            (s.render = function () {
                return v.createElement("div", { className: this.initialCssClass }, this.props.children);
            }),
            e
        );
    })(Re);
    on.propTypes = g({}, on.propTypes, {}, Ie, { onInit: e.func });
    var ln = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return (
            l(e, t),
            (e.prototype.render = function () {
                var e = "mbsc-note mbsc-note-" + this.props.color;
                return v.createElement("div", { className: e }, this.props.children);
            }),
            e
        );
    })(v.Component);
    r(ln, "propTypes", { color: e.string }), r(ln, "defaultProps", { color: "primary" });
    var cn = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return (
            l(e, t),
            (e.prototype.render = function () {
                return v.createElement("img", { className: "mbsc-avatar", src: this.props.src, alt: this.props.alt });
            }),
            e
        );
    })(v.Component);
    (se.Page = on), (se.Note = ln), (se.Avatar = cn);
    var un = e.number,
        dn = e.string,
        pn = e.func,
        hn = e.bool,
        mn = { onInit: pn, onChange: pn, value: un, disabled: hn, min: un, max: un, step: un, val: e.oneOf(["left", "right"]) },
        fn = { onInit: pn, onChange: pn, checked: hn, disabled: hn, value: hn },
        bn = (function (t) {
            function e(e) {
                return t.call(this, e) || this;
            }
            l(e, t);
            var s = e.prototype;
            return (
                (s.componentDidMount = function () {
                    var e = this.getSettingsFromProps(this.props);
                    this.instance = new nn(i.findDOMNode(this), e);
                }),
                (s.componentDidUpdate = function () {
                    if (!this.optimizeUpdate.updateOptions && this.optimizeUpdate.updateChildren) this.instance.refresh(!0);
                    else if (this.optimizeUpdate.updateOptions) {
                        var e = this.getSettingsFromProps(this.props);
                        this.instance.option(e);
                    }
                }),
                (s.checkFormWrapper = function (e) {
                    return 1 == v.Children.count(e.props.children) && "form" == e.props.children.type;
                }),
                (s.render = function () {
                    var e = this.props,
                        t = e.action,
                        s = e.method,
                        n = e.noValidate,
                        a = e.renderForm,
                        i = e.name,
                        r = e.target,
                        o = e.autoComplete,
                        l = e.onSubmit;
                    return this.checkFormWrapper(this) || !a
                        ? this.props.children
                        : v.createElement("form", { className: this.initialCssClass, action: t, name: i, target: r, method: s, autoComplete: o, noValidate: n, onSubmit: l }, this.props.children);
                }),
                e
            );
        })(We);
    r(bn, "defaultProps", { renderForm: !0 }), r(bn, "propTypes", g({}, Ie, { enhance: hn, labelStyle: dn, inputStyle: dn, onInit: pn })), (se.Form = bn);
    var vn = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        l(e, t);
        var s = e.prototype;
        return (
            (s.componentDidMount = function () {
                He.call(this, "", this.getClasses(this.props));
            }),
            (s.componentDidUpdate = function () {
                this.cssClassUpdate && He.call(this, this.cssClassUpdate.prev, this.cssClassUpdate.next);
            }),
            (s.shouldComponentUpdate = function (e) {
                var t = this.getClasses(e),
                    s = this.getClasses(this.props);
                return (this.cssClassUpdate = s !== t ? { prev: s, next: t } : null), !Ye(this.props, e);
            }),
            (s.getClasses = function (e) {
                var t = e.valid,
                    s = e.className,
                    n = e.color,
                    a = e.presetName,
                    i = e.inputStyle,
                    r = e.labelStyle,
                    o = [];
                n && o.push("mbsc-" + a + "-" + n), s && o.push(s), i && o.push("mbsc-input-" + i), r && o.push("mbsc-label-" + r), void 0 === t || t || o.push("mbsc-err");
                var l = "";
                return (
                    o.length &&
                        (l = o
                            .reduce(function (e, t) {
                                return e + " " + t;
                            })
                            .replace(/\s+/g, " ")
                            .trim()),
                    l
                );
            }),
            (s.render = function () {
                var e = this.props,
                    t = (e.valid, e.className, e.color, e.children),
                    s = (e.presetName, e.inputStyle, e.labelStyle, y(e, ["valid", "className", "color", "children", "presetName", "inputStyle", "labelStyle"]));
                return v.createElement("label", s, t);
            }),
            e
        );
    })(v.Component);
    r(vn, "propTypes", { valid: e.bool, color: e.string, presetName: e.string, inputStyle: e.string, labelStyle: e.string }), (se.Form.Label = vn), (se.Label = vn);
    var gn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).inputMounted = t.inputMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new xs(this.inputNode, e);
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.valid,
                    s = e.errorMessage,
                    n = e.type,
                    a = e.icon,
                    i = e.iconAlign,
                    r = e.passwordToggle,
                    o = e.iconShow,
                    l = e.iconHide,
                    c = e.iconUpload,
                    u = e.inputStyle,
                    d = e.labelStyle,
                    p = e.children,
                    h = e.dropdown,
                    m = y(e, ["valid", "errorMessage", "type", "icon", "iconAlign", "passwordToggle", "iconShow", "iconHide", "iconUpload", "inputStyle", "labelStyle", "children", "dropdown"]),
                    f = null;
                s && !t && (f = v.createElement("span", { className: "mbsc-err-msg" }, s));
                var b = null;
                return (
                    h && (b = v.createElement("span", { className: "mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5" })),
                    (n = n || "text"),
                    v.createElement(
                        vn,
                        { valid: t, inputStyle: u, labelStyle: d, className: h ? "mbsc-select" : "" },
                        p,
                        v.createElement(
                            "span",
                            { className: "mbsc-input-wrap" },
                            v.createElement("input", g({ ref: this.inputMounted, type: n, "data-icon": a, "data-icon-align": i, "data-password-toggle": r, "data-icon-show": o, "data-icon-hide": l, "data-icon-upload": c }, m)),
                            b,
                            f
                        )
                    )
                );
            }),
            e
        );
    })(Ue);
    r(gn, "propTypes", {
        disabled: e.bool,
        valid: e.bool,
        errorMessage: e.string,
        type: e.string,
        icon: e.string,
        iconAlign: e.string,
        passwordToggle: e.bool,
        iconShow: e.string,
        iconHide: e.string,
        iconUpload: e.string,
        name: e.string,
        dropdown: e.bool,
        inputStyle: e.string,
        labelStyle: e.string,
    }),
        (se.Input = gn);
    var yn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).textMounted = t.textMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidUpdate = function () {
                var e = this.getSettingsFromProps(this.props);
                this.optimizeUpdate
                    ? (this.optimizeUpdate.updateOptions && this.instance.option(e), this.optimizeUpdate.updateValue && this.instance.refresh())
                    : (this.instance.option(e), void 0 !== this.props.value && this.instance.refresh());
            }),
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new Vs(this.inputNode, e);
            }),
            (t.textMounted = function (e) {
                this.inputNode = e;
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.valid,
                    s = e.errorMessage,
                    n = e.icon,
                    a = e.iconAlign,
                    i = (e.inputStyle, e.labelStyle, e.children),
                    r = y(e, ["valid", "errorMessage", "icon", "iconAlign", "inputStyle", "labelStyle", "children"]),
                    o = null;
                return (
                    s && !t && (o = v.createElement("span", { className: "mbsc-err-msg" }, s)),
                    v.createElement(vn, { valid: t }, i, v.createElement("span", { className: "mbsc-input-wrap" }, v.createElement("textarea", g({ ref: this.textMounted, "data-icon": n, "data-icon-align": a }, r)), o))
                );
            }),
            e
        );
    })(We);
    r(yn, "propTypes", { disabled: e.bool, valid: e.bool, errorMessage: e.string, icon: e.string, iconAlign: e.string, name: e.string, inputStyle: e.string, labelStyle: e.string }), (se.Textarea = yn);
    var _n = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).selectMounted = t.selectMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new ks(this.selectNode, e);
            }),
            (t.selectMounted = function (e) {
                this.selectNode = e;
            }),
            (t.componentDidUpdate = function () {
                this.instance._setText();
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.label,
                    s = e.valid,
                    n = e.errorMessage,
                    a = e.icon,
                    i = e.iconAlign,
                    r = (e.inputStyle, e.labelStyle, e.children),
                    o = y(e, ["label", "valid", "errorMessage", "icon", "iconAlign", "inputStyle", "labelStyle", "children"]),
                    l = null;
                return (
                    (l = n && !s ? v.createElement("span", { className: "mbsc-err-msg" }, n) : v.createElement("span", null)),
                    v.createElement(vn, { valid: s }, t, v.createElement("span", { className: "mbsc-input-wrap" }, v.createElement("select", g({ ref: this.selectMounted, "data-icon": a, "data-icon-align": i }, o), r), l))
                );
            }),
            e
        );
    })(Ue);
    r(_n, "propTypes", { label: e.string, disabled: e.bool, valid: e.bool, errorMessage: e.string, icon: e.string, iconAlign: e.string, name: e.string, inputStyle: e.string, labelStyle: e.string }), (se.Dropdown = _n);
    var wn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).btnMounted = t.btnMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                (this.instance = new Cs(this.btnNode, e)), He.call(this, "", this.getCssClasses(this.props));
            }),
            (t.componentDidUpdate = function () {
                this.cssClassUpdate && He.call(this, this.cssClassUpdate.prev, this.cssClassUpdate.next);
            }),
            (t.shouldComponentUpdate = function (e) {
                var t = this.getCssClasses(e),
                    s = this.getCssClasses(this.props);
                return (this.cssClassUpdate = s !== t ? { prev: s, next: t } : null), !0;
            }),
            (t.btnMounted = function (e) {
                this.btnNode = e;
            }),
            (t.getCssClasses = function (e) {
                var t = e.className,
                    s = e.color,
                    n = e.flat,
                    a = e.block,
                    i = e.outline,
                    r = [];
                n && r.push("mbsc-btn-flat"), a && r.push("mbsc-btn-block"), i && r.push("mbsc-btn-outline"), s && r.push("mbsc-btn-" + s), t && r.push(t);
                var o = "";
                return (
                    r.length &&
                        (o = r
                            .reduce(function (e, t) {
                                return e + " " + t;
                            })
                            .replace(/\s+/g, " ")
                            .trim()),
                    o
                );
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.type,
                    s = e.children,
                    n = (e.className, e.color, e.flat, e.block, e.outline, e.icon),
                    a = y(e, ["type", "children", "className", "color", "flat", "block", "outline", "icon"]);
                return (t = t || "button"), v.createElement("button", g({ ref: this.btnMounted, type: t, "data-icon": n }, a), s);
            }),
            e
        );
    })(Ue);
    r(wn, "propTypes", { type: e.string, color: e.string, flat: e.bool, block: e.bool, outline: e.bool, icon: e.string, disabled: e.bool, name: e.string }), (se.Button = wn);
    var xn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).inputMounted = t.inputMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new Ts(this.inputNode, e);
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.color,
                    s = e.children,
                    n = e.errorMessage,
                    a = (e.inputStyle, e.valid),
                    i = y(e, ["color", "children", "errorMessage", "inputStyle", "valid"]),
                    r = null;
                return (
                    n && !a && (r = v.createElement("span", { className: "mbsc-err-msg" }, n)),
                    v.createElement(vn, { valid: a, color: t, presetName: "checkbox" }, v.createElement("input", g({ ref: this.inputMounted, type: "checkbox" }, i)), s, r)
                );
            }),
            e
        );
    })(Ue);
    r(xn, "propTypes", { color: e.string, disabled: e.bool, valid: e.bool, errorMessage: e.string, name: e.string, inputStyle: e.string }), (se.Checkbox = xn);
    var Cn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).inputMounted = t.inputMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new Ms(this.inputNode, e);
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.color,
                    s = e.children,
                    n = (e.inputStyle, e.valid),
                    a = e.errorMessage,
                    i = y(e, ["color", "children", "inputStyle", "valid", "errorMessage"]),
                    r = null;
                return (
                    a && !n && (r = v.createElement("span", { className: "mbsc-err-msg" }, a)),
                    v.createElement(vn, { valid: n, color: t, presetName: "radio" }, v.createElement("input", g({ ref: this.inputMounted, type: "radio" }, i)), s, r)
                );
            }),
            e
        );
    })(Ue);
    r(Cn, "propTypes", { color: e.string, name: e.string, disabled: e.bool, inputStyle: e.string, valid: e.bool, errorMessage: e.string }), (se.Radio = Cn);
    var Tn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).inputMounted = t.inputMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new Es(this.inputNode, e);
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.render = function () {
                var e = this.props,
                    t = e.color,
                    s = e.children,
                    n = e.multiSelect,
                    a = e.icon,
                    i = y(e, ["color", "children", "multiSelect", "icon"]),
                    r = n ? "checkbox" : "radio";
                return v.createElement(vn, { color: t, presetName: "segmented" }, v.createElement("input", g({ ref: this.inputMounted, type: r, "data-icon": a, "data-role": "segmented" }, i)), s);
            }),
            e
        );
    })(Ue);
    r(Tn, "propTypes", { color: e.string, name: e.string, disabled: e.bool, multiSelect: e.bool, icon: e.string }), (se.Segmented = Tn);
    var Mn = (function (n) {
        function e(e, t) {
            var s;
            return ((s = n.call(this, e) || this).presetName = t), (s.inputMounted = s.inputMounted.bind(b(s))), s;
        }
        l(e, n);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props, this.mbscInit);
                (this.instance = new Ce[this.mbscInit.component || "Scroller"](this.inputNode, e)), ct(this.inputNode).on("change", this.props.onChange || function () {}), He.call(this, "", this.getCssClasses(this.props));
            }),
            (t.shouldComponentUpdate = function (e) {
                var t = this.getCssClasses(e),
                    s = this.getCssClasses(this.props);
                return (this.cssClassUpdate = s !== t ? { prev: s, next: t } : null), n.prototype.shouldComponentUpdate.call(this, e) || this.cssClassUpdate;
            }),
            (t.componentDidUpdate = function () {
                if ((this.cssClassUpdate && He.call(this, this.cssClassUpdate.prev, this.cssClassUpdate.next), this.optimizeUpdate.updateOptions)) {
                    var e = this.getSettingsFromProps(this.props);
                    this.instance.option(e);
                }
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.getCssClasses = function (e) {
                var t = e.className,
                    s = e.color,
                    n = [];
                return (
                    s && n.push("mbsc-" + this.presetName + "-" + s),
                    t && n.push(t),
                    n.length
                        ? n
                              .reduce(function (e, t) {
                                  return e + " " + t;
                              })
                              .replace(/\s+/g, " ")
                              .trim()
                        : ""
                );
            }),
            (t.render = function () {
                var e = this.props,
                    t = (e.className, e.children),
                    s = (e.value, e.valid),
                    n = e.errorMessage,
                    a = (e.checked, e.onChange, e.name),
                    i = (e.color, e.labelStyle),
                    r = e.inputStyle,
                    o = y(e, ["className", "children", "value", "valid", "errorMessage", "checked", "onChange", "name", "color", "labelStyle", "inputStyle"]),
                    l = null;
                n && !s && (l = v.createElement("span", { className: "mbsc-err-msg" }, n));
                var c = this.inputType || "text";
                return v.createElement(vn, { valid: s, inputStyle: r, labelStyle: i }, t, v.createElement("input", g({ ref: this.inputMounted, type: c, "data-role": a, "data-enhance": "false" }, o)), l);
            }),
            e
        );
    })(We);
    r(Mn, "propTypes", g({}, Ie, { color: dn, labelStyle: dn, inputStyle: dn }));
    var kn = (function (n) {
        function e(e) {
            var t;
            return ((t = n.call(this, e, "switch") || this).mbscInit = { component: "Switch" }), (t.inputType = "checkbox"), t;
        }
        l(e, n);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                n.prototype.componentDidMount.call(this), void 0 !== this.props.checked && this.instance.setVal(this.props.checked, !0, !1);
            }),
            (t.shouldComponentUpdate = function (e) {
                var t = n.prototype.shouldComponentUpdate.call(this, e),
                    s = (this.optimizeUpdate.updateChecked = !Ye(e.checked, this.props.checked));
                return t || s;
            }),
            (t.componentDidUpdate = function () {
                n.prototype.componentDidUpdate.call(this), this.optimizeUpdate.updateChecked && !Ye(this.instance.getVal(), this.props.checked) && this.instance.setVal(this.props.checked);
            }),
            e
        );
    })(Mn);
    (kn.propTypes = g({}, kn.propTypes, {}, fn)), (se.Switch = kn);
    var Dn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e, "stepper") || this).mbscInit = { component: "Stepper" }), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                s.prototype.componentDidMount.call(this), void 0 !== this.props.value && this.instance.setVal(this.props.value, !0, !1);
            }),
            (t.componentDidUpdate = function () {
                s.prototype.componentDidUpdate.call(this), this.optimizeUpdate.updateValue && !Ye(this.props.value, this.instance.getVal()) && this.instance.setVal(this.props.value);
            }),
            e
        );
    })(Mn);
    (Dn.propTypes = g({}, Dn.propTypes, {}, mn)), (se.Stepper = Dn);
    var Sn = (function (n) {
            function e(e) {
                return n.call(this, e) || this;
            }
            l(e, n);
            var t = e.prototype;
            return (
                (t.componentDidMount = function () {
                    He.call(this, "", this.getCssClasses(this.props));
                }),
                (t.componentDidUpdate = function () {
                    n.prototype.componentDidUpdate.call(this), this.cssClassUpdate && He.call(this, this.cssClassUpdate.prev, this.cssClassUpdate.next);
                }),
                (t.shouldComponentUpdate = function (e) {
                    var t = this.getCssClasses(e),
                        s = this.getCssClasses(this.props);
                    return (this.cssClassUpdate = s !== t ? { prev: s, next: t } : null), n.prototype.shouldComponentUpdate.call(this, e) || this.cssClassUpdate;
                }),
                (t.getCssClasses = function (e) {
                    var t = e.className,
                        s = e.color,
                        n = [];
                    return (
                        s && n.push("mbsc-" + this.presetName + "-" + s),
                        t && n.push(t),
                        n.length
                            ? n
                                  .reduce(function (e, t) {
                                      return e + " " + t;
                                  })
                                  .replace(/\s+/g, " ")
                                  .trim()
                            : ""
                    );
                }),
                e
            );
        })(We),
        On = (function (s) {
            function e(e) {
                var t;
                return ((t = s.call(this, e) || this).presetName = "progress"), (t.progressMounted = t.progressMounted.bind(b(t))), t;
            }
            l(e, s);
            var t = e.prototype;
            return (
                (t.componentDidMount = function () {
                    var e = this.getSettingsFromProps(this.props);
                    (this.instance = new $s(this.progressNode, e)), void 0 !== this.props.value && this.instance.setVal(this.props.value, !0), s.prototype.componentDidMount.call(this);
                }),
                (t.progressMounted = function (e) {
                    this.progressNode = e;
                }),
                (t.render = function () {
                    var e = this.props,
                        t = (e.className, e.children),
                        s = (e.value, e.color, e.inputStyle),
                        n = e.labelStyle,
                        a = y(e, ["className", "children", "value", "color", "inputStyle", "labelStyle"]);
                    return v.createElement(vn, { labelStyle: n, inputStyle: s }, t, v.createElement("progress", g({ ref: this.progressMounted }, a)));
                }),
                e
            );
        })(Sn);
    r(On, "propTypes", g({}, Ie, { "data-icon": dn, "data-icon-align": e.oneOf(["left", "right"]), val: e.oneOf(["left", "right"]), disabled: hn, max: un, value: un, color: dn, inputStyle: dn, labelStyle: dn })), (se.Progress = On);
    var Nn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).presetName = "slider"), (t.firstInputMounted = t.firstInputMounted.bind(b(t))), (t.parentMounted = t.parentMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                (this.instance = new Fs(this.firstInput, e)), void 0 !== this.props.value && this.instance.setVal(this.props.value, !0);
                var t = this;
                ct(this.label).on("change", function () {
                    if (t.props.onChange) {
                        var e = t.instance.getVal();
                        t.props.onChange(e);
                    }
                }),
                    s.prototype.componentDidMount.call(this);
            }),
            (t.firstInputMounted = function (e) {
                this.firstInput = e;
            }),
            (t.parentMounted = function (e) {
                this.label = i.findDOMNode(e);
            }),
            (t.onValueChanged = function () {}),
            (t.render = function () {
                var e = this.props,
                    t = e.children,
                    s = e.value,
                    n = (e.onChange, e.className, e.icon),
                    a = e.live,
                    i = (e.stepLabels, e.tooltip, e.color, e.inputStyle),
                    r = e.labelStyle,
                    o = y(e, ["children", "value", "onChange", "className", "icon", "live", "stepLabels", "tooltip", "color", "inputStyle", "labelStyle"]),
                    l = s || [];
                return (
                    (a = a || this.props["data-live"] || !1),
                    (n = n || this.props["data-icon"]),
                    void 0 === s || Array.isArray(s) || (l = [s]),
                    v.createElement(
                        vn,
                        { ref: this.parentMounted, labelStyle: r, inputStyle: i },
                        t,
                        l.map(function (e, t) {
                            return 0 === t
                                ? v.createElement("input", g({ ref: this.firstInputMounted, "data-label-style": r, "data-input-style": i, "data-icon": n, "data-live": a, key: t, type: "range" }, o))
                                : v.createElement("input", { key: t, type: "range", "data-live": a, "data-index": t, "data-label-style": r, "data-input-style": i });
                        }, this)
                    )
                );
            }),
            e
        );
    })(Sn);
    r(
        Nn,
        "propTypes",
        g({}, Ie, {
            highlight: hn,
            live: hn,
            stepLabels: e.arrayOf(un),
            "data-icon": dn,
            icon: dn,
            tooltip: hn,
            val: e.oneOf(["left", "right"]),
            disabled: hn,
            max: un,
            min: un,
            step: un,
            value: e.oneOfType([un, e.arrayOf(un)]),
            color: dn,
            inputStyle: dn,
            labelStyle: dn,
        })
    ),
        (se.Slider = Nn);
    var Vn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).presetName = "rating"), (t.inputMounted = t.inputMounted.bind(b(t))), (t.parentMounted = t.parentMounted.bind(b(t))), t;
        }
        l(e, s);
        var t = e.prototype;
        return (
            (t.componentDidMount = function () {
                var t = this,
                    e = this.getSettingsFromProps(this.props);
                (this.instance = new Hs(this.inputNode, e)),
                    void 0 !== this.props.value && this.instance.setVal(this.props.value, !0),
                    ct(this.label).on("change", function () {
                        if (t.props.onChange) {
                            var e = t.instance.getVal();
                            t.props.onChange(e);
                        }
                    }),
                    s.prototype.componentDidMount.call(this);
            }),
            (t.inputMounted = function (e) {
                this.inputNode = e;
            }),
            (t.parentMounted = function (e) {
                this.label = i.findDOMNode(e);
            }),
            (t.render = function () {
                var e = this.props,
                    t = (e.className, e.children),
                    s = (e.onChange, e.value, e.empty),
                    n = e.filled,
                    a = e.template,
                    i = e.val,
                    r = (e.color, e.inputStyle),
                    o = e.labelStyle,
                    l = y(e, ["className", "children", "onChange", "value", "empty", "filled", "template", "val", "color", "inputStyle", "labelStyle"]);
                return v.createElement(
                    vn,
                    { ref: this.parentMounted, labelStyle: o, inputStyle: r },
                    t,
                    v.createElement("input", g({ type: "rating", "data-role": "rating", "data-val": i, "data-template": a, "data-empty": s, "data-filled": n, ref: this.inputMounted }, l))
                );
            }),
            e
        );
    })(Sn);
    r(Vn, "propTypes", g({}, Ie, { val: e.oneOf(["left", "right"]), disabled: hn, max: un, min: un, step: un, template: dn, empty: dn, filled: dn, value: un, color: dn, inputStyle: dn, labelStyle: dn })), (se.Rating = Vn);
    var En = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        l(e, t);
        var s = e.prototype;
        return (
            (s.componentDidMount = function () {
                if (void 0 !== this.props.collapsible) {
                    var e = this.props.open || !1;
                    this.instance = new Us(i.findDOMNode(this), { isOpen: e });
                }
            }),
            (s.componentDidUpdate = function (e) {
                void 0 !== this.props.open && this.props.open != e.open && (this.props.open ? this.instance.show() : this.instance.hide());
            }),
            (s.render = function () {
                var e = this.props,
                    t = e.children,
                    s = e.inset,
                    n = (e.collapsible, e.className),
                    a = y(e, ["children", "inset", "collapsible", "className"]),
                    i = "mbsc-form-group" + (void 0 !== s ? "-inset" : "") + " " + (n || "");
                return v.createElement("div", g({ className: i }, a), t);
            }),
            e
        );
    })(v.Component);
    r(En, "propTypes", { collapsible: e.bool, open: e.bool, inset: e.any }), (se.FormGroup = En), (se.MbscFormGroup = En);
    var Pn = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).cssClasses = "mbsc-form-group-title " + (t.props.className || "")), t;
        }
        return (
            l(e, s),
            (e.prototype.render = function () {
                return v.createElement("div", { className: this.cssClasses }, this.props.children);
            }),
            e
        );
    })(v.Component);
    (se.FormGroupTitle = Pn), (se.MbscFormGroupTitle = Pn);
    var In = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).cssClasses = "mbsc-form-group-content " + (t.props.className || "")), t;
        }
        return (
            l(e, s),
            (e.prototype.render = function () {
                return v.createElement("div", { className: this.cssClasses }, this.props.children);
            }),
            e
        );
    })(v.Component);
    (se.FormGroupContent = In), (se.MbscFormGroupContent = In);
    var Ln = (function (s) {
        function e(e) {
            var t;
            return ((t = s.call(this, e) || this).cssClasses = "mbsc-accordion " + (t.props.className || "")), t;
        }
        return (
            l(e, s),
            (e.prototype.render = function () {
                return v.createElement("div", { className: this.cssClasses }, this.props.children);
            }),
            e
        );
    })(v.Component);
    se.Accordion = Ln;
    var An = (function (t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        l(e, t);
        var s = e.prototype;
        return (
            (s.componentDidMount = function () {
                var e = this.getSettingsFromProps(this.props);
                this.instance = new Ws(this.refs.popup, e);
            }),
            (s.render = function () {
                return v.createElement("div", { className: this.initialCssClass + " mbsc-cloak", style: this.props.style, ref: "popup" }, this.props.children);
            }),
            e
        );
    })(We);
    (An.propTypes = g({}, An.propTypes, {}, Ie, {}, Le)),
        (se.Popup = An),
        (se.Widget = An),
        (se.i18n["ru-RU"] = se.i18n.ru = {
            setText: "Установить",
            cancelText: "Отмена",
            clearText: "Очистить",
            selectedText: "{count} Выбрать",
            dateFormat: "dd.mm.yy",
            dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            dayNamesShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
            dayNamesMin: ["в", "п", "в", "с", "ч", "п", "с"],
            dayText: "День",
            delimiter: ".",
            hourText: "Час",
            minuteText: "Минут",
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            monthText: "Месяц",
            secText: "Секунд",
            timeFormat: "HH:ii",
            yearText: "Год",
            nowText: "Сейчас",
            amText: "am",
            pmText: "pm",
            todayText: "Cегодня",
            firstDay: 1,
            dateText: "Дата",
            timeText: "Время",
            closeText: "Закрыть",
            allDayText: "Весь день",
            noEventsText: "Нет событий",
            eventText: "Мероприятия",
            eventsText: "Мероприятия",
            moreEventsText: "Ещё {count}",
            fromText: "Начало",
            toText: "Конец",
            wholeText: "Целое",
            fractionText: "Дробное",
            unitText: "Единица",
            labels: ["Лет", "Месяцев", "Дней", "Часов", "Минут", "Секунд", ""],
            labelsShort: ["Лет", "Мес", "Дн", "Час", "Мин", "Сек", ""],
            startText: "Старт",
            stopText: "Стоп",
            resetText: "Сбросить",
            lapText: "Круг",
            hideText: "Скрыть",
            backText: "назад",
            undoText: "ОтменитЬ",
            offText: "O",
            onText: "I",
            decimalSeparator: ",",
            thousandsSeparator: " ",
        });
    var $n = se.themes;
    ($n.frame.ios = { display: "bottom", headerText: !1, btnWidth: !1, deleteIcon: "ios-backspace", scroll3d: "wp" != t && ("android" != t || 7 < n) }),
        ($n.scroller.ios = ut({}, $n.frame.ios, {
            rows: 5,
            height: 34,
            minWidth: 55,
            selectedLineHeight: !0,
            selectedLineBorder: 1,
            showLabel: !1,
            useShortLabels: !0,
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            checkIcon: "ion-ios7-checkmark-empty",
            filterClearIcon: "ion-close-circled",
            dateDisplay: "MMdyy",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        })),
        ($n.listview.ios = { leftArrowClass: "mbsc-ic-ion-ios7-arrow-back", rightArrowClass: "mbsc-ic-ion-ios7-arrow-forward" }),
        ($n.form.ios = {});
    var Fn = se.themes;
    function Hn(e, t) {
        var s = xe(t, "X", !0),
            n = xe(t, "Y", !0),
            a = e[0],
            i = e.offset(),
            r = s - i.left,
            o = n - i.top,
            l = Math.max(r, a.offsetWidth - r),
            c = Math.max(o, a.offsetHeight - o),
            u = 2 * Math.sqrt(Math.pow(l, 2) + Math.pow(c, 2));
        Yn(Wn),
            (Wn = ct('<span class="mbsc-ripple"></span>')
                .css({ backgroundColor: getComputedStyle(a).color, width: u, height: u, top: n - i.top - u / 2, left: s - i.left - u / 2 })
                .appendTo(e)),
            setTimeout(function () {
                Wn.addClass("mbsc-ripple-scaled mbsc-ripple-visible");
            }, 10);
    }
    function Yn(e) {
        setTimeout(function () {
            e &&
                (e.removeClass("mbsc-ripple-visible"),
                setTimeout(function () {
                    e.remove();
                }, 2e3));
        }, 100);
    }
    function Un(e, s, n, a) {
        var i,
            r,
            o = e[0];
        function t(e) {
            var t = C(o, e.target, s);
            t && me(e, t) && ((i = xe(e, "X")), (r = xe(e, "Y")), (Rn = ct(t)).hasClass(n) || Rn.hasClass(a) ? (Rn = null) : Hn(Rn, e));
        }
        function l(e) {
            ((Rn && 9 < Math.abs(xe(e, "X") - i)) || 9 < Math.abs(xe(e, "Y") - r)) && (Yn(Wn), (Rn = null));
        }
        function c() {
            Rn &&
                (setTimeout(function () {
                    Yn(Wn);
                }, 100),
                (Rn = null));
        }
        o &&
            (o.__mbscRippleOff && o.__mbscRippleOff(),
            it(o, "touchstart", t, { passive: !0 }),
            it(o, "mousedown", t),
            it(o, "touchmove", l, { passive: !0 }),
            it(o, "mousemove", l),
            it(o, "touchend", c),
            it(o, "touchcancel", c),
            it(o, "mouseleave", c),
            it(o, "mouseup", c),
            (o.__mbscRippleOff = function () {
                be(o, "touchstart", t, { passive: !0 }),
                    be(o, "mousedown", t),
                    be(o, "touchmove", l, { passive: !0 }),
                    be(o, "mousemove", l),
                    be(o, "touchend", c),
                    be(o, "touchcancel", c),
                    be(o, "mouseleave", c),
                    be(o, "mouseup", c),
                    delete o.__mbscRippleOff;
            }));
    }
    (Fn.frame.bootstrap = {
        disabledClass: "disabled",
        selectedClass: "btn-primary",
        selectedTabClass: "active",
        tabLink: !0,
        todayClass: "text-primary mbsc-cal-today",
        onMarkupInserted: function (e) {
            var t = ct(e.target),
                s = ct(".mbsc-cal-tabs", t);
            ct(".mbsc-fr-popup", t).addClass("popover"),
                ct(".mbsc-fr-w", t).addClass("popover-content"),
                ct(".mbsc-fr-hdr", t).addClass("popover-title popover-header"),
                ct(".mbsc-fr-arr-i", t).addClass("popover"),
                ct(".mbsc-fr-arr", t).addClass("arrow"),
                ct(".mbsc-fr-btn", t).addClass("btn btn-default btn-secondary"),
                ct(".mbsc-fr-btn-s .mbsc-fr-btn", t).removeClass("btn-default btn-secondary").addClass("btn btn-primary"),
                s.addClass("nav nav-tabs"),
                s.find(".mbsc-cal-tab").addClass("nav-item"),
                s.find("a").addClass("nav-link"),
                s.find(".mbsc-cal-tab.active .nav-link").addClass("active"),
                ct(".mbsc-cal-picker", t).addClass("popover"),
                ct(".mbsc-range-btn", t).addClass("btn btn-sm btn-small btn-default"),
                ct(".mbsc-np-btn", t).addClass("btn btn-default"),
                ct(".mbsc-sel-filter-cont", t).removeClass("mbsc-input"),
                ct(".mbsc-sel-filter-input", t).addClass("form-control");
        },
        onTabChange: function (e, t) {
            ct(".mbsc-cal-tabs .nav-link", t._markup).removeClass("active"), ct(".mbsc-cal-tab.active .nav-link", t._markup).addClass("active");
        },
        onPosition: function (e) {
            setTimeout(function () {
                ct(".mbsc-fr-bubble-top, .mbsc-fr-bubble-top .mbsc-fr-arr-i", e.target).removeClass("bottom bs-popover-bottom").addClass("top bs-popover-top"),
                    ct(".mbsc-fr-bubble-bottom, .mbsc-fr-bubble-bottom .mbsc-fr-arr-i", e.target).removeClass("top bs-popover-top").addClass("bottom  bs-popover-bottom");
            }, 10);
        },
    }),
        (Fn.scroller.bootstrap = ut({}, Fn.frame.bootstrap, {
            dateDisplay: "Mddyy",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5 btn-light",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5 btn-light",
            selectedLineHeight: !0,
            onEventBubbleShow: function (e) {
                var t = ct(e.eventList);
                ct(".mbsc-cal-event-list", t).addClass("list-group"), ct(".mbsc-cal-event", t).addClass("list-group-item");
            },
        })),
        (Fn.navigation.bootstrap = { wrapperClass: "popover panel panel-default", groupClass: "btn-group", activeClass: "btn-primary", disabledClass: "disabled", itemClass: "btn btn-default" }),
        (Fn.form.bootstrap = {}),
        se.customTheme("mobiscroll-dark", "mobiscroll");
    var Rn,
        Wn,
        zn = se.themes;
    (zn.frame.material = {
        headerText: !1,
        btnWidth: !1,
        deleteIcon: "material-backspace",
        onMarkupReady: function (e) {
            Un(ct(e.target), ".mbsc-fr-btn-e", "mbsc-disabled", "mbsc-fr-btn-nhl");
        },
    }),
        (zn.scroller.material = ut({}, zn.frame.material, {
            showLabel: !1,
            selectedLineBorder: 2,
            weekDays: "min",
            icon: { filled: "material-star", empty: "material-star-outline" },
            checkIcon: "material-check",
            btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
            btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
            btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
            btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
        })),
        (zn.listview.material = {
            leftArrowClass: "mbsc-ic-material-keyboard-arrow-left",
            rightArrowClass: "mbsc-ic-material-keyboard-arrow-right",
            onItemActivate: function (e) {
                Hn(ct(e.target), e.domEvent);
            },
            onItemDeactivate: function () {
                Yn(Wn);
            },
            onSlideStart: function (e) {
                ct(".mbsc-ripple", e.target).remove();
            },
            onSortStart: function (e) {
                ct(".mbsc-ripple", e.target).remove();
            },
        }),
        (zn.navigation.material = {
            onInit: function () {
                Un(ct(this), ".mbsc-ms-item.mbsc-btn-e", "mbsc-disabled", "mbsc-btn-nhl");
            },
            onMarkupInit: function () {
                ct(".mbsc-ripple", this).remove();
            },
            onDestroy: function () {
                this.__mbscRippleOff && this.__mbscRippleOff();
            },
        }),
        (zn.form.material = {
            addRipple: function (e, t) {
                Hn(e, t);
            },
            removeRipple: function () {
                Yn(Wn);
            },
        }),
        se.customTheme("material-dark", "material"),
        se.customTheme("ios-dark", "ios");
    var qn = se.themes;
    (qn.frame.windows = { headerText: !1, deleteIcon: "backspace4", btnReverse: !0 }),
        (qn.scroller.windows = ut({}, qn.frame.windows, {
            rows: 6,
            minWidth: 88,
            height: 44,
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            checkIcon: "material-check",
            dateDisplay: "MMdyy",
            showLabel: !1,
            showScrollArrows: !0,
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
            dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            useShortLabels: !0,
        })),
        (qn.form.windows = {}),
        se.customTheme("windows-dark", "windows");
    var jn = se.themes,
        Bn = "mobiscroll";
    return (
        "android" == t ? (Bn = "material") : "ios" == t ? (Bn = "ios") : "wp" == t && (Bn = "windows"),
        ct.each(jn.frame, function (e, t) {
            if (Bn && t.baseTheme == Bn && e != Bn + "-dark") return (se.autoTheme = e), !1;
            e == Bn && (se.autoTheme = e);
        }),
        se
    );
});
