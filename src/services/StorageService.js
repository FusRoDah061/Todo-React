import IndexedDbEngine from './IndexedDbEngine';
import LocalStorageEngine from './LocalStorageEngine';

export default class StorageService {
  constructor(scope, erroHandler = null) {
    if(window.indexedDB) 
      this.storageEngine = new IndexedDbEngine(scope, erroHandler);
    /*else 
      this.storageEngine = new LocalStorageEngine();*/
  }

  get(key) {
    return this.storageEngine.get(key);
  }

  getAll(property, values = null) {
    return this.storageEngine.getAll(property, values);
  }

  put(object, key = null) {
    return this.storageEngine.put(object, key);
  }

  delete(key) {
    return this.storageEngine.delete(key);
  }

  deleteAll() {
    return this.storageEngine.deleteAll();
  }
  
}
