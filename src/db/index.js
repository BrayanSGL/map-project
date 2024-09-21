export class Database {
  constructor(dbName, storeName, keyPath = "id") {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.keyPath = keyPath;
  }

  async open(version = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, version);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onerror = (error) => {
        reject(error);
      };
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.db.createObjectStore(this.storeName, {
          keyPath: this.keyPath,
          autoIncrement: true,
        });
      };
    });
  }

  async insert(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(data, id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error) => {
        reject(error);
      };
    });
  }
}
