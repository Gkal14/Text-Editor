import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to indexedDb
export const putDb = async (content) => {
  console.log("Put to Database");
  const contentDb = await openDB('jate', 1);
	const tx = contentDb.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	const request = store.put({ id: 1, value: content });
	const result = await request;
	console.log("Saved to Db", result);
};

// Retrieve text from indexedDb
export const getDb = async () => {
  console.log("Get to Db")
  const contentDb = await openDB('jate', 1);
	const tx = contentDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');
	const request = store.get(1);
	const result = await request;
	return result?.value;
};

initdb();
