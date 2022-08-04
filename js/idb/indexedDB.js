import { openDB } from 'idb';

export function createStore() {
  openDB('db1', 1, {
    upgrade(db) {
      db.createObjectStore('store', { autoIncrement: true });
    },
  });
}

export async function postComments(x, y, z) {
  const db = await openDB('db1', 1);
  db.add('store', { name: x, email: y, comment: z });
  db.close();
}

export async function getComments(con) {
  const db = await openDB('db1', 1);
  db.getAll('store').then((res) => {
    if (res.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < res.length; i++) {
        const user = document.createElement('user-comment');
        user.setAttribute('name', res[i].name);
        user.setAttribute('email', res[i].email);
        user.setAttribute('comment', res[i].comment);
        con.appendChild(user);
      }
    }
    console.log(res);
  });
  db.close();
}
