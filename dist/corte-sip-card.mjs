const R = globalThis, L = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = /* @__PURE__ */ Symbol(), K = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (L && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (i) => new ft(typeof i == "string" ? i : i + "", void 0, V), mt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new ft(e, i, V);
}, wt = (i, t) => {
  if (L) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = R.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, Q = L ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return At(e);
})(i) : i;
const { is: xt, defineProperty: Et, getOwnPropertyDescriptor: St, getOwnPropertyNames: Pt, getOwnPropertySymbols: kt, getPrototypeOf: Ut } = Object, j = globalThis, G = j.trustedTypes, Tt = G ? G.emptyScript : "", Ot = j.reactiveElementPolyfillSupport, k = (i, t) => i, I = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Tt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (i, t) => !xt(i, t), X = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = X) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Et(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = St(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, s = [...Pt(e), ...kt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(Q(r));
    } else t !== void 0 && e.push(Q(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : I).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : I;
      this._$Em = r;
      const c = o.fromAttribute(e, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? q)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[k("elementProperties")] = /* @__PURE__ */ new Map(), C[k("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: C }), (j.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Y = (i) => i, z = W.trustedTypes, tt = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, $t = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + $, Nt = `<${gt}>`, y = document, U = () => y.createComment(""), T = (i) => i === null || typeof i != "object" && typeof i != "function", Z = Array.isArray, Mt = (i) => Z(i) || typeof i?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, it = />/g, g = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, rt = /"/g, vt = /^(?:script|style|textarea|title)$/i, Ht = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Ht(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), v = y.createTreeWalker(y, 129);
function yt(i, t) {
  if (!Z(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Rt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let d, p, l = -1, _ = 0;
    for (; _ < a.length && (o.lastIndex = _, p = o.exec(a), p !== null); ) _ = o.lastIndex, o === P ? p[1] === "!--" ? o = et : p[1] !== void 0 ? o = it : p[2] !== void 0 ? (vt.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = g) : p[3] !== void 0 && (o = g) : o === g ? p[0] === ">" ? (o = r ?? P, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? g : p[3] === '"' ? rt : st) : o === rt || o === st ? o = g : o === et || o === it ? o = P : (o = g, r = void 0);
    const m = o === g && i[c + 1].startsWith("/>") ? " " : "";
    n += o === P ? a + Nt : l >= 0 ? (s.push(d), a.slice(0, l) + $t + a.slice(l) + $ + m) : a + $ + (l === -2 ? c : m);
  }
  return [yt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [d, p] = Rt(t, e);
    if (this.el = O.createElement(d, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = v.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith($t)) {
          const _ = p[o++], m = r.getAttribute(l).split($), M = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: n, name: M[2], strings: m, ctor: M[1] === "." ? zt : M[1] === "?" ? jt : M[1] === "@" ? Dt : D }), r.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: n }), r.removeAttribute(l));
        if (vt.test(r.tagName)) {
          const l = r.textContent.split($), _ = l.length - 1;
          if (_ > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < _; m++) r.append(l[m], U()), v.nextNode(), a.push({ type: 2, index: ++n });
            r.append(l[_], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === gt) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(i, t, e = i, s) {
  if (t === w) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = x(i, r._$AS(i, t.values), r, s)), t;
}
class It {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? y).importNode(e, !0);
    v.currentNode = r;
    let n = v.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new S(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Bt(n, this, t)), this._$AV.push(d), a = s[++c];
      }
      o !== a?.index && (n = v.nextNode(), o++);
    }
    return v.currentNode = y, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class S {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = x(this, t, e), T(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new It(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new S(this.O(U()), this.O(U()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Y(t).nextSibling;
      Y(t).remove(), t = s;
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
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = x(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = x(this, c[s + a], e, a), d === w && (d = this._$AH[a]), o ||= !T(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class jt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Dt extends D {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? h) === w) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const Lt = { I: S }, Vt = W.litHtmlPolyfillSupport;
Vt?.(O, S), (W.litHtmlVersions ??= []).push("3.3.2");
const bt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new S(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const F = globalThis;
let A = class extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bt(e, this.renderRoot, this.renderOptions);
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
};
A._$litElement$ = !0, A.finalized = !0, F.litElementHydrateSupport?.({ LitElement: A });
const qt = F.litElementPolyfillSupport;
qt?.({ LitElement: A });
(F.litElementVersions ??= []).push("4.2.2");
const Ct = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Wt = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: q }, Zt = (i = Wt, t, e) => {
  const { kind: s, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: o } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(i) {
  return (t, e) => typeof e == "object" ? Zt(i, t, e) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, t, e);
}
function N(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
const Ft = (i) => (...t) => ({ _$litDirective$: i, values: t });
let Jt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
const { I: Kt } = Lt, ot = (i) => i, at = (i, t) => i?._$litType$ !== void 0, Qt = (i) => i?._$litType$?.h != null, ct = () => document.createComment(""), lt = (i, t, e) => {
  const s = i._$AA.parentNode, r = i._$AB;
  if (e === void 0) {
    const n = s.insertBefore(ct(), r), o = s.insertBefore(ct(), r);
    e = new Kt(n, o, i, i.options);
  } else {
    const n = e._$AB.nextSibling, o = e._$AM, c = o !== i;
    if (c) {
      let a;
      e._$AQ?.(i), e._$AM = i, e._$AP !== void 0 && (a = i._$AU) !== o._$AU && e._$AP(a);
    }
    if (n !== r || c) {
      let a = e._$AA;
      for (; a !== n; ) {
        const d = ot(a).nextSibling;
        ot(s).insertBefore(a, r), a = d;
      }
    }
  }
  return e;
}, Gt = {}, dt = (i, t = Gt) => i._$AH = t, ht = (i) => i._$AH, Xt = (i) => {
  i._$AR();
};
const ut = (i) => Qt(i) ? i._$litType$.h : i.strings, Yt = Ft(class extends Jt {
  constructor(i) {
    super(i), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(i) {
    return [i];
  }
  update(i, [t]) {
    const e = at(this.it) ? ut(this.it) : null, s = at(t) ? ut(t) : null;
    if (e !== null && (s === null || e !== s)) {
      const r = ht(i).pop();
      let n = this.et.get(e);
      if (n === void 0) {
        const o = document.createDocumentFragment();
        n = bt(h, o), n.setConnected(!1), this.et.set(e, n);
      }
      dt(n, [r]), lt(n, void 0, r);
    }
    if (s !== null) {
      if (e === null || e !== s) {
        const r = this.et.get(s);
        if (r !== void 0) {
          const n = ht(r).pop();
          Xt(i), lt(i, void 0, n), dt(i, [n]);
        }
      }
      this.it = t;
    } else this.it = void 0;
    return this.render(t);
  }
});
var pt, _t;
(function(i) {
  i.language = "language", i.system = "system", i.comma_decimal = "comma_decimal", i.decimal_comma = "decimal_comma", i.space_comma = "space_comma", i.none = "none";
})(pt || (pt = {})), (function(i) {
  i.language = "language", i.system = "system", i.am_pm = "12", i.twenty_four = "24";
})(_t || (_t = {}));
var H = function(i, t, e, s) {
  s = s || {}, e = e ?? {};
  var r = new Event(t, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return r.detail = e, i.dispatchEvent(r), r;
}, te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, f = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ee(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && te(t, e, r), r;
};
let E = class extends A {
  constructor() {
    super(...arguments), this._showCardPicker = !1;
  }
  setConfig(i) {
    this._config = i;
  }
  _valueChanged(i) {
    if (!this._config || !this.hass) return;
    const t = i.target, e = t.configValue;
    if (!e) return;
    let s = t.value;
    if (this._config[e] === s) return;
    const r = {
      ...this._config,
      [e]: s || void 0
    };
    H(this, "config-changed", { config: r });
  }
  _cameraCardChanged(i) {
    if (i.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: i.detail.value || i.detail.config
    };
    H(this, "config-changed", { config: t });
  }
  _toggleCardPicker() {
    this._showCardPicker = !this._showCardPicker;
  }
  _cardPicked(i) {
    if (i.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: i.detail.config
    };
    H(this, "config-changed", { config: t }), this._showCardPicker = !1;
  }
  _deleteCard() {
    if (!this._config) return;
    const i = {
      ...this._config,
      camera_card: void 0
    };
    H(this, "config-changed", { config: i });
  }
  render() {
    return !this.hass || !this._config ? u`` : u`
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
            ${this._config.camera_card ? u`
                  <mwc-button @click=${this._deleteCard}>Remove</mwc-button>
                ` : u`
                  <mwc-button @click=${this._toggleCardPicker}
                    >Add Card</mwc-button
                  >
                `}
          </div>

          ${this._showCardPicker ? u`
                <hui-card-picker
                  .hass=${this.hass}
                  @config-changed=${this._cardPicked}
                ></hui-card-picker>
              ` : this._config.camera_card ? u`
                  <div class="card-editor-wrapper">
                    <div class="card-type-label">
                      Type: ${this._config.camera_card.type}
                    </div>
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
E.styles = mt`
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
f([
  J({ attribute: !1 })
], E.prototype, "hass", 2);
f([
  N()
], E.prototype, "_config", 2);
f([
  N()
], E.prototype, "_showCardPicker", 2);
E = f([
  Ct("corte-sip-card-editor")
], E);
let b = class extends A {
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
  setConfig(i) {
    this._config = i, this._cameraCardCreated = !1;
  }
  connectedCallback() {
    super.connectedCallback(), window.sipCore ? (this._sipCore = window.sipCore, this._isInitializing = !1) : this._initTimeout = window.setTimeout(() => {
      this._isInitializing = !1, this.requestUpdate();
    }, 3e3), window.addEventListener("sipcore-update", this._updateHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("sipcore-update", this._updateHandler), this._initTimeout && clearTimeout(this._initTimeout);
  }
  updated(i) {
    if (super.updated(i), this.hass && this._config?.camera_card && !this._cameraCardCreated && (this._cameraCardCreated = !0, this._createCameraCard()), i.has("hass") && this._cameraCard && (this._cameraCard.hass = this.hass), this._cameraCard) {
      const t = this.shadowRoot?.querySelector(
        ".camera-container"
      );
      t && !t.contains(this._cameraCard) && t.appendChild(this._cameraCard);
    }
  }
  async _createCameraCard() {
    if (!this._config?.camera_card) {
      this._cameraCard = void 0;
      return;
    }
    try {
      const i = this._config.camera_card, t = i.type.replace(/^custom:/, ""), e = i.type.startsWith("custom:") ? t : `hui-${t}-card`;
      try {
        await Promise.race([
          customElements.whenDefined(e),
          new Promise(
            (r, n) => setTimeout(() => n(new Error("Timeout")), 5e3)
          )
        ]);
      } catch {
        console.warn(
          `Element ${e} not defined yet, attempting to create anyway`
        );
      }
      const s = document.createElement(e);
      s && s.setConfig ? (s.setConfig(i), s.hass = this.hass, this._cameraCard = s, this.requestUpdate()) : console.error(`Element ${e} does not have setConfig method`);
    } catch (i) {
      console.error("Error creating camera card:", i), this._cameraCard = void 0;
    }
  }
  _updateStreams() {
    if (!this._sipCore) return;
    const i = this.shadowRoot?.getElementById(
      "corte-audio"
    );
    i && this._sipCore.remoteAudioStream && i.srcObject !== this._sipCore.remoteAudioStream && (i.srcObject = this._sipCore.remoteAudioStream);
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
    const i = this._config?.call_number;
    i && this._sipCore && this._sipCore.startCall(i);
  }
  render() {
    const i = this._config?.name || "SIP Call";
    return this._sipCore ? u`
      <ha-card .header=${i}>
        ${this._cameraCard ? u`<div id="camera-card-container" class="camera-container"></div>` : ""}
        <div class="card-content">
          ${Yt(
      this._isRinging ? this._renderIncomingCall() : this._isInCall ? this._renderActiveCall() : this._renderIdle()
    )}
        </div>
      </ha-card>
    ` : this._isInitializing ? u`
          <ha-card>
            <div class="card-content">
              <div class="loading">Loading SIP Core...</div>
            </div>
          </ha-card>
        ` : u`
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
    return u`
      <div class="incoming-call">
        ${this._cameraCard ? "" : u`<div class="call-icon">📞</div>`}
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
    const i = this._sipCore?.remoteVideoStream;
    return setTimeout(() => this._updateStreams(), 0), u`
      <div class="active-call">
        ${i ? u`
              <video
                id="corte-video"
                class="video-stream"
                autoplay
                playsinline
                muted
                controls
              ></video>
            ` : this._cameraCard ? "" : u`<div class="call-icon active">📞</div>`}
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
    return u`
      <div class="idle-state">
        ${this._cameraCard ? "" : u`<div class="status-icon">📱</div>`}
        <div class="status-text">No Active Calls</div>
        <div class="entity-state">
          Status: ${this._sipCore?.callState || "idle"}
        </div>
        ${this._config?.call_number ? u`
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
b.styles = mt`
    ha-card {
      background: var(--card-background-color);
    }

    .camera-container {
      width: 100%;
      display: block;
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
f([
  J({ attribute: !1 })
], b.prototype, "hass", 2);
f([
  N()
], b.prototype, "_config", 2);
f([
  N()
], b.prototype, "_sipCore", 2);
f([
  N()
], b.prototype, "_isInitializing", 2);
b = f([
  Ct("corte-sip-card")
], b);
export {
  b as CorteSipCard,
  E as CorteSipCardEditor
};
