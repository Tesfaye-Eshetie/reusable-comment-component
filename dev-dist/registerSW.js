if ('serviceWorker' in navigator)
  navigator.serviceWorker.register(
    '/reusable-comment-component/dev-sw.js?dev-sw',
    { scope: '/reusable-comment-component/' }
  );
