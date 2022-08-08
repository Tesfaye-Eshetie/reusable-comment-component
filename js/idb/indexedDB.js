import { openDB, deleteDB } from 'idb';

export function createStore() {
  openDB('myDB', 1, {
    upgrade(db) {
      db.createObjectStore('store', { autoIncrement: true });
    },
  });
}

export async function postComments(x, y, z) {
  const db = await openDB('myDB', 1);
  db.add('store', { name: x, email: y, comment: z });
  db.close();
}

export async function getComments(con) {
  const db = await openDB('myDB', 1);
  db.getAll('store').then((res) => {
    if (res.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < res.length; i++) {
        const user = document.createElement('user-comment');
        user.setAttribute('name', res[i].name);
        user.setAttribute('email', res[i].email);
        user.setAttribute('comment', res[i].comment);

        con.append(user);
      }
    }
    console.log(res);
  });
  db.close();
}

export async function clearComments() {
  const db = await openDB('myDB', 1);
  db.clear('store');
  db.close();
}
export async function deleteMyDB() {
  await deleteDB('myDB', {
    blocked() {
      console.log('deletions is successful');
    },
  });
}
