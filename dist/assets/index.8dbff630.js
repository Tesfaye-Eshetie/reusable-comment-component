(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === 'childList')
        for (const i of s.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerpolicy && (s.referrerPolicy = o.referrerpolicy),
      o.crossorigin === 'use-credentials'
        ? (s.credentials = 'include')
        : o.crossorigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
const C = document.createElement('template');
C.innerHTML = `
  <style>
    .comment_div {
      width: 100%;
      padding: 2rem;
    }
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
  </style>
  <div class="comment_div">
    <h3></h3>
    <h4></h4>
    <p><strong>Comment:</strong> <span id='comment'></span></p>
    <p><strong>Commented on: </strong><span id='data'></span></p>
  </div>`;
class k extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(C.content.cloneNode(!0)),
      (this.likeCount = this.shadowRoot.querySelector('#like'));
  }
  connectedCallback() {
    (this.shadowRoot.querySelector(
      'h3'
    ).textContent = `Name: ${this.getAttribute('name')} `),
      (this.shadowRoot.querySelector(
        'h4'
      ).textContent = `Email: ${this.getAttribute('email')}  `),
      (this.shadowRoot.querySelector('#comment').textContent =
        this.getAttribute('comment')),
      (this.shadowRoot.querySelector('#data').textContent =
        this.getAttribute('data'));
  }
}
const x = (e, t) => t.some((n) => e instanceof n);
let L, S;
function P() {
  return (
    L ||
    (L = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function T() {
  return (
    S ||
    (S = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const I = new WeakMap(),
  b = new WeakMap(),
  M = new WeakMap(),
  y = new WeakMap(),
  v = new WeakMap();
function j(e) {
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener('success', s), e.removeEventListener('error', i);
      },
      s = () => {
        n(c(e.result)), o();
      },
      i = () => {
        r(e.error), o();
      };
    e.addEventListener('success', s), e.addEventListener('error', i);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && I.set(n, e);
      })
      .catch(() => {}),
    v.set(t, e),
    t
  );
}
function V(e) {
  if (b.has(e)) return;
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener('complete', s),
          e.removeEventListener('error', i),
          e.removeEventListener('abort', i);
      },
      s = () => {
        n(), o();
      },
      i = () => {
        r(e.error || new DOMException('AbortError', 'AbortError')), o();
      };
    e.addEventListener('complete', s),
      e.addEventListener('error', i),
      e.addEventListener('abort', i);
  });
  b.set(e, t);
}
let D = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === 'done') return b.get(e);
      if (t === 'objectStoreNames') return e.objectStoreNames || M.get(e);
      if (t === 'store')
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return c(e[t]);
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
function N(e) {
  D = e(D);
}
function O(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(g(this), t, ...n);
        return M.set(r, t.sort ? t.sort() : [t]), c(r);
      }
    : T().includes(e)
    ? function (...t) {
        return e.apply(g(this), t), c(I.get(this));
      }
    : function (...t) {
        return c(e.apply(g(this), t));
      };
}
function R(e) {
  return typeof e == 'function'
    ? O(e)
    : (e instanceof IDBTransaction && V(e), x(e, P()) ? new Proxy(e, D) : e);
}
function c(e) {
  if (e instanceof IDBRequest) return j(e);
  if (y.has(e)) return y.get(e);
  const t = R(e);
  return t !== e && (y.set(e, t), v.set(t, e)), t;
}
const g = (e) => v.get(e);
function W(e, t, { blocked: n, upgrade: r, blocking: o, terminated: s } = {}) {
  const i = indexedDB.open(e, t),
    d = c(i);
  return (
    r &&
      i.addEventListener('upgradeneeded', (a) => {
        r(c(i.result), a.oldVersion, a.newVersion, c(i.transaction));
      }),
    n && i.addEventListener('blocked', () => n()),
    d
      .then((a) => {
        s && a.addEventListener('close', () => s()),
          o && a.addEventListener('versionchange', () => o());
      })
      .catch(() => {}),
    d
  );
}
function F(e, { blocked: t } = {}) {
  const n = indexedDB.deleteDatabase(e);
  return t && n.addEventListener('blocked', () => t()), c(n).then(() => {});
}
const $ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  z = ['put', 'add', 'delete', 'clear'],
  w = new Map();
function B(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return;
  if (w.get(t)) return w.get(t);
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    o = z.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(o || $.includes(n))
  )
    return;
  const s = async function (i, ...d) {
    const a = this.transaction(i, o ? 'readwrite' : 'readonly');
    let p = a.store;
    return (
      r && (p = p.index(d.shift())),
      (await Promise.all([p[n](...d), o && a.done]))[0]
    );
  };
  return w.set(t, s), s;
}
N((e) => ({
  ...e,
  get: (t, n, r) => B(t, n) || e.get(t, n, r),
  has: (t, n) => !!B(t, n) || e.has(t, n),
}));
const q = W('myDB', 1, {
  upgrade(e) {
    e.createObjectStore('comments');
  },
});
async function K(e, t) {
  return (await q).put('comments', e, t);
}
async function _(e) {
  return (await q).getAll('comments').then((t) => {
    if (t.length)
      for (let n = 0; n < t.length; n++) {
        const r = document.createElement('user-comment');
        r.setAttribute('name', t[n].usernameValue),
          r.setAttribute('email', t[n].emailValue),
          r.setAttribute('comment', t[n].commentValue),
          r.setAttribute('data', t[n].data),
          e.append(r);
      }
  });
}
async function H() {
  await F('myDB', {
    blocked() {
      console.log('deletions is successful');
    },
  });
}
'serviceWorker' in navigator &&
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((e) => console.log('Success: ', e.scope))
      .catch((e) => console.log('Failure: ', e));
  });
window.customElements.define('user-comment', k);
const Z = document.querySelector('.main_container'),
  U = document.querySelector('#form'),
  E = document.querySelector('#username'),
  m = document.querySelector('#email'),
  f = document.querySelector('#comment'),
  h = document.querySelector('#input-checkbox'),
  G = document.querySelector('#clear_bnt'),
  u = (e, t) => {
    const n = e.parentElement,
      r = n.querySelector('.error');
    (r.innerText = t), n.classList.add('error'), n.classList.remove('success');
  },
  l = (e) => {
    const t = e.parentElement,
      n = t.querySelector('.error');
    (n.innerText = ''), t.classList.add('success'), t.classList.remove('error');
  },
  A = (e) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(e).toLowerCase()
    ),
  J = (e, t, n) => {
    e === '' ? u(E, 'Username is required') : l(E),
      t === ''
        ? u(m, 'Email is required')
        : A(t)
        ? l(m)
        : u(m, 'Provide a valid email address');
    const o = 30 - n.length;
    o === 30
      ? u(f, 'Comments is required')
      : o > 0
      ? u(f, `${o} more characters required`)
      : l(f),
      h.checked
        ? l(h)
        : u(h, "Can't proceed as you didn't agree to the terms!");
  };
U.addEventListener('submit', (e) => {
  e.preventDefault();
  const t = E.value.trim(),
    n = m.value.trim(),
    r = f.value.trim(),
    o = new Date().toString().slice(0, 15);
  !t || !n || !A(n) || r.length <= 30 || !h.checked
    ? J(t, n, r)
    : (K({ usernameValue: t, emailValue: n, commentValue: r, data: o }, n),
      window.location.reload());
});
G.addEventListener('click', () => {
  H(), window.location.reload();
});
_(Z);
