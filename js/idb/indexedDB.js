import { openDB, deleteDB } from 'idb';
import database from './database';

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

        con.append(user);
      }
    }
    console.log(res);
  });
}

export async function deleteMyDB() {
  await deleteDB('myDB', {
    blocked() {
      console.log('deletions is successful');
    },
  });
}
