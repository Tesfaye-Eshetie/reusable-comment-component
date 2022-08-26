import { openDB } from 'idb';

const database = openDB('myDB', 1, {
  upgrade(db) {
    db.createObjectStore('comments');
    db.createObjectStore('performance');
  },
});

export default database;
