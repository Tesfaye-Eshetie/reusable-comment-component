import database from './database';

export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;

      const performance = await db.get('performance', 'like');

      if (performance) {
        this.set('like', performance);
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        // eslint-disable-next-line no-param-reassign
        state[key] = value;
        if (key !== 'like') {
          // eslint-disable-next-line no-param-reassign
          state.like = (state.like || 0) + 1;
        }

        // Check to see if the database exists, and if it does, put the current state into it. This will add it to our IndexedBD
        if (self.db) {
          await self.db.put('performance', value, key);

          if (key !== 'like') {
            await self.db.put('performance', state.performance, 'like');
          }
        }

        self.subscribers.forEach((subscriber) => subscriber(state));
        return true;
      },
    });
  }

  subscribe(cb) {
    if (typeof cb !== 'function') {
      throw new Error('You must subscribe with a function');
    }
    this.subscribers.push(cb);
    cb(this.state);
  }

  set(key, value) {
    this.state[key] = value;
  }

  get(key) {
    return this.state[key];
  }

  increment() {
    this.set('like', (this.get('like') || 0) + 1);
  }
}

// Export an initialized store for easy use across the project
export const store = new StoreSetup({ performance: 0 });
