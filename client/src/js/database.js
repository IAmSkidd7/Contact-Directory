// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB('contactDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts database already exists');
        return;
      }
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true})
      console.log('contactDB database created');
    },
  })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
 console.log('post to database');
 const contactsDb = await openDB('contactDB', 1);
 const tx = contactsDb.transaction('contacts', 'readwrite');
 const store = tx.objectStore('contacts');
 const request = store.add({ contact: name, home, cell, email});
 const result = await request;
 console.log('data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log('GET all from the database');
  const contactsDb = await openDB('contacts', 1);
  const tx = contactsDb.transaction('contacts', 'readonly');
  const store = tx.objectStore('conacts');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};


// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const contactsDb = await openDB('contacts', 1);
  const tx = contactsDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
