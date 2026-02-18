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
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
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
const { is: xt, defineProperty: Et, getOwnPropertyDescriptor: St, getOwnPropertyNames: Pt, getOwnPropertySymbols: kt, getPrototypeOf: Ut } = Object, j = globalThis, G = j.trustedTypes, Tt = G ? G.emptyScript : "", Ot = j.reactiveElementPolyfillSupport, U = (i, t) => i, I = { toAttribute(i, t) {
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
    const { get: r, set: o } = St(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : I).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : I;
      this._$Em = r;
      const c = n.fromAttribute(e, o.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? q)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[U("elementProperties")] = /* @__PURE__ */ new Map(), C[U("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: C }), (j.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Y = (i) => i, z = W.trustedTypes, tt = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, gt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + g, Nt = `<${$t}>`, b = document, T = () => b.createComment(""), O = (i) => i === null || typeof i != "object" && typeof i != "function", F = Array.isArray, Mt = (i) => F(i) || typeof i?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, it = />/g, v = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, rt = /"/g, vt = /^(?:script|style|textarea|title)$/i, Ht = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), d = Ht(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), y = b.createTreeWalker(b, 129);
function yt(i, t) {
  if (!F(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Rt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let h, u, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, u = n.exec(a), u !== null); ) f = n.lastIndex, n === k ? u[1] === "!--" ? n = et : u[1] !== void 0 ? n = it : u[2] !== void 0 ? (vt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = v) : u[3] !== void 0 && (n = v) : n === v ? u[0] === ">" ? (n = r ?? k, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? v : u[3] === '"' ? rt : st) : n === rt || n === st ? n = v : n === et || n === it ? n = k : (n = v, r = void 0);
    const m = n === v && i[c + 1].startsWith("/>") ? " " : "";
    o += n === k ? a + Nt : l >= 0 ? (s.push(h), a.slice(0, l) + gt + a.slice(l) + g + m) : a + g + (l === -2 ? c : m);
  }
  return [yt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, u] = Rt(t, e);
    if (this.el = N.createElement(h, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(gt)) {
          const f = u[n++], m = r.getAttribute(l).split(g), M = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: M[2], strings: m, ctor: M[1] === "." ? zt : M[1] === "?" ? jt : M[1] === "@" ? Dt : D }), r.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: o }), r.removeAttribute(l));
        if (vt.test(r.tagName)) {
          const l = r.textContent.split(g), f = l.length - 1;
          if (f > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < f; m++) r.append(l[m], T()), y.nextNode(), a.push({ type: 2, index: ++o });
            r.append(l[f], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === $t) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(i, t, e = i, s) {
  if (t === w) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = x(i, r._$AS(i, t.values), r, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? b).importNode(e, !0);
    y.currentNode = r;
    let o = y.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new S(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Bt(o, this, t)), this._$AV.push(h), a = s[++c];
      }
      n !== a?.index && (o = y.nextNode(), n++);
    }
    return y.currentNode = b, r;
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
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = x(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new It(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new S(this.O(T()), this.O(T()), this, this.options)) : s = e[r], s._$AI(o), r++;
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
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = x(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = x(this, c[s + a], e, a), h === w && (h = this._$AH[a]), n ||= !O(h) || h !== this._$AH[a], h === p ? t = p : t !== p && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class jt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Dt extends D {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? p) === w) return;
    const s = this._$AH, r = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
Vt?.(N, S), (W.litHtmlVersions ??= []).push("3.3.2");
const bt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new S(t.insertBefore(T(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const Z = globalThis;
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
A._$litElement$ = !0, A.finalized = !0, Z.litElementHydrateSupport?.({ LitElement: A });
const qt = Z.litElementPolyfillSupport;
qt?.({ LitElement: A });
(Z.litElementVersions ??= []).push("4.2.2");
const Ct = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Wt = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: q }, Ft = (i = Wt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(i) {
  return (t, e) => typeof e == "object" ? Ft(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function P(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
const Zt = (i) => (...t) => ({ _$litDirective$: i, values: t });
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
const { I: Kt } = Lt, nt = (i) => i, at = (i, t) => i?._$litType$ !== void 0, Qt = (i) => i?._$litType$?.h != null, ct = () => document.createComment(""), lt = (i, t, e) => {
  const s = i._$AA.parentNode, r = i._$AB;
  if (e === void 0) {
    const o = s.insertBefore(ct(), r), n = s.insertBefore(ct(), r);
    e = new Kt(o, n, i, i.options);
  } else {
    const o = e._$AB.nextSibling, n = e._$AM, c = n !== i;
    if (c) {
      let a;
      e._$AQ?.(i), e._$AM = i, e._$AP !== void 0 && (a = i._$AU) !== n._$AU && e._$AP(a);
    }
    if (o !== r || c) {
      let a = e._$AA;
      for (; a !== o; ) {
        const h = nt(a).nextSibling;
        nt(s).insertBefore(a, r), a = h;
      }
    }
  }
  return e;
}, Gt = {}, ht = (i, t = Gt) => i._$AH = t, dt = (i) => i._$AH, Xt = (i) => {
  i._$AR();
};
const pt = (i) => Qt(i) ? i._$litType$.h : i.strings, Yt = Zt(class extends Jt {
  constructor(i) {
    super(i), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(i) {
    return [i];
  }
  update(i, [t]) {
    const e = at(this.it) ? pt(this.it) : null, s = at(t) ? pt(t) : null;
    if (e !== null && (s === null || e !== s)) {
      const r = dt(i).pop();
      let o = this.et.get(e);
      if (o === void 0) {
        const n = document.createDocumentFragment();
        o = bt(p, n), o.setConnected(!1), this.et.set(e, o);
      }
      ht(o, [r]), lt(o, void 0, r);
    }
    if (s !== null) {
      if (e === null || e !== s) {
        const r = this.et.get(s);
        if (r !== void 0) {
          const o = dt(r).pop();
          Xt(i), lt(i, void 0, o), ht(i, [o]);
        }
      }
      this.it = t;
    } else this.it = void 0;
    return this.render(t);
  }
});
var ut, _t;
(function(i) {
  i.language = "language", i.system = "system", i.comma_decimal = "comma_decimal", i.decimal_comma = "decimal_comma", i.space_comma = "space_comma", i.none = "none";
})(ut || (ut = {})), (function(i) {
  i.language = "language", i.system = "system", i.am_pm = "12", i.twenty_four = "24";
})(_t || (_t = {}));
var H = function(i, t, e, s) {
  s = s || {}, e = e ?? {};
  var r = new Event(t, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return r.detail = e, i.dispatchEvent(r), r;
}, te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, _ = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ee(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
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
                  <mwc-button @click=${this._toggleCardPicker}
                    >Add Card</mwc-button
                  >
                `}
          </div>

          ${this._showCardPicker ? d`
                <hui-card-picker
                  .hass=${this.hass}
                  @config-changed=${this._cardPicked}
                ></hui-card-picker>
              ` : this._config.camera_card ? d`
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
_([
  J({ attribute: !1 })
], E.prototype, "hass", 2);
_([
  P()
], E.prototype, "_config", 2);
_([
  P()
], E.prototype, "_showCardPicker", 2);
E = _([
  Ct("corte-sip-card-editor")
], E);
let $ = class extends A {
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
            (r, o) => setTimeout(() => o(new Error("Timeout")), 5e3)
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
    if (!(!i || !this._sipCore)) {
      if (this._callError = void 0, !this._sipCore.registered) {
        try {
          if (this._sipCore.ua && !this._sipCore.ua.isRegistered()) {
            this._callError = "Attempting to register with SIP server...", this._sipCore.ua.start(), setTimeout(() => {
              this._sipCore?.registered ? (this._callError = void 0, this._sipCore.startCall(i)) : (this._callError = "Failed to register with SIP server", setTimeout(() => {
                this._callError = void 0, this.requestUpdate();
              }, 5e3)), this.requestUpdate();
            }, 2e3);
            return;
          }
        } catch (t) {
          console.error("Error attempting to register:", t);
        }
        this._callError = "Not registered with SIP server", setTimeout(() => {
          this._callError = void 0, this.requestUpdate();
        }, 5e3);
        return;
      }
      try {
        this._sipCore.startCall(i);
      } catch (t) {
        this._callError = `Failed to start call: ${t instanceof Error ? t.message : "Unknown error"}`, setTimeout(() => {
          this._callError = void 0, this.requestUpdate();
        }, 5e3);
      }
    }
  }
  render() {
    const i = this._config?.name || "SIP Call";
    return this._sipCore ? d`
      <ha-card .header=${i}>
        ${this._cameraCard ? d`<div
              id="camera-card-container"
              class="camera-container"
            ></div>` : ""}
        <div class="card-content">
          ${Yt(
      this._isRinging ? this._renderIncomingCall() : this._isInCall ? this._renderActiveCall() : this._renderIdle()
    )}
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
        ${this._cameraCard ? "" : d`<div class="call-icon">📞</div>`}
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
    return setTimeout(() => this._updateStreams(), 0), d`
      <div class="active-call">
        ${i ? d`
              <video
                id="corte-video"
                class="video-stream"
                autoplay
                playsinline
                muted
                controls
              ></video>
            ` : this._cameraCard ? "" : d`<div class="call-icon active">📞</div>`}
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
    const i = this._sipCore?.registered ? this._sipCore?.callState || "idle" : "Not Registered";
    return d`
      <div class="idle-state">
        ${this._cameraCard ? "" : d`<div class="status-icon">📱</div>`}
        <div class="status-text">No Active Calls</div>
        <div class="entity-state">
          Status: ${i}
        </div>
        ${this._callError ? d`<div class="call-error">${this._callError}</div>` : ""}
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
$.styles = mt`
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

    .call-error {
      font-size: 14px;
      color: var(--error-color, #ff0000);
      background: var(--error-color-opacity, rgba(255, 0, 0, 0.1));
      padding: 8px 12px;
      border-radius: 4px;
      text-align: center;
      width: 100%;
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
  J({ attribute: !1 })
], $.prototype, "hass", 2);
_([
  P()
], $.prototype, "_config", 2);
_([
  P()
], $.prototype, "_sipCore", 2);
_([
  P()
], $.prototype, "_isInitializing", 2);
_([
  P()
], $.prototype, "_callError", 2);
$ = _([
  Ct("corte-sip-card")
], $);
export {
  $ as CorteSipCard,
  E as CorteSipCardEditor
};
