const R = globalThis, V = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, B = /* @__PURE__ */ Symbol(), F = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== B) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (s) => new ct(typeof s == "string" ? s : s + "", void 0, B), lt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new ct(e, s, B);
}, ft = (s, t) => {
  if (V) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, G = V ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return _t(e);
})(s) : s;
const { is: gt, defineProperty: $t, getOwnPropertyDescriptor: vt, getOwnPropertyNames: Ct, getOwnPropertySymbols: yt, getPrototypeOf: bt } = Object, j = globalThis, Q = j.trustedTypes, At = Q ? Q.emptyScript : "", wt = j.reactiveElementPolyfillSupport, P = (s, t) => s, M = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? At : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (s, t) => !gt(s, t), X = { attribute: !0, type: String, converter: M, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = X) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && $t(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const c = r?.call(this);
      o?.call(this, a), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Ct(e), ...yt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(G(r));
    } else t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ft(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : M).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : M;
      this._$Em = r;
      const c = a.fromAttribute(e, o.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? q)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: a } = o, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[P("elementProperties")] = /* @__PURE__ */ new Map(), b[P("finalized")] = /* @__PURE__ */ new Map(), wt?.({ ReactiveElement: b }), (j.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Y = (s) => s, z = W.trustedTypes, tt = z ? z.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, dt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + g, xt = `<${ht}>`, C = document, k = () => C.createComment(""), O = (s) => s === null || typeof s != "object" && typeof s != "function", Z = Array.isArray, St = (s) => Z(s) || typeof s?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, it = />/g, $ = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, rt = /"/g, pt = /^(?:script|style|textarea|title)$/i, Et = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = Et(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), v = C.createTreeWalker(C, 129);
function ut(s, t) {
  if (!Z(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Pt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = E;
  for (let c = 0; c < e; c++) {
    const n = s[c];
    let h, u, l = -1, m = 0;
    for (; m < n.length && (a.lastIndex = m, u = a.exec(n), u !== null); ) m = a.lastIndex, a === E ? u[1] === "!--" ? a = et : u[1] !== void 0 ? a = it : u[2] !== void 0 ? (pt.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = $) : u[3] !== void 0 && (a = $) : a === $ ? u[0] === ">" ? (a = r ?? E, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? $ : u[3] === '"' ? rt : st) : a === rt || a === st ? a = $ : a === et || a === it ? a = E : (a = $, r = void 0);
    const f = a === $ && s[c + 1].startsWith("/>") ? " " : "";
    o += a === E ? n + xt : l >= 0 ? (i.push(h), n.slice(0, l) + dt + n.slice(l) + g + f) : n + g + (l === -2 ? c : f);
  }
  return [ut(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const c = t.length - 1, n = this.parts, [h, u] = Pt(t, e);
    if (this.el = T.createElement(h, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = v.nextNode()) !== null && n.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(dt)) {
          const m = u[a++], f = r.getAttribute(l).split(g), I = /([.?@])?(.*)/.exec(m);
          n.push({ type: 1, index: o, name: I[2], strings: f, ctor: I[1] === "." ? Ot : I[1] === "?" ? Tt : I[1] === "@" ? Ut : D }), r.removeAttribute(l);
        } else l.startsWith(g) && (n.push({ type: 6, index: o }), r.removeAttribute(l));
        if (pt.test(r.tagName)) {
          const l = r.textContent.split(g), m = l.length - 1;
          if (m > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let f = 0; f < m; f++) r.append(l[f], k()), v.nextNode(), n.push({ type: 2, index: ++o });
            r.append(l[m], k());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ht) n.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) n.push({ type: 7, index: o }), l += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function x(s, t, e = s, i) {
  if (t === w) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = x(s, r._$AS(s, t.values), r, i)), t;
}
class kt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? C).importNode(e, !0);
    v.currentNode = r;
    let o = v.nextNode(), a = 0, c = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let h;
        n.type === 2 ? h = new U(o, o.nextSibling, this, t) : n.type === 1 ? h = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (h = new Nt(o, this, t)), this._$AV.push(h), n = i[++c];
      }
      a !== n?.index && (o = v.nextNode(), a++);
    }
    return v.currentNode = C, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new kt(r, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new U(this.O(k()), this.O(k()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Y(t).nextSibling;
      Y(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = x(this, t, e, 0), a = !O(t) || t !== this._$AH && t !== w, a && (this._$AH = t);
    else {
      const c = t;
      let n, h;
      for (t = o[0], n = 0; n < o.length - 1; n++) h = x(this, c[i + n], e, n), h === w && (h = this._$AH[n]), a ||= !O(h) || h !== this._$AH[n], h === p ? t = p : t !== p && (t += (h ?? "") + o[n + 1]), this._$AH[n] = h;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ot extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Tt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ut extends D {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? p) === w) return;
    const i = this._$AH, r = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== p && (i === p || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const It = W.litHtmlPolyfillSupport;
It?.(T, U), (W.litHtmlVersions ??= []).push("3.3.2");
const Ht = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = r = new U(t.insertBefore(k(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
const J = globalThis;
class A extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ht(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
A._$litElement$ = !0, A.finalized = !0, J.litElementHydrateSupport?.({ LitElement: A });
const Rt = J.litElementPolyfillSupport;
Rt?.({ LitElement: A });
(J.litElementVersions ??= []).push("4.2.2");
const mt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
const Mt = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: q }, zt = (s = Mt, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(c) {
      const n = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, n, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, s, c), c;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(c) {
      const n = this[a];
      t.call(this, c), this.requestUpdate(a, n, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function K(s) {
  return (t, e) => typeof e == "object" ? zt(s, t, e) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
function N(s) {
  return K({ ...s, state: !0, attribute: !1 });
}
var at, nt;
(function(s) {
  s.language = "language", s.system = "system", s.comma_decimal = "comma_decimal", s.decimal_comma = "decimal_comma", s.space_comma = "space_comma", s.none = "none";
})(at || (at = {})), (function(s) {
  s.language = "language", s.system = "system", s.am_pm = "12", s.twenty_four = "24";
})(nt || (nt = {}));
var H = function(s, t, e, i) {
  i = i || {}, e = e ?? {};
  var r = new Event(t, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = e, s.dispatchEvent(r), r;
}, jt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, _ = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Dt(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && jt(t, e, r), r;
};
let S = class extends A {
  constructor() {
    super(...arguments), this._showCardPicker = !1;
  }
  setConfig(s) {
    this._config = s;
  }
  _valueChanged(s) {
    if (!this._config || !this.hass) return;
    const t = s.target, e = t.configValue;
    if (!e) return;
    let i = t.value;
    if (this._config[e] === i) return;
    const r = {
      ...this._config,
      [e]: i || void 0
    };
    H(this, "config-changed", { config: r });
  }
  _cameraCardChanged(s) {
    if (s.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: s.detail.value || s.detail.config
    };
    H(this, "config-changed", { config: t });
  }
  _toggleCardPicker() {
    this._showCardPicker = !this._showCardPicker;
  }
  _cardPicked(s) {
    if (s.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: s.detail.config
    };
    H(this, "config-changed", { config: t }), this._showCardPicker = !1;
  }
  _deleteCard() {
    if (!this._config) return;
    const s = {
      ...this._config,
      camera_card: void 0
    };
    H(this, "config-changed", { config: s });
  }
  render() {
    return !this.hass || !this._config ? d`` : d`
      <div class="card-config">
        <ha-textfield
          label="Name (Optional)"
          .value=${this._config.name || ""}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-textfield
          label="Call Number (Optional)"
          .value=${this._config.call_number || ""}
          .configValue=${"call_number"}
          @input=${this._valueChanged}
        ></ha-textfield>

        <div class="camera-config-section">
          <div class="camera-header">
            <h3>Camera Card (Optional)</h3>
            ${this._config.camera_card ? d`
                  <mwc-button @click=${this._deleteCard}>Remove</mwc-button>
                ` : d`
                  <mwc-button @click=${this._toggleCardPicker}>Add Card</mwc-button>
                `}
          </div>
          
          ${this._showCardPicker ? d`
                <hui-card-picker
                  .hass=${this.hass}
                  @config-changed=${this._cardPicked}
                ></hui-card-picker>
              ` : this._config.camera_card ? d`
                  <div class="card-editor-wrapper">
                    <div class="card-type-label">Type: ${this._config.camera_card.type}</div>
                    <hui-card-element-editor
                      .hass=${this.hass}
                      .value=${this._config.camera_card}
                      @config-changed=${this._cameraCardChanged}
                    ></hui-card-element-editor>
                  </div>
                ` : ""}
        </div>
      </div>
    `;
  }
};
S.styles = lt`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }

    .camera-config-section {
      margin-top: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .camera-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .card-editor-wrapper {
      margin-top: 12px;
    }

    .card-type-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
      padding: 4px 8px;
      background: var(--primary-background-color);
      border-radius: 4px;
      display: inline-block;
    }

    hui-card-element-editor {
      display: block;
      margin-top: 8px;
    }

    hui-card-picker {
      display: block;
    }
  `;
_([
  K({ attribute: !1 })
], S.prototype, "hass", 2);
_([
  N()
], S.prototype, "_config", 2);
_([
  N()
], S.prototype, "_showCardPicker", 2);
S = _([
  mt("corte-sip-card-editor")
], S);
let y = class extends A {
  constructor() {
    super(...arguments), this._isInitializing = !0, this._cameraCardCreated = !1, this._updateHandler = () => {
      !this._sipCore && window.sipCore && (this._sipCore = window.sipCore, this._isInitializing = !1, this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0)), this._updateStreams(), this.requestUpdate();
    };
  }
  static getConfigElement() {
    return document.createElement(
      "corte-sip-card-editor"
    );
  }
  static getStubConfig() {
    return {
      type: "custom:corte-sip-card",
      name: "SIP Call"
    };
  }
  setConfig(s) {
    this._config = s, this._cameraCardCreated = !1;
  }
  connectedCallback() {
    super.connectedCallback(), window.sipCore ? (this._sipCore = window.sipCore, this._isInitializing = !1) : this._initTimeout = window.setTimeout(() => {
      this._isInitializing = !1, this.requestUpdate();
    }, 3e3), window.addEventListener("sipcore-update", this._updateHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("sipcore-update", this._updateHandler), this._initTimeout && clearTimeout(this._initTimeout);
  }
  updated(s) {
    if (super.updated(s), this.hass && this._config?.camera_card && !this._cameraCardCreated && (console.log("[SIP Card] Triggering camera card creation in updated()"), this._cameraCardCreated = !0, this._createCameraCard()), s.has("hass") && this._cameraCard && (this._cameraCard.hass = this.hass), this._cameraCard) {
      const t = this.shadowRoot?.querySelector(
        "#camera-card-container"
      );
      console.log("[SIP Card] Container:", t, "Card:", this._cameraCard), t && !t.contains(this._cameraCard) && (console.log("[SIP Card] Appending camera card to container"), t.appendChild(this._cameraCard));
    }
  }
  async _createCameraCard() {
    if (!this._config?.camera_card) {
      this._cameraCard = void 0;
      return;
    }
    console.log("[SIP Card] Creating camera card with config:", this._config.camera_card);
    try {
      const s = this._config.camera_card, t = s.type.replace(/^custom:/, ""), e = s.type.startsWith("custom:") ? t : `hui-${t}-card`;
      console.log("[SIP Card] Element type:", e);
      try {
        await Promise.race([
          customElements.whenDefined(e),
          new Promise(
            (r, o) => setTimeout(() => o(new Error("Timeout")), 5e3)
          )
        ]), console.log("[SIP Card] Element is defined");
      } catch {
        console.warn(
          `Element ${e} not defined yet, attempting to create anyway`
        );
      }
      const i = document.createElement(e);
      console.log("[SIP Card] Created element:", i), i && i.setConfig ? (i.setConfig(s), i.hass = this.hass, this._cameraCard = i, console.log("[SIP Card] Camera card initialized successfully"), this.requestUpdate()) : console.error(
        `Element ${e} does not have setConfig method`
      );
    } catch (s) {
      console.error("Error creating camera card:", s), this._cameraCard = void 0;
    }
  }
  _updateStreams() {
    if (!this._sipCore) return;
    const s = this.shadowRoot?.getElementById(
      "corte-audio"
    );
    s && this._sipCore.remoteAudioStream && s.srcObject !== this._sipCore.remoteAudioStream && (s.srcObject = this._sipCore.remoteAudioStream);
    const t = this.shadowRoot?.getElementById(
      "corte-video"
    );
    t && this._sipCore.remoteVideoStream && t.srcObject !== this._sipCore.remoteVideoStream && (t.srcObject = this._sipCore.remoteVideoStream);
  }
  get _isRinging() {
    return this._sipCore?.callState === "ringing";
  }
  get _isInCall() {
    return this._sipCore?.callState === "connected" || this._sipCore?.callState === "talking";
  }
  get _callerName() {
    return this._sipCore?.remoteName || "Unknown";
  }
  get _callerNumber() {
    return this._sipCore?.remoteNumber || "";
  }
  get _callDuration() {
    return this._sipCore?.callDuration || "";
  }
  _answerCall() {
    this._sipCore?.answerCall();
  }
  _endCall() {
    this._sipCore?.endCall();
  }
  _startCall() {
    const s = this._config?.call_number;
    s && this._sipCore && this._sipCore.startCall(s);
  }
  render() {
    const s = this._config?.name || "SIP Call";
    return this._sipCore ? d`
      <ha-card .header=${s}>
        <div class="card-content">
          ${this._isRinging ? this._renderIncomingCall() : this._isInCall ? this._renderActiveCall() : this._renderIdle()}
        </div>
      </ha-card>
    ` : this._isInitializing ? d`
          <ha-card>
            <div class="card-content">
              <div class="loading">Loading SIP Core...</div>
            </div>
          </ha-card>
        ` : d`
        <ha-card>
          <div class="card-content">
            <div class="error">
              SIP Core not loaded. Make sure the SIP Core integration is
              installed and configured.
            </div>
          </div>
        </ha-card>
      `;
  }
  _renderIncomingCall() {
    return d`
      <div class="incoming-call">
        ${this._cameraCard ? d`<div id="camera-card-container"></div>` : d`<div class="call-icon">📞</div>`}
        <div class="call-info">
          <div class="caller-name">${this._callerName}</div>
          <div class="caller-number">${this._callerNumber}</div>
          <div class="call-status">Incoming Call...</div>
        </div>
        <div class="call-actions">
          <button
            class="action-button answer"
            @click=${this._answerCall}
            title="Answer Call"
          >
            <span class="button-icon">📞</span>
            <span class="button-text">Answer</span>
          </button>
          <button
            class="action-button reject"
            @click=${this._endCall}
            title="Reject Call"
          >
            <span class="button-icon">✖️</span>
            <span class="button-text">Reject</span>
          </button>
        </div>
      </div>
    `;
  }
  _renderActiveCall() {
    const s = this._sipCore?.remoteVideoStream;
    return setTimeout(() => this._updateStreams(), 0), d`
      <div class="active-call">
        ${s ? d`
              <video
                id="corte-video"
                class="video-stream"
                autoplay
                playsinline
                muted
                controls
              ></video>
            ` : this._cameraCard ? d`<div id="camera-card-container"></div>` : d`<div class="call-icon active">📞</div>`}
        <audio id="corte-audio" autoplay></audio>
        <div class="call-info">
          <div class="caller-name">${this._callerName}</div>
          <div class="caller-number">${this._callerNumber}</div>
          <div class="call-status">${this._callDuration || "Connected"}</div>
        </div>
        <div class="call-actions">
          <button
            class="action-button hangup"
            @click=${this._endCall}
            title="Hang Up"
          >
            <span class="button-icon">📵</span>
            <span class="button-text">Hang Up</span>
          </button>
        </div>
      </div>
    `;
  }
  _renderIdle() {
    return d`
      <div class="idle-state">
        ${this._cameraCard ? d`<div id="camera-card-container"></div>` : d`<div class="status-icon">📱</div>`}
        <div class="status-text">No Active Calls</div>
        <div class="entity-state">
          Status: ${this._sipCore?.callState || "idle"}
        </div>
        ${this._config?.call_number ? d`
              <div class="call-actions">
                <button
                  class="action-button call"
                  @click=${this._startCall}
                  title="Start Call"
                >
                  <span class="button-icon">📞</span>
                  <span class="button-text"
                    >Call ${this._config.call_number}</span
                  >
                </button>
              </div>
            ` : ""}
      </div>
    `;
  }
};
y.styles = lt`
    ha-card {
      background: var(--card-background-color);
    }

    .card-content {
      padding: 16px;
    }

    .error {
      color: var(--error-color, #ff0000);
      font-weight: bold;
    }

    .loading {
      color: var(--secondary-text-color);
      text-align: center;
      padding: 16px;
    }

    .incoming-call,
    .active-call,
    .idle-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
    }

    #camera-card-container {
      width: 100%;
      display: block;
    }

    .video-stream,
    .camera-feed {
      width: 100%;
      max-height: 400px;
      border-radius: 8px;
      background: #000;
      object-fit: contain;
    }

    audio {
      display: none;
    }

    .call-icon {
      font-size: 48px;
      animation: ring 1s ease-in-out infinite;
    }

    .call-icon.active {
      animation: pulse 2s ease-in-out infinite;
    }

    .status-icon {
      font-size: 48px;
      opacity: 0.5;
    }

    @keyframes ring {
      0%,
      100% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }

    .call-info {
      text-align: center;
      width: 100%;
    }

    .caller-name {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }

    .caller-number {
      font-size: 16px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .call-status {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .status-text {
      font-size: 18px;
      color: var(--secondary-text-color);
    }

    .entity-state {
      font-size: 12px;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }

    .call-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 100px;
    }

    .button-icon {
      font-size: 24px;
    }

    .button-text {
      font-size: 12px;
    }

    .action-button.answer {
      background: var(--success-color, #4caf50);
      color: white;
    }

    .action-button.answer:hover {
      background: var(--success-color-dark, #45a049);
      transform: scale(1.05);
    }

    .action-button.call {
      background: var(--primary-color, #2196f3);
      color: white;
    }

    .action-button.call:hover {
      background: var(--primary-color-dark, #1976d2);
      transform: scale(1.05);
    }

    .action-button.reject,
    .action-button.hangup {
      background: var(--error-color, #f44336);
      color: white;
    }

    .action-button.reject:hover,
    .action-button.hangup:hover {
      background: var(--error-color-dark, #da190b);
      transform: scale(1.05);
    }

    .action-button:active {
      transform: scale(0.95);
    }
  `;
_([
  K({ attribute: !1 })
], y.prototype, "hass", 2);
_([
  N()
], y.prototype, "_config", 2);
_([
  N()
], y.prototype, "_sipCore", 2);
_([
  N()
], y.prototype, "_isInitializing", 2);
y = _([
  mt("corte-sip-card")
], y);
export {
  y as CorteSipCard,
  S as CorteSipCardEditor
};
