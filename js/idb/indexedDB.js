import { openDB, deleteDB } from 'idb';
import database from './database';
import { store } from './store';

export async function postComments(comment, key) {
  return (await database).put('comments', comment, key);
}

const createButtons = (con) => {
  const preference = document.createElement('div');
  preference.innerHTML = ` <button id="bntLike">Like</button>
  <button id="bntDislike">Dislike</button>
  `;
  con.append(performance);
};

export async function getComments(con) {
  return (await database).getAll('comments').then((res) => {
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        const user = document.createElement('user-comment');
        user.setAttribute('name', res[i].usernameValue);
        user.setAttribute('email', res[i].emailValue);
        user.setAttribute('comment', res[i].commentValue);

        const btn = document.createElement('button');
        btn.textContent = 'Like';
        btn.classList.add('like');
        btn.addEventListener('click', () => {
          store.increment();
        });

        con.append(user, btn);
        // createButtons(con);
      }
    }
    console.log(res);
  });
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
