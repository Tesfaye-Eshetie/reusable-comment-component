(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === 'childList')
        for (const i of s.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && o(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerpolicy && (s.referrerPolicy = r.referrerpolicy),
      r.crossorigin === 'use-credentials'
        ? (s.credentials = 'include')
        : r.crossorigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = n(r);
    fetch(r.href, s);
  }
})();
const B = document.createElement('template');
B.innerHTML = `
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
class A extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(B.content.cloneNode(!0)),
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
  q = new WeakMap(),
  y = new WeakMap(),
  v = new WeakMap();
function N(e) {
  const t = new Promise((n, o) => {
    const r = () => {
        e.removeEventListener('success', s), e.removeEventListener('error', i);
      },
      s = () => {
        n(c(e.result)), r();
      },
      i = () => {
        o(e.error), r();
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
function j(e) {
  if (b.has(e)) return;
  const t = new Promise((n, o) => {
    const r = () => {
        e.removeEventListener('complete', s),
          e.removeEventListener('error', i),
          e.removeEventListener('abort', i);
      },
      s = () => {
        n(), r();
      },
      i = () => {
        o(e.error || new DOMException('AbortError', 'AbortError')), r();
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
      if (t === 'objectStoreNames') return e.objectStoreNames || q.get(e);
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
function V(e) {
  D = e(D);
}
function O(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const o = e.call(g(this), t, ...n);
        return q.set(o, t.sort ? t.sort() : [t]), c(o);
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
    : (e instanceof IDBTransaction && j(e), x(e, P()) ? new Proxy(e, D) : e);
}
function c(e) {
  if (e instanceof IDBRequest) return N(e);
  if (y.has(e)) return y.get(e);
  const t = R(e);
  return t !== e && (y.set(e, t), v.set(t, e)), t;
}
const g = (e) => v.get(e);
function W(e, t, { blocked: n, upgrade: o, blocking: r, terminated: s } = {}) {
  const i = indexedDB.open(e, t),
    u = c(i);
  return (
    o &&
      i.addEventListener('upgradeneeded', (a) => {
        o(c(i.result), a.oldVersion, a.newVersion, c(i.transaction));
      }),
    n && i.addEventListener('blocked', () => n()),
    u
      .then((a) => {
        s && a.addEventListener('close', () => s()),
          r && a.addEventListener('versionchange', () => r());
      })
      .catch(() => {}),
    u
  );
}
function F(e, { blocked: t } = {}) {
  const n = indexedDB.deleteDatabase(e);
  return t && n.addEventListener('blocked', () => t()), c(n).then(() => {});
}
const _ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  $ = ['put', 'add', 'delete', 'clear'],
  w = new Map();
function C(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return;
  if (w.get(t)) return w.get(t);
  const n = t.replace(/FromIndex$/, ''),
    o = t !== n,
    r = $.includes(n);
  if (
    !(n in (o ? IDBIndex : IDBObjectStore).prototype) ||
    !(r || _.includes(n))
  )
    return;
  const s = async function (i, ...u) {
    const a = this.transaction(i, r ? 'readwrite' : 'readonly');
    let p = a.store;
    return (
      o && (p = p.index(u.shift())),
      (await Promise.all([p[n](...u), r && a.done]))[0]
    );
  };
  return w.set(t, s), s;
}
V((e) => ({
  ...e,
  get: (t, n, o) => C(t, n) || e.get(t, n, o),
  has: (t, n) => !!C(t, n) || e.has(t, n),
}));
const k = W('myDB', 1, {
  upgrade(e) {
    e.createObjectStore('comments');
  },
});
async function z(e, t) {
  return (await k).put('comments', e, t);
}
async function K(e) {
  return (await k).getAll('comments').then((t) => {
    if (t.length)
      for (let n = 0; n < t.length; n++) {
        const o = document.createElement('user-comment');
        o.setAttribute('name', t[n].usernameValue),
          o.setAttribute('email', t[n].emailValue),
          o.setAttribute('comment', t[n].commentValue),
          o.setAttribute('data', t[n].data),
          e.append(o);
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
      .register('./sw.js')
      .then((e) => console.log('Success: ', e.scope))
      .catch((e) => console.log('Failure: ', e));
  });
window.customElements.define('user-comment', A);
const Z = document.querySelector('.main_container'),
  U = document.querySelector('#form'),
  E = document.querySelector('#username'),
  m = document.querySelector('#email'),
  f = document.querySelector('#comment'),
  h = document.querySelector('#input-checkbox'),
  Y = document.querySelector('#clear_bnt'),
  d = (e, t) => {
    const n = e.parentElement,
      o = n.querySelector('.error');
    (o.innerText = t), n.classList.add('error'), n.classList.remove('success');
  },
  l = (e) => {
    const t = e.parentElement,
      n = t.querySelector('.error');
    (n.innerText = ''), t.classList.add('success'), t.classList.remove('error');
  },
  M = (e) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(e).toLowerCase()
    ),
  G = (e, t, n) => {
    e === '' ? d(E, 'Username is required') : l(E),
      t === ''
        ? d(m, 'Email is required')
        : M(t)
        ? l(m)
        : d(m, 'Provide a valid email address');
    const r = 30 - n.length;
    r === 30
      ? d(f, 'Comments is required')
      : r > 0
      ? d(f, `${r} more characters required`)
      : l(f),
      h.checked
        ? l(h)
        : d(h, "Can't proceed as you didn't agree to the terms!");
  };
U.addEventListener('submit', (e) => {
  e.preventDefault();
  const t = E.value.trim(),
    n = m.value.trim(),
    o = f.value.trim(),
    r = new Date().toString().slice(0, 15);
  !t || !n || !M(n) || o.length <= 30 || !h.checked
    ? G(t, n, o)
    : (z({ usernameValue: t, emailValue: n, commentValue: o, data: r }, n),
      window.location.reload());
});
Y.addEventListener('click', () => {
  H(), window.location.reload();
});
K(Z);
(async () => {
  const e = () => {
      const o = new Notification('Tesfaye Portfolio', {
        body: 'Click here to see my portfolio',
        icon: '/images/favicon.ico',
      });
      setTimeout(() => {
        o.close();
      }, 1e4),
        o.addEventListener('click', () => {
          window.open('https://tesfayeeshetie.com/', '_blank');
        });
    },
    t = () => {
      const o = document.querySelector('.error');
      (o.style.display = 'block'),
        (o.textContent = 'You blocked the notifications');
    };
  let n = !1;
  Notification.permission === 'granted'
    ? (n = !0)
    : Notification.permission !== 'denied' &&
      (n = (await Notification.requestPermission()) === 'granted'),
    n ? e() : t();
})();
