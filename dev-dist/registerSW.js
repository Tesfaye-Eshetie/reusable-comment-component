if ('serviceWorker' in navigator)
<<<<<<< HEAD
  navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/' });
=======
  navigator.serviceWorker.register(
    '/reusable-comment-component/dev-sw.js?dev-sw',
    { scope: '/reusable-comment-component/' }
  );
>>>>>>> 55cdea4a3e9250ef338dc32271f4c39df2ba3ecb
