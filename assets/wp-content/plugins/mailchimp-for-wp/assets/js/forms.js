(() => {
  var e = {
      9885: (e) => {
        function t() {
          this.listeners = {};
        }
        (t.prototype.emit = function (e, t) {
          (this.listeners[e] = this.listeners[e] ?? []),
            this.listeners[e].forEach((e) => e.apply(null, t));
        }),
          (t.prototype.on = function (e, t) {
            (this.listeners[e] = this.listeners[e] ?? []),
              this.listeners[e].push(t);
          }),
          (e.exports = t);
      },
      5626: () => {
        function e(e) {
          const t = !!e.getAttribute("data-show-if"),
            n = t
              ? e.getAttribute("data-show-if").split(":")
              : e.getAttribute("data-hide-if").split(":"),
            r = n[0],
            i = (n.length > 1 ? n[1] : "*").split("|"),
            o = (function (e, t) {
              const n = [],
                r = e.querySelectorAll(
                  'input[name="' +
                    t +
                    '"],select[name="' +
                    t +
                    '"],textarea[name="' +
                    t +
                    '"]'
                );
              for (let e = 0; e < r.length; e++)
                (("radio" !== r[e].type && "checkbox" !== r[e].type) ||
                  r[e].checked) &&
                  n.push(r[e].value);
              return n;
            })(
              (function (e) {
                let t = e;
                for (; t.parentElement; )
                  if (((t = t.parentElement), "FORM" === t.tagName)) return t;
                return null;
              })(e),
              r
            );
          let s = !1;
          for (let e = 0; e < o.length && !s; e++)
            s =
              i.indexOf(o[e]) > -1 || (i.indexOf("*") > -1 && o[e].length > 0);
          e.style.display = t ? (s ? "" : "none") : s ? "none" : "";
          const a = e.querySelectorAll("input,select,textarea");
          for (let e = 0; e < a.length; e++)
            (s || t) &&
              a[e].getAttribute("data-was-required") &&
              ((a[e].required = !0), a[e].removeAttribute("data-was-required")),
              (s && t) ||
                !a[e].required ||
                (a[e].setAttribute("data-was-required", "true"),
                (a[e].required = !1));
        }
        function t() {
          const t = document.querySelectorAll(
            ".mc4wp-form [data-show-if],.mc4wp-form [data-hide-if]"
          );
          for (let n = 0; n < t.length; n++) e(t[n]);
        }
        function n(t) {
          if (
            !t.target ||
            !t.target.form ||
            t.target.form.className.indexOf("mc4wp-form") < 0
          )
            return;
          const n = t.target.form.querySelectorAll(
            "[data-show-if],[data-hide-if]"
          );
          for (let t = 0; t < n.length; t++) e(n[t]);
        }
        document.addEventListener("keyup", n, !0),
          document.addEventListener("change", n, !0),
          document.addEventListener("mc4wp-refresh", t, !0),
          window.addEventListener("load", t),
          t();
      },
      6942: (e, t, n) => {
        const r = n(2076),
          i = n(6564),
          o = function (e, t) {
            (this.id = e),
              (this.element = t || document.createElement("form")),
              (this.name =
                this.element.getAttribute("data-name") || "Form #" + this.id),
              (this.errors = []),
              (this.started = !1);
          };
        (o.prototype.setData = function (e) {
          try {
            i(this.element, e);
          } catch (e) {
            console.error(e);
          }
        }),
          (o.prototype.getData = function () {
            return r(this.element, { hash: !0, empty: !0 });
          }),
          (o.prototype.getSerializedData = function () {
            return r(this.element, { hash: !1, empty: !0 });
          }),
          (o.prototype.setResponse = function (e) {
            this.element.querySelector(".mc4wp-response").innerHTML = e;
          }),
          (o.prototype.reset = function () {
            this.setResponse(""),
              (this.element.querySelector(".mc4wp-form-fields").style.display =
                ""),
              this.element.reset();
          }),
          (e.exports = o);
      },
      9685: (e, t, n) => {
        const r = n(6942),
          i = [],
          o = new (n(9885))();
        function s(e, t) {
          t = t || parseInt(e.getAttribute("data-id")) || 0;
          const n = new r(t, e);
          return i.push(n), n;
        }
        e.exports = {
          get: function (e) {
            e = parseInt(e);
            for (let t = 0; t < i.length; t++) if (i[t].id === e) return i[t];
            return s(document.querySelector(".mc4wp-form-" + e), e);
          },
          getByElement: function (e) {
            const t = e.form || e;
            for (let e = 0; e < i.length; e++)
              if (i[e].element === t) return i[e];
            return s(t);
          },
          on: function (e, t) {
            o.on(e, t);
          },
          trigger: function (e, t) {
            "submit" === e || e.indexOf(".submit") > 0
              ? (o.emit(t[0].id + "." + e, t), o.emit(e, t))
              : window.setTimeout(function () {
                  o.emit(t[0].id + "." + e, t), o.emit(e, t);
                }, 10);
          },
        };
      },
      2076: (e) => {
        var t = /^(?:submit|button|image|reset|file)$/i,
          n = /^(?:input|select|textarea|keygen)/i,
          r = /(\[[^\[\]]*\])/g;
        function i(e, t, n) {
          if (0 === t.length) return n;
          var r = t.shift(),
            o = r.match(/^\[(.+?)\]$/);
          if ("[]" === r)
            return (
              (e = e || []),
              Array.isArray(e)
                ? e.push(i(null, t, n))
                : ((e._values = e._values || []),
                  e._values.push(i(null, t, n))),
              e
            );
          if (o) {
            var s = o[1],
              a = +s;
            isNaN(a)
              ? ((e = e || {})[s] = i(e[s], t, n))
              : ((e = e || [])[a] = i(e[a], t, n));
          } else e[r] = i(e[r], t, n);
          return e;
        }
        function o(e, t, n) {
          if (t.match(r))
            i(
              e,
              (function (e) {
                var t = [],
                  n = new RegExp(r),
                  i = /^([^\[\]]*)/.exec(e);
                for (i[1] && t.push(i[1]); null !== (i = n.exec(e)); )
                  t.push(i[1]);
                return t;
              })(t),
              n
            );
          else {
            var o = e[t];
            o ? (Array.isArray(o) || (e[t] = [o]), e[t].push(n)) : (e[t] = n);
          }
          return e;
        }
        function s(e, t, n) {
          return (
            (n = n.replace(/(\r)?\n/g, "\r\n")),
            (n = (n = encodeURIComponent(n)).replace(/%20/g, "+")),
            e + (e ? "&" : "") + encodeURIComponent(t) + "=" + n
          );
        }
        e.exports = function (e, r) {
          "object" != typeof r
            ? (r = { hash: !!r })
            : void 0 === r.hash && (r.hash = !0);
          for (
            var i = r.hash ? {} : "",
              a = r.serializer || (r.hash ? o : s),
              c = e && e.elements ? e.elements : [],
              l = Object.create(null),
              u = 0;
            u < c.length;
            ++u
          ) {
            var f = c[u];
            if (
              (r.disabled || !f.disabled) &&
              f.name &&
              n.test(f.nodeName) &&
              !t.test(f.type)
            ) {
              var d = f.name,
                h = f.value;
              if (
                (("checkbox" !== f.type && "radio" !== f.type) ||
                  f.checked ||
                  (h = void 0),
                r.empty)
              ) {
                if (
                  ("checkbox" !== f.type || f.checked || (h = ""),
                  "radio" === f.type &&
                    (l[f.name] || f.checked
                      ? f.checked && (l[f.name] = !0)
                      : (l[f.name] = !1)),
                  null == h && "radio" == f.type)
                )
                  continue;
              } else if (!h) continue;
              if ("select-multiple" !== f.type) i = a(i, d, h);
              else {
                h = [];
                for (var p = f.options, m = !1, g = 0; g < p.length; ++g) {
                  var y = p[g],
                    v = r.empty && !y.value,
                    w = y.value || v;
                  y.selected &&
                    w &&
                    ((m = !0),
                    (i =
                      r.hash && "[]" !== d.slice(d.length - 2)
                        ? a(i, d + "[]", y.value)
                        : a(i, d, y.value)));
                }
                !m && r.empty && (i = a(i, d, ""));
              }
            }
          }
          if (r.empty) for (var d in l) l[d] || (i = a(i, d, ""));
          return i;
        };
      },
      6564: (e) => {
        e.exports &&
          (e.exports = function e(t, n, r) {
            for (const i in n) {
              if (!n.hasOwnProperty(i)) continue;
              const o = i;
              let s = n[i];
              if (
                (void 0 === s && (s = ""),
                null === s && (s = ""),
                void 0 !== r && (o = r + "[" + i + "]"),
                s.constructor === Array)
              )
                o += "[]";
              else if ("object" == typeof s) {
                e(t, s, o);
                continue;
              }
              const a = t.elements.namedItem(o);
              if (!a) continue;
              const c = a.type || a[0].type;
              switch (c) {
                default:
                  a.value = s;
                  break;
                case "radio":
                case "checkbox":
                  {
                    const e = s.constructor === Array ? s : [s];
                    for (let t = 0; t < a.length; t++)
                      a[t].checked = e.indexOf(a[t].value) > -1;
                  }
                  break;
                case "select-multiple":
                  {
                    const e = s.constructor === Array ? s : [s];
                    for (let t = 0; t < a.options.length; t++)
                      a.options[t].selected =
                        e.indexOf(a.options[t].value) > -1;
                  }
                  break;
                case "select":
                case "select-one":
                  a.value = s.toString() || s;
                  break;
                case "date":
                  a.value = new Date(s).toISOString().split("T")[0];
              }
              const l = new Event("change", { bubbles: !0 });
              switch (c) {
                default:
                  a.dispatchEvent(l);
                  break;
                case "radio":
                case "checkbox":
                  for (let e = 0; e < a.length; e++)
                    a[e].checked && a[e].dispatchEvent(l);
              }
            }
          });
      },
    },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var o = (t[r] = { exports: {} });
    return e[r](o, o.exports, n), o.exports;
  }
  const r = window.mc4wp || {},
    i = n(9685);
  function o(e, t) {
    document.addEventListener(
      e,
      (e) => {
        if (!e.target) return;
        const n = e.target;
        (("string" == typeof n.className &&
          n.className.indexOf("mc4wp-form") > -1) ||
          ("function" == typeof n.matches && n.matches(".mc4wp-form *"))) &&
          t.call(e, e);
      },
      !0
    );
  }
  n(5626),
    o("submit", function (e) {
      if (e.defaultPrevented) return;
      const t = i.getByElement(e.target);
      i.trigger("submit", [t, e]);
    }),
    o("focus", function (e) {
      const t = i.getByElement(e.target);
      t.started || (i.trigger("started", [t, e]), (t.started = !0));
    }),
    o("change", function (e) {
      const t = i.getByElement(e.target);
      i.trigger("change", [t, e]);
    }),
    r.listeners &&
      ([].forEach.call(r.listeners, function (e) {
        i.on(e.event, e.callback);
      }),
      delete r.listeners),
    (r.forms = i),
    (window.mc4wp = r);
})();
