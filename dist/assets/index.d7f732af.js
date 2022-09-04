(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const c of o)
      if (c.type === 'childList')
        for (const s of c.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const c = {};
    return (
      o.integrity && (c.integrity = o.integrity),
      o.referrerpolicy && (c.referrerPolicy = o.referrerpolicy),
      o.crossorigin === 'use-credentials'
        ? (c.credentials = 'include')
        : o.crossorigin === 'anonymous'
        ? (c.credentials = 'omit')
        : (c.credentials = 'same-origin'),
      c
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const c = n(o);
    fetch(o.href, c);
  }
})();
try {
  self['workbox:window:6.5.3'] && _();
} catch {}
function x(e, t) {
  return new Promise(function (n) {
    var r = new MessageChannel();
    (r.port1.onmessage = function (o) {
      n(o.data);
    }),
      e.postMessage(t, [r.port2]);
  });
}
function K(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function q(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function H(e, t) {
  var n;
  if (typeof Symbol > 'u' || e[Symbol.iterator] == null) {
    if (
      Array.isArray(e) ||
      (n = (function (o, c) {
        if (o) {
          if (typeof o == 'string') return q(o, c);
          var s = Object.prototype.toString.call(o).slice(8, -1);
          return (
            s === 'Object' && o.constructor && (s = o.constructor.name),
            s === 'Map' || s === 'Set'
              ? Array.from(o)
              : s === 'Arguments' ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)
              ? q(o, c)
              : void 0
          );
        }
      })(e)) ||
      (t && e && typeof e.length == 'number')
    ) {
      n && (e = n);
      var r = 0;
      return function () {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  return (n = e[Symbol.iterator]()).next.bind(n);
}
try {
  self['workbox:core:6.5.3'] && _();
} catch {}
var k = function () {
  var e = this;
  this.promise = new Promise(function (t, n) {
    (e.resolve = t), (e.reject = n);
  });
};
function P(e, t) {
  var n = location.href;
  return new URL(e, n).href === new URL(t, n).href;
}
var g = function (e, t) {
  (this.type = e), Object.assign(this, t);
};
function y(e, t, n) {
  return n
    ? t
      ? t(e)
      : e
    : ((e && e.then) || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
function Z() {}
var G = { type: 'SKIP_WAITING' };
function O(e, t) {
  if (!t) return e && e.then ? e.then(Z) : Promise.resolve();
}
var Y = (function (e) {
  var t, n;
  function r(f, u) {
    var i, a;
    return (
      u === void 0 && (u = {}),
      ((i = e.call(this) || this).nn = {}),
      (i.tn = 0),
      (i.rn = new k()),
      (i.en = new k()),
      (i.on = new k()),
      (i.un = 0),
      (i.an = new Set()),
      (i.cn = function () {
        var d = i.fn,
          l = d.installing;
        i.tn > 0 ||
        !P(l.scriptURL, i.sn.toString()) ||
        performance.now() > i.un + 6e4
          ? ((i.vn = l), d.removeEventListener('updatefound', i.cn))
          : ((i.hn = l), i.an.add(l), i.rn.resolve(l)),
          ++i.tn,
          l.addEventListener('statechange', i.ln);
      }),
      (i.ln = function (d) {
        var l = i.fn,
          m = d.target,
          p = m.state,
          L = m === i.vn,
          D = { sw: m, isExternal: L, originalEvent: d };
        !L && i.mn && (D.isUpdate = !0),
          i.dispatchEvent(new g(p, D)),
          p === 'installed'
            ? (i.wn = self.setTimeout(function () {
                p === 'installed' &&
                  l.waiting === m &&
                  i.dispatchEvent(new g('waiting', D));
              }, 200))
            : p === 'activating' && (clearTimeout(i.wn), L || i.en.resolve(m));
      }),
      (i.dn = function (d) {
        var l = i.hn,
          m = l !== navigator.serviceWorker.controller;
        i.dispatchEvent(
          new g('controlling', {
            isExternal: m,
            originalEvent: d,
            sw: l,
            isUpdate: i.mn,
          })
        ),
          m || i.on.resolve(l);
      }),
      (i.gn =
        ((a = function (d) {
          var l = d.data,
            m = d.ports,
            p = d.source;
          return y(i.getSW(), function () {
            i.an.has(p) &&
              i.dispatchEvent(
                new g('message', { data: l, originalEvent: d, ports: m, sw: p })
              );
          });
        }),
        function () {
          for (var d = [], l = 0; l < arguments.length; l++)
            d[l] = arguments[l];
          try {
            return Promise.resolve(a.apply(this, d));
          } catch (m) {
            return Promise.reject(m);
          }
        })),
      (i.sn = f),
      (i.nn = u),
      navigator.serviceWorker.addEventListener('message', i.gn),
      i
    );
  }
  (n = e),
    ((t = r).prototype = Object.create(n.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = n);
  var o,
    c,
    s = r.prototype;
  return (
    (s.register = function (f) {
      var u = (f === void 0 ? {} : f).immediate,
        i = u !== void 0 && u;
      try {
        var a = this;
        return (function (d, l) {
          var m = d();
          return m && m.then ? m.then(l) : l(m);
        })(
          function () {
            if (!i && document.readyState !== 'complete')
              return O(
                new Promise(function (d) {
                  return window.addEventListener('load', d);
                })
              );
          },
          function () {
            return (
              (a.mn = Boolean(navigator.serviceWorker.controller)),
              (a.yn = a.pn()),
              y(a.bn(), function (d) {
                (a.fn = d),
                  a.yn &&
                    ((a.hn = a.yn),
                    a.en.resolve(a.yn),
                    a.on.resolve(a.yn),
                    a.yn.addEventListener('statechange', a.ln, { once: !0 }));
                var l = a.fn.waiting;
                return (
                  l &&
                    P(l.scriptURL, a.sn.toString()) &&
                    ((a.hn = l),
                    Promise.resolve()
                      .then(function () {
                        a.dispatchEvent(
                          new g('waiting', {
                            sw: l,
                            wasWaitingBeforeRegister: !0,
                          })
                        );
                      })
                      .then(function () {})),
                  a.hn && (a.rn.resolve(a.hn), a.an.add(a.hn)),
                  a.fn.addEventListener('updatefound', a.cn),
                  navigator.serviceWorker.addEventListener(
                    'controllerchange',
                    a.dn
                  ),
                  a.fn
                );
              })
            );
          }
        );
      } catch (d) {
        return Promise.reject(d);
      }
    }),
    (s.update = function () {
      try {
        return this.fn ? O(this.fn.update()) : void 0;
      } catch (f) {
        return Promise.reject(f);
      }
    }),
    (s.getSW = function () {
      return this.hn !== void 0 ? Promise.resolve(this.hn) : this.rn.promise;
    }),
    (s.messageSW = function (f) {
      try {
        return y(this.getSW(), function (u) {
          return x(u, f);
        });
      } catch (u) {
        return Promise.reject(u);
      }
    }),
    (s.messageSkipWaiting = function () {
      this.fn && this.fn.waiting && x(this.fn.waiting, G);
    }),
    (s.pn = function () {
      var f = navigator.serviceWorker.controller;
      return f && P(f.scriptURL, this.sn.toString()) ? f : void 0;
    }),
    (s.bn = function () {
      try {
        var f = this;
        return (function (u, i) {
          try {
            var a = u();
          } catch (d) {
            return i(d);
          }
          return a && a.then ? a.then(void 0, i) : a;
        })(
          function () {
            return y(
              navigator.serviceWorker.register(f.sn, f.nn),
              function (u) {
                return (f.un = performance.now()), u;
              }
            );
          },
          function (u) {
            throw u;
          }
        );
      } catch (u) {
        return Promise.reject(u);
      }
    }),
    (o = r),
    (c = [
      {
        key: 'active',
        get: function () {
          return this.en.promise;
        },
      },
      {
        key: 'controlling',
        get: function () {
          return this.on.promise;
        },
      },
    ]) && K(o.prototype, c),
    r
  );
})(
  (function () {
    function e() {
      this.Pn = new Map();
    }
    var t = e.prototype;
    return (
      (t.addEventListener = function (n, r) {
        this.Sn(n).add(r);
      }),
      (t.removeEventListener = function (n, r) {
        this.Sn(n).delete(r);
      }),
      (t.dispatchEvent = function (n) {
        n.target = this;
        for (var r, o = H(this.Sn(n.type)); !(r = o()).done; ) (0, r.value)(n);
      }),
      (t.Sn = function (n) {
        return this.Pn.has(n) || this.Pn.set(n, new Set()), this.Pn.get(n);
      }),
      e
    );
  })()
);
function J(e = {}) {
  const {
    immediate: t = !1,
    onNeedRefresh: n,
    onOfflineReady: r,
    onRegistered: o,
    onRegisterError: c,
  } = e;
  let s;
  const f = async (u = !0) => {};
  return (
    'serviceWorker' in navigator &&
      ((s = new Y('/./sw.js', { scope: '/', type: 'classic' })),
      s.addEventListener('activated', (u) => {
        u.isUpdate ? window.location.reload() : r == null || r();
      }),
      s
        .register({ immediate: t })
        .then((u) => {
          o == null || o(u);
        })
        .catch((u) => {
          c == null || c(u);
        })),
    f
  );
}
const Q = (e, t) => t.some((n) => e instanceof n);
let T, N;
function X() {
  return (
    T ||
    (T = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function ee() {
  return (
    N ||
    (N = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const V = new WeakMap(),
  R = new WeakMap(),
  $ = new WeakMap(),
  I = new WeakMap(),
  j = new WeakMap();
function te(e) {
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener('success', c), e.removeEventListener('error', s);
      },
      c = () => {
        n(h(e.result)), o();
      },
      s = () => {
        r(e.error), o();
      };
    e.addEventListener('success', c), e.addEventListener('error', s);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && V.set(n, e);
      })
      .catch(() => {}),
    j.set(t, e),
    t
  );
}
function ne(e) {
  if (R.has(e)) return;
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener('complete', c),
          e.removeEventListener('error', s),
          e.removeEventListener('abort', s);
      },
      c = () => {
        n(), o();
      },
      s = () => {
        r(e.error || new DOMException('AbortError', 'AbortError')), o();
      };
    e.addEventListener('complete', c),
      e.addEventListener('error', s),
      e.addEventListener('abort', s);
  });
  R.set(e, t);
}
let A = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === 'done') return R.get(e);
      if (t === 'objectStoreNames') return e.objectStoreNames || $.get(e);
      if (t === 'store')
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return h(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === 'done' || t === 'store')
      ? !0
      : t in e;
  },
};
function re(e) {
  A = e(A);
}
function oe(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(B(this), t, ...n);
        return $.set(r, t.sort ? t.sort() : [t]), h(r);
      }
    : ee().includes(e)
    ? function (...t) {
        return e.apply(B(this), t), h(V.get(this));
      }
    : function (...t) {
        return h(e.apply(B(this), t));
      };
}
function ie(e) {
  return typeof e == 'function'
    ? oe(e)
    : (e instanceof IDBTransaction && ne(e), Q(e, X()) ? new Proxy(e, A) : e);
}
function h(e) {
  if (e instanceof IDBRequest) return te(e);
  if (I.has(e)) return I.get(e);
  const t = ie(e);
  return t !== e && (I.set(e, t), j.set(t, e)), t;
}
const B = (e) => j.get(e);
function se(e, t, { blocked: n, upgrade: r, blocking: o, terminated: c } = {}) {
  const s = indexedDB.open(e, t),
    f = h(s);
  return (
    r &&
      s.addEventListener('upgradeneeded', (u) => {
        r(h(s.result), u.oldVersion, u.newVersion, h(s.transaction));
      }),
    n && s.addEventListener('blocked', () => n()),
    f
      .then((u) => {
        c && u.addEventListener('close', () => c()),
          o && u.addEventListener('versionchange', () => o());
      })
      .catch(() => {}),
    f
  );
}
function ce(e, { blocked: t } = {}) {
  const n = indexedDB.deleteDatabase(e);
  return t && n.addEventListener('blocked', () => t()), h(n).then(() => {});
}
const ae = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  ue = ['put', 'add', 'delete', 'clear'],
  C = new Map();
function U(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return;
  if (C.get(t)) return C.get(t);
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    o = ue.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(o || ae.includes(n))
  )
    return;
  const c = async function (s, ...f) {
    const u = this.transaction(s, o ? 'readwrite' : 'readonly');
    let i = u.store;
    return (
      r && (i = i.index(f.shift())),
      (await Promise.all([i[n](...f), o && u.done]))[0]
    );
  };
  return C.set(t, c), c;
}
re((e) => ({
  ...e,
  get: (t, n, r) => U(t, n) || e.get(t, n, r),
  has: (t, n) => !!U(t, n) || e.has(t, n),
}));
const W = se('myDB', 1, {
  upgrade(e) {
    e.createObjectStore('comments'), e.createObjectStore('performance');
  },
});
class le {
  constructor(t = {}) {
    const n = this;
    (this.subscribers = []),
      W.then(async (r) => {
        this.db = r;
        const o = await r.get('performance', 'like');
        o && this.set('like', o);
      }),
      (this.state = new Proxy(t, {
        async set(r, o, c) {
          return (
            (r[o] = c),
            o !== 'like' && (r.like = (r.like || 0) + 1),
            n.db &&
              (await n.db.put('performance', c, o),
              o !== 'like' &&
                (await n.db.put('performance', r.performance, 'like'))),
            n.subscribers.forEach((s) => s(r)),
            !0
          );
        },
      }));
  }
  subscribe(t) {
    if (typeof t != 'function')
      throw new Error('You must subscribe with a function');
    this.subscribers.push(t), t(this.state);
  }
  set(t, n) {
    this.state[t] = n;
  }
  get(t) {
    return this.state[t];
  }
  increment() {
    this.set('like', (this.get('like') || 0) + 1);
  }
}
new le({ performance: 0 });
const z = document.createElement('template');
z.innerHTML = `
<style>
h3, h4 {
  font-weight: bold;
  margin: 1rem 0;
}
h3 {
  font-size: 1.4rem;
}
p {
  font-size: .9rem;
  line-height: 1.4rem;
}
strong {
  font-weight: bold;
}
#preference span {
  min-width: 3rem;
  display: inline-block;
  text-align: center;
}
#preference {
  font-weight: bold;
  font-size: 1.4rem;
}

</style>
  <div>
    <h3></h3>
    <h4></h4>
    <p><strong>Comment:</strong> <span></span></p>
    <p><strong>Commented on: </strong>${new Date()}</p>
    </div>`;
class de extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(z.content.cloneNode(!0)),
      (this.likeCount = this.shadowRoot.querySelector('#like'));
  }
  connectedCallback() {
    (this.shadowRoot.querySelector(
      'h3'
    ).textContent = `Name: ${this.getAttribute('name')} `),
      (this.shadowRoot.querySelector(
        'h4'
      ).textContent = `Email: ${this.getAttribute('email')}  `),
      (this.shadowRoot.querySelector('span').textContent =
        this.getAttribute('comment'));
  }
}
async function fe(e, t) {
  return (await W).put('comments', e, t);
}
async function me(e) {
  return (await W).getAll('comments').then((t) => {
    if (t.length)
      for (let n = 0; n < t.length; n++) {
        const r = document.createElement('user-comment');
        r.setAttribute('name', t[n].usernameValue),
          r.setAttribute('email', t[n].emailValue),
          r.setAttribute('comment', t[n].commentValue),
          e.append(r);
      }
    console.log(t);
  });
}
async function he() {
  await ce('myDB', {
    blocked() {
      console.log('deletions is successful');
    },
  });
}
const pe = J({
  onNeedRefresh() {
    pe(), console.log('Need Refresh');
  },
  onOfflineReady() {
    console.log('Offline Ready');
  },
  onRegistered() {
    console.log('Registered');
  },
  onRegisterError(e) {
    console.log('Register Error'), console.error(e);
  },
});
window.customElements.define('user-comment', de);
const ve = document.querySelector('.main_container'),
  ge = document.querySelector('#form'),
  M = document.querySelector('#username'),
  b = document.querySelector('#email'),
  E = document.querySelector('#comment'),
  S = document.querySelector('#input-checkbox'),
  ye = document.querySelector('#clear_bnt'),
  v = (e, t) => {
    const n = e.parentElement,
      r = n.querySelector('.error');
    (r.innerText = t), n.classList.add('error'), n.classList.remove('success');
  },
  w = (e) => {
    const t = e.parentElement,
      n = t.querySelector('.error');
    (n.innerText = ''), t.classList.add('success'), t.classList.remove('error');
  },
  F = (e) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(e).toLowerCase()
    ),
  we = (e, t, n) => {
    e === '' ? v(M, 'Username is required') : w(M),
      t === ''
        ? v(b, 'Email is required')
        : F(t)
        ? w(b)
        : v(b, 'Provide a valid email address');
    const o = 30 - n.length;
    o === 30
      ? v(E, 'Comments is required')
      : o > 0
      ? v(E, `${o} more characters required`)
      : w(E),
      S.checked
        ? w(S)
        : v(S, "Can't proceed as you didn't agree to the terms!");
  };
ge.addEventListener('submit', (e) => {
  e.preventDefault();
  const t = M.value.trim(),
    n = b.value.trim(),
    r = E.value.trim();
  !t || !n || !F(n) || r.length <= 30 || !S.checked
    ? we(t, n, r)
    : (fe({ usernameValue: t, emailValue: n, commentValue: r }, n),
      window.location.reload());
});
ye.addEventListener('click', () => {
  he(), window.location.reload();
});
me(ve);
