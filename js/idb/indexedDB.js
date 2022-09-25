import { openDB, deleteDB } from 'idb';

export const database = openDB('myDB', 1, {
  upgrade(db) {
    db.createObjectStore('comments');
  },
});

export async function postComments(comment, key) {
  return (await database).put('comments', comment, key);
}

export async function getComments(con) {
  return (await database).getAll('comments').then((res) => {
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        const user = document.createElement('user-comment');
        user.setAttribute('name', res[i].usernameValue);
        user.setAttribute('email', res[i].emailValue);
        user.setAttribute('comment', res[i].commentValue);
        user.setAttribute('data', res[i].data);

        con.append(user);
      }
    }
  });
}

export async function deleteMyDB() {
  await deleteDB('myDB', {
    blocked() {
      console.log('deletions is successful');
    },
  });
}
