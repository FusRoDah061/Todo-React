import { openDB } from 'idb';
import { TASKS_MOCK } from '../scripts/mockData';

const DATABASE_NAME = 'TODO_REACT';
const DATABASE_VERSION = 1;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, 
  {
    upgrade(db, oldVersion, newVersion, transaction) {
      switch(newVersion) {
        case 1:
          db.createObjectStore('Tasks', { keyPath: 'id' });
          
          const tx = transaction.objectStore('Tasks', 'readwrite');
          tx.createIndex('id', 'id', { unique: true });
          tx.createIndex('description', 'description', { unique: false });
          tx.createIndex('subtasks', 'subtasks', { unique: false });
          tx.createIndex('status', 'status', { unique: false });

          for(let task of TASKS_MOCK) {
            tx.put(task);
          }
      }
    }
  });

export default class IndexedDbEngine {

  constructor(scope, defaultErrorHandler) {
    this.scope = scope;
    this.errorHandler = defaultErrorHandler;
  }

  withScope(scope) {
    this.scope = scope;
    return this;
  }

  withErrorHandler(errorHandler) {
    this.errorHandler = errorHandler;
    return this;
  }

  get(key) {
    return this._run(db => {
      return db
        .transaction(this.scope, 'readwrite')
        .objectStore(this.scope)
        .get(key);
    });
  }

  getAll(indexName, indexValues = null) {
    return this._run(db => {
      if(indexValues) {
        return db
          .transaction(this.scope, 'readwrite')
          .objectStore(this.scope)
          .index(indexName)
          .getAll(indexValues);
      }
      
      return db
        .transaction(this.scope, 'readwrite')
        .objectStore(this.scope)
        .index(indexName)
        .getAll();
    });
  }

  put(object, key = null) {
    if(key)
      return this._run(db => {
        return db
          .transaction(this.scope, 'readwrite')
          .objectStore(this.scope)
          .put(object, key);
      });
    else
      return this._run(db => {
        return db
          .transaction(this.scope, 'readwrite')
          .objectStore(this.scope)
          .put(object);
      });
  }

  delete(key) {
    return this._run(db => {
      return db
        .transaction(this.scope, 'readwrite')
        .objectStore(this.scope)
        .delete(key);
    });
  }

  deleteAll() {
    return this._run(db => {
      return db
        .transaction(this.scope, 'readwrite')
        .objectStore(this.scope)
        .clear();
    });
  }

  _run(command) {
     return dbPromise.then(command);
  }
}