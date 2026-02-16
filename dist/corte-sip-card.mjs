const R = globalThis, D = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), Z = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (D && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (r) => new it(typeof r == "string" ? r : r + "", void 0, L), ht = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new it(e, r, L);
}, dt = (r, t) => {
  if (D) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, J = D ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ct(e);
})(r) : r;
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: _t, getOwnPropertyNames: ft, getOwnPropertySymbols: mt, getPrototypeOf: $t } = Object, I = globalThis, K = I.trustedTypes, gt = K ? K.emptyScript : "", vt = I.reactiveElementPolyfillSupport, E = (r, t) => r, k = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? gt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, B = (r, t) => !pt(r, t), F = { attribute: !0, type: String, converter: k, reflect: !1, useDefault: !1, hasChanged: B };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = F) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ut(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = _t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? F;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = $t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...ft(e), ...mt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(J(i));
    } else t !== void 0 && e.push(J(t));
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
    return dt(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : k).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : k;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? B)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[E("elementProperties")] = /* @__PURE__ */ new Map(), b[E("finalized")] = /* @__PURE__ */ new Map(), vt?.({ ReactiveElement: b }), (I.reactiveElementVersions ??= []).push("2.1.2");
const V = globalThis, G = (r) => r, H = V.trustedTypes, Q = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, rt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, nt = "?" + m, yt = `<${nt}>`, y = document, P = () => y.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", q = Array.isArray, bt = (r) => q(r) || typeof r?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, Y = />/g, g = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, ot = /^(?:script|style|textarea|title)$/i, At = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), u = At(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), v = y.createTreeWalker(y, 129);
function at(r, t) {
  if (!q(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(t) : t;
}
const Ct = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, p, c = -1, _ = 0;
    for (; _ < a.length && (o.lastIndex = _, p = o.exec(a), p !== null); ) _ = o.lastIndex, o === S ? p[1] === "!--" ? o = X : p[1] !== void 0 ? o = Y : p[2] !== void 0 ? (ot.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = g) : p[3] !== void 0 && (o = g) : o === g ? p[0] === ">" ? (o = i ?? S, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? g : p[3] === '"' ? et : tt) : o === et || o === tt ? o = g : o === X || o === Y ? o = S : (o = g, i = void 0);
    const f = o === g && r[l + 1].startsWith("/>") ? " " : "";
    n += o === S ? a + yt : c >= 0 ? (s.push(h), a.slice(0, c) + rt + a.slice(c) + m + f) : a + m + (c === -2 ? l : f);
  }
  return [at(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, p] = Ct(t, e);
    if (this.el = T.createElement(h, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = v.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(rt)) {
          const _ = p[o++], f = i.getAttribute(c).split(m), N = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: n, name: N[2], strings: f, ctor: N[1] === "." ? St : N[1] === "?" ? Et : N[1] === "@" ? xt : M }), i.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: n }), i.removeAttribute(c));
        if (ot.test(i.tagName)) {
          const c = i.textContent.split(m), _ = c.length - 1;
          if (_ > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let f = 0; f < _; f++) i.append(c[f], P()), v.nextNode(), a.push({ type: 2, index: ++n });
            i.append(c[_], P());
          }
        }
      } else if (i.nodeType === 8) if (i.data === nt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = C(r, i._$AS(r, t.values), i, s)), t;
}
class wt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? y).importNode(e, !0);
    v.currentNode = i;
    let n = v.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new O(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Pt(n, this, t)), this._$AV.push(h), a = s[++l];
      }
      o !== a?.index && (n = v.nextNode(), o++);
    }
    return v.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = C(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(at(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new wt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new O(this.O(P()), this.O(P()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = G(t).nextSibling;
      G(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = C(this, t, e, 0), o = !U(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = C(this, l[s + a], e, a), h === A && (h = this._$AH[a]), o ||= !U(h) || h !== this._$AH[a], h === d ? t = d : t !== d && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class St extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Et extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class xt extends M {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Ut = V.litHtmlPolyfillSupport;
Ut?.(T, O), (V.litHtmlVersions ??= []).push("3.3.2");
const Tt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new O(t.insertBefore(P(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const W = globalThis;
class x extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
x._$litElement$ = !0, x.finalized = !0, W.litElementHydrateSupport?.({ LitElement: x });
const Ot = W.litElementPolyfillSupport;
Ot?.({ LitElement: x });
(W.litElementVersions ??= []).push("4.2.2");
const Nt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
const Rt = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: B }, kt = (r = Rt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function lt(r) {
  return (t, e) => typeof e == "object" ? kt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
function z(r) {
  return lt({ ...r, state: !0, attribute: !1 });
}
var Ht = Object.defineProperty, It = Object.getOwnPropertyDescriptor, w = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? It(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Ht(t, e, i), i;
};
let $ = class extends x {
  constructor() {
    super(...arguments), this._isInitializing = !0, this._cameraTimestamp = Date.now(), this._updateHandler = () => {
      !this._sipCore && window.sipCore && (this._sipCore = window.sipCore, this._isInitializing = !1, this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0)), this._updateStreams(), this.requestUpdate();
    };
  }
  setConfig(r) {
    this._config = r;
  }
  connectedCallback() {
    super.connectedCallback(), window.sipCore ? (this._sipCore = window.sipCore, this._isInitializing = !1) : this._initTimeout = window.setTimeout(() => {
      this._isInitializing = !1, this.requestUpdate();
    }, 3e3), window.addEventListener("sipcore-update", this._updateHandler), this._config?.camera_entity && (this._cameraRefreshInterval = window.setInterval(() => {
      this._cameraTimestamp = Date.now(), this.requestUpdate();
    }, 1e3));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("sipcore-update", this._updateHandler), this._initTimeout && clearTimeout(this._initTimeout), this._cameraRefreshInterval && clearInterval(this._cameraRefreshInterval);
  }
  _updateStreams() {
    if (!this._sipCore) return;
    const r = this.shadowRoot?.getElementById(
      "corte-audio"
    );
    r && this._sipCore.remoteAudioStream && r.srcObject !== this._sipCore.remoteAudioStream && (r.srcObject = this._sipCore.remoteAudioStream);
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
  get _cameraUrl() {
    if (!this._config?.camera_entity || !this.hass)
      return console.log("Camera URL: No camera entity or hass", {
        camera_entity: this._config?.camera_entity,
        hass: !!this.hass
      }), null;
    const r = this.hass.states[this._config.camera_entity];
    if (!r)
      return console.log("Camera URL: Entity not found", this._config.camera_entity), null;
    if (r.attributes.entity_picture) {
      const e = `${r.attributes.entity_picture}&t=${this._cameraTimestamp}`;
      return console.log("Camera URL (entity_picture):", e), e;
    }
    const t = `/api/camera_proxy/${this._config.camera_entity}?token=${this.hass.auth?.data?.access_token || ""}&t=${this._cameraTimestamp}`;
    return console.log("Camera URL (proxy with token):", t), t;
  }
  _answerCall() {
    this._sipCore?.answerCall();
  }
  _endCall() {
    this._sipCore?.endCall();
  }
  _startCall() {
    const r = this._config?.call_number;
    r && this._sipCore && this._sipCore.startCall(r);
  }
  render() {
    const r = this._config?.name || "SIP Call";
    return this._sipCore ? u`
      <ha-card .header=${r}>
        <div class="card-content">
          ${this._isRinging ? this._renderIncomingCall() : this._isInCall ? this._renderActiveCall() : this._renderIdle()}
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
        ${this._cameraUrl ? u` <img src="${this._cameraUrl}" class="camera-feed" /> ` : u`<div class="call-icon">📞</div>`}
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
    const r = this._sipCore?.remoteVideoStream;
    return setTimeout(() => this._updateStreams(), 0), u`
      <div class="active-call">
        ${r ? u`
              <video
                id="corte-video"
                class="video-stream"
                autoplay
                playsinline
                muted
              ></video>
            ` : this._cameraUrl ? u` <img src="${this._cameraUrl}" class="camera-feed" /> ` : u`<div class="call-icon active">📞</div>`}
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
        ${this._cameraUrl ? u` <img src="${this._cameraUrl}" class="camera-feed" /> ` : u`<div class="status-icon">📱</div>`}
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
$.styles = ht`
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
w([
  lt({ attribute: !1 })
], $.prototype, "hass", 2);
w([
  z()
], $.prototype, "_config", 2);
w([
  z()
], $.prototype, "_sipCore", 2);
w([
  z()
], $.prototype, "_isInitializing", 2);
w([
  z()
], $.prototype, "_cameraTimestamp", 2);
$ = w([
  Nt("corte-sip-card")
], $);
export {
  $ as CorteSipCard
};
