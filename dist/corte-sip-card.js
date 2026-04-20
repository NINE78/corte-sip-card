const N = globalThis, B = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = /* @__PURE__ */ Symbol(), K = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (B && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = K.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (e) => new ft(typeof e == "string" ? e : e + "", void 0, q), mt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new ft(i, e, q);
}, wt = (e, t) => {
  if (B) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), r = N.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, Q = B ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return At(i);
})(e) : e;
const { is: Et, defineProperty: xt, getOwnPropertyDescriptor: St, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ut, getPrototypeOf: kt } = Object, j = globalThis, G = j.trustedTypes, Tt = G ? G.emptyScript : "", Rt = j.reactiveElementPolyfillSupport, k = (e, t) => e, M = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Tt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, V = (e, t) => !Et(e, t), X = { attribute: !0, type: String, converter: M, reflect: !1, useDefault: !1, hasChanged: V };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = X) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, i);
      r !== void 0 && xt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: r, set: n } = St(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
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
    const t = kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const i = this.properties, s = [...Pt(i), ...Ut(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) i.unshift(Q(r));
    } else t !== void 0 && i.push(Q(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
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
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : M).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : M;
      this._$Em = r;
      const c = o.fromAttribute(i, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? V)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[k("elementProperties")] = /* @__PURE__ */ new Map(), b[k("finalized")] = /* @__PURE__ */ new Map(), Rt?.({ ReactiveElement: b }), (j.reactiveElementVersions ??= []).push("2.1.2");
const F = globalThis, Y = (e) => e, z = F.trustedTypes, tt = z ? z.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, gt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + g, Ht = `<${$t}>`, C = document, T = () => C.createComment(""), R = (e) => e === null || typeof e != "object" && typeof e != "function", W = Array.isArray, Ot = (e) => W(e) || typeof e?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, it = />/g, v = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, rt = /"/g, vt = /^(?:script|style|textarea|title)$/i, It = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), d = It(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), y = C.createTreeWalker(C, 129);
function yt(e, t) {
  if (!W(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Nt = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = U;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let h, p, l = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, p = o.exec(a), p !== null); ) f = o.lastIndex, o === U ? p[1] === "!--" ? o = et : p[1] !== void 0 ? o = it : p[2] !== void 0 ? (vt.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = v) : p[3] !== void 0 && (o = v) : o === v ? p[0] === ">" ? (o = r ?? U, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? v : p[3] === '"' ? rt : st) : o === rt || o === st ? o = v : o === et || o === it ? o = U : (o = v, r = void 0);
    const m = o === v && e[c + 1].startsWith("/>") ? " " : "";
    n += o === U ? a + Ht : l >= 0 ? (s.push(h), a.slice(0, l) + gt + a.slice(l) + g + m) : a + g + (l === -2 ? c : m);
  }
  return [yt(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [h, p] = Nt(t, i);
    if (this.el = H.createElement(h, s), y.currentNode = this.el.content, i === 2 || i === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(gt)) {
          const f = p[o++], m = r.getAttribute(l).split(g), O = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: O[2], strings: m, ctor: O[1] === "." ? zt : O[1] === "?" ? jt : O[1] === "@" ? Dt : D }), r.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: n }), r.removeAttribute(l));
        if (vt.test(r.tagName)) {
          const l = r.textContent.split(g), f = l.length - 1;
          if (f > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < f; m++) r.append(l[m], T()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(l[f], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === $t) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = C.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(e, t, i = e, s) {
  if (t === w) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = R(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (t = E(e, r._$AS(e, t.values), r, s)), t;
}
class Mt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? C).importNode(i, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new S(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Lt(n, this, t)), this._$AV.push(h), a = s[++c];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = C, r;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class S {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = E(this, t, i), R(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Mt(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = nt.get(t.strings);
    return i === void 0 && nt.set(t.strings, i = new H(t)), i;
  }
  k(t) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new S(this.O(T()), this.O(T()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
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
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, i, 0), o = !R(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = E(this, c[s + a], i, a), h === w && (h = this._$AH[a]), o ||= !R(h) || h !== this._$AH[a], h === u ? t = u : t !== u && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class jt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Dt extends D {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = E(this, t, i, 0) ?? u) === w) return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lt {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Bt = { I: S }, qt = F.litHtmlPolyfillSupport;
qt?.(H, S), (F.litHtmlVersions ??= []).push("3.3.2");
const Ct = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new S(t.insertBefore(T(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const Z = globalThis;
let A = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ct(i, this.renderRoot, this.renderOptions);
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
const Vt = Z.litElementPolyfillSupport;
Vt?.({ LitElement: A });
(Z.litElementVersions ??= []).push("4.2.2");
const bt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Ft = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: V }, Wt = (e = Ft, t, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(e) {
  return (t, i) => typeof i == "object" ? Wt(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
function P(e) {
  return J({ ...e, state: !0, attribute: !1 });
}
const Zt = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Jt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, s) {
    this._$Ct = t, this._$AM = i, this._$Ci = s;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
const { I: Kt } = Bt, ot = (e) => e, at = (e, t) => e?._$litType$ !== void 0, Qt = (e) => e?._$litType$?.h != null, ct = () => document.createComment(""), lt = (e, t, i) => {
  const s = e._$AA.parentNode, r = e._$AB;
  if (i === void 0) {
    const n = s.insertBefore(ct(), r), o = s.insertBefore(ct(), r);
    i = new Kt(n, o, e, e.options);
  } else {
    const n = i._$AB.nextSibling, o = i._$AM, c = o !== e;
    if (c) {
      let a;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (a = e._$AU) !== o._$AU && i._$AP(a);
    }
    if (n !== r || c) {
      let a = i._$AA;
      for (; a !== n; ) {
        const h = ot(a).nextSibling;
        ot(s).insertBefore(a, r), a = h;
      }
    }
  }
  return i;
}, Gt = {}, ht = (e, t = Gt) => e._$AH = t, dt = (e) => e._$AH, Xt = (e) => {
  e._$AR();
};
const ut = (e) => Qt(e) ? e._$litType$.h : e.strings, Yt = Zt(class extends Jt {
  constructor(e) {
    super(e), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(e) {
    return [e];
  }
  update(e, [t]) {
    const i = at(this.it) ? ut(this.it) : null, s = at(t) ? ut(t) : null;
    if (i !== null && (s === null || i !== s)) {
      const r = dt(e).pop();
      let n = this.et.get(i);
      if (n === void 0) {
        const o = document.createDocumentFragment();
        n = Ct(u, o), n.setConnected(!1), this.et.set(i, n);
      }
      ht(n, [r]), lt(n, void 0, r);
    }
    if (s !== null) {
      if (i === null || i !== s) {
        const r = this.et.get(s);
        if (r !== void 0) {
          const n = dt(r).pop();
          Xt(e), lt(e, void 0, n), ht(e, [n]);
        }
      }
      this.it = t;
    } else this.it = void 0;
    return this.render(t);
  }
});
var pt, _t;
(function(e) {
  e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none";
})(pt || (pt = {})), (function(e) {
  e.language = "language", e.system = "system", e.am_pm = "12", e.twenty_four = "24";
})(_t || (_t = {}));
var I = function(e, t, i, s) {
  s = s || {}, i = i ?? {};
  var r = new Event(t, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return r.detail = i, e.dispatchEvent(r), r;
}, te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, _ = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ee(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && te(t, i, r), r;
};
let x = class extends A {
  constructor() {
    super(...arguments), this._showCardPicker = !1;
  }
  setConfig(e) {
    this._config = e;
  }
  _valueChanged(e) {
    if (!this._config || !this.hass) return;
    const t = e.target, i = t.configValue;
    if (!i) return;
    let s = t.value;
    if (this._config[i] === s) return;
    const r = {
      ...this._config,
      [i]: s || void 0
    };
    I(this, "config-changed", { config: r });
  }
  _cameraCardChanged(e) {
    if (e.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: e.detail.value || e.detail.config
    };
    I(this, "config-changed", { config: t });
  }
  _toggleCardPicker() {
    this._showCardPicker = !this._showCardPicker;
  }
  _cardPicked(e) {
    if (e.stopPropagation(), !this._config) return;
    const t = {
      ...this._config,
      camera_card: e.detail.value || e.detail.config
    };
    I(this, "config-changed", { config: t }), this._showCardPicker = !1;
  }
  _deleteCard() {
    if (!this._config) return;
    const e = {
      ...this._config,
      camera_card: void 0
    };
    I(this, "config-changed", { config: e });
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
x.styles = mt`
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
], x.prototype, "hass", 2);
_([
  P()
], x.prototype, "_config", 2);
_([
  P()
], x.prototype, "_showCardPicker", 2);
x = _([
  bt("corte-sip-card-editor")
], x);
let $ = class extends A {
  constructor() {
    super(...arguments), this._isInitializing = !0, this._isReconnecting = !1, this._cameraCardCreated = !1, this._updateHandler = () => {
      !this._sipCore && window.sipCore && (this._sipCore = window.sipCore, this._isInitializing = !1, this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0), this._attachUaListeners()), this._updateStreams(), this.requestUpdate();
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
  setConfig(e) {
    this._config = e, this._cameraCardCreated = !1;
  }
  connectedCallback() {
    super.connectedCallback(), window.sipCore ? (this._sipCore = window.sipCore, this._isInitializing = !1, this._attachUaListeners()) : this._initTimeout = window.setTimeout(() => {
      this._isInitializing = !1, this.requestUpdate();
    }, 3e3), window.addEventListener("sipcore-update", this._updateHandler), this._reregisterInterval = window.setInterval(
      () => this._checkAndReregister(),
      3e4
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("sipcore-update", this._updateHandler), this._detachUaListeners(), this._initTimeout && clearTimeout(this._initTimeout), this._reregisterInterval && (clearInterval(this._reregisterInterval), this._reregisterInterval = void 0);
  }
  _attachUaListeners() {
    const e = this._sipCore?.ua;
    !e || typeof e.on != "function" || (this._uaDisconnectedHandler = () => {
      this._isReconnecting || this._checkAndReregister();
    }, this._uaRegistrationFailedHandler = () => {
      this._isReconnecting || this._checkAndReregister();
    }, e.on("disconnected", this._uaDisconnectedHandler), e.on("registrationFailed", this._uaRegistrationFailedHandler));
  }
  _detachUaListeners() {
    const e = this._sipCore?.ua;
    !e || typeof e.removeListener != "function" || (this._uaDisconnectedHandler && (e.removeListener("disconnected", this._uaDisconnectedHandler), this._uaDisconnectedHandler = void 0), this._uaRegistrationFailedHandler && (e.removeListener(
      "registrationFailed",
      this._uaRegistrationFailedHandler
    ), this._uaRegistrationFailedHandler = void 0));
  }
  /**
   * Recreates the JSSIP UA and WebSocketInterface by calling the integration's
   * own setupUser() method, then starts the new UA.
   * Simply calling ua.stop() + ua.start() is not enough: once the
   * WebSocketInterface enters a failed state, JsSIP cannot reuse it.
   * setupUser() → setupUA() constructs `new WebSocketInterface(url)`, which
   * is exactly what a page refresh would do.
   */
  async _restartUA(e) {
    this._detachUaListeners();
    try {
      e.ua.stop();
    } catch (t) {
      console.warn("corte-sip-card: ua.stop() failed", t);
    }
    await new Promise((t) => window.setTimeout(t, 500));
    try {
      await e.setupUser();
    } catch (t) {
      console.error("corte-sip-card: setupUser() failed", t);
      return;
    }
    try {
      e.ua.start();
    } catch (t) {
      console.error("corte-sip-card: ua.start() failed after setupUser", t);
    }
    this._attachUaListeners();
  }
  _checkAndReregister() {
    const e = this._sipCore ?? window.sipCore;
    !e || this._isReconnecting || e.callState === "ringing" || e.callState === "connected" || e.callState === "talking" || !e.registered && e.ua && (this._isReconnecting = !0, this._restartUA(e).then(() => {
      window.setTimeout(() => {
        this._isReconnecting = !1, this.requestUpdate();
      }, 6e3);
    }));
  }
  updated(e) {
    if (super.updated(e), this.hass && this._config?.camera_card && !this._cameraCardCreated && (this._cameraCardCreated = !0, this._createCameraCard()), e.has("hass") && this._cameraCard && (this._cameraCard.hass = this.hass), this._cameraCard) {
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
      const e = this._config.camera_card, t = e.type.replace(/^custom:/, ""), i = e.type.startsWith("custom:") ? t : `hui-${t}-card`;
      try {
        await Promise.race([
          customElements.whenDefined(i),
          new Promise(
            (r, n) => setTimeout(() => n(new Error("Timeout")), 5e3)
          )
        ]);
      } catch {
        console.warn(
          `Element ${i} not defined yet, attempting to create anyway`
        );
      }
      const s = document.createElement(i);
      s && s.setConfig ? (s.setConfig(e), s.hass = this.hass, this._cameraCard = s, this.requestUpdate()) : console.error(`Element ${i} does not have setConfig method`);
    } catch (e) {
      console.error("Error creating camera card:", e), this._cameraCard = void 0;
    }
  }
  _updateStreams() {
    if (!this._sipCore) return;
    const e = this.shadowRoot?.getElementById(
      "corte-audio"
    );
    e && this._sipCore.remoteAudioStream && e.srcObject !== this._sipCore.remoteAudioStream && (e.srcObject = this._sipCore.remoteAudioStream);
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
    const e = this._config?.call_number;
    if (!(!e || !this._sipCore)) {
      if (this._callError = void 0, !this._sipCore.registered) {
        this._callError = "Attempting to register with SIP server...", this.requestUpdate(), this._reconnectThenCall(e);
        return;
      }
      try {
        this._sipCore.startCall(e);
      } catch (t) {
        this._callError = `Failed to start call: ${t instanceof Error ? t.message : "Unknown error"}`, setTimeout(() => {
          this._callError = void 0, this.requestUpdate();
        }, 5e3);
      }
    }
  }
  _reconnectThenCall(e) {
    const t = this._sipCore;
    if (!t?.ua) {
      this._callError = "Not registered with SIP server", setTimeout(() => {
        this._callError = void 0, this.requestUpdate();
      }, 5e3);
      return;
    }
    this._restartUA(t).then(() => {
      let i = 0;
      const s = window.setInterval(() => {
        if (i++, this._sipCore?.registered) {
          clearInterval(s), this._callError = void 0;
          try {
            this._sipCore.startCall(e);
          } catch (r) {
            this._callError = `Failed to start call: ${r instanceof Error ? r.message : "Unknown error"}`, setTimeout(() => {
              this._callError = void 0, this.requestUpdate();
            }, 5e3);
          }
          this._isReconnecting = !1, this.requestUpdate();
        } else i >= 12 && (clearInterval(s), this._isReconnecting = !1, this._callError = "Failed to register with SIP server", setTimeout(() => {
          this._callError = void 0, this.requestUpdate();
        }, 5e3), this.requestUpdate());
      }, 1e3);
    });
  }
  render() {
    const e = this._config?.name || "SIP Call";
    return this._sipCore ? d`
      <ha-card .header=${e}>
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
            <span class="button-text">Answer</span>
          </button>
          <button
            class="action-button reject"
            @click=${this._endCall}
            title="Reject Call"
          >
            <span class="button-text">Reject</span>
          </button>
        </div>
      </div>
    `;
  }
  _renderActiveCall() {
    const e = this._sipCore?.remoteVideoStream;
    return setTimeout(() => this._updateStreams(), 0), d`
      <div class="active-call">
        ${e ? d`
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
          <div class="call-status">${this._callDuration || "Connected"}</div>
        </div>
        <div class="call-actions">
          <button
            class="action-button hangup"
            @click=${this._endCall}
            title="Hang Up"
          >
            <span class="button-text">Hang Up</span>
          </button>
        </div>
      </div>
    `;
  }
  _renderIdle() {
    const e = this._sipCore?.registered ? this._sipCore?.callState || "idle" : "Not Registered";
    return d`
      <div class="idle-state">
        ${this._cameraCard ? "" : d`<div class="status-icon">📱</div>`}
        <div class="entity-state">Status: ${e}</div>
        ${this._callError ? d`<div class="call-error">${this._callError}</div>` : ""}
        ${this._config?.call_number ? d`
              <div class="call-actions">
                <button
                  class="action-button call"
                  @click=${this._startCall}
                  title="Start Call"
                >
                  <span class="button-text">Call</span>
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
      font-size: 12px;
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
  bt("corte-sip-card")
], $);
export {
  $ as CorteSipCard,
  x as CorteSipCardEditor
};
