
const STORAGE_KEY = 'EXTENSION_FACEBOOK_APP';

export function setItem(key, val) {
  let store;

  if(key === STORAGE_KEY) {
    store = val;
  } else {
    store = getItem(STORAGE_KEY) || {};
    store[key] = val;
  }

  store = JSON.stringify(store);

  // try {
  //   chrome.storage.sync.set(STORAGE_KEY, store);
  // } catch(err) {
  //   localStorage.setItem(STORAGE_KEY, store);
  // }
  localStorage.setItem(STORAGE_KEY, store);
}

export function getItem(key) {
  let store;

  // try {
  //   store = chrome.storage.sync.get(STORAGE_KEY);
  // } catch(err) {
  //   store = localStorage.getItem(STORAGE_KEY);
  // }
  store = localStorage.getItem(STORAGE_KEY);

  store = JSON.parse(store) || {};

  return key === STORAGE_KEY ? store : store[key];
}

export function removeItem(key) {
  if(key === STORAGE_KEY) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    let store = getItem(STORAGE_KEY);
  
    if(store && store.hasOwnProperty(key)) {
      delete store[key];
  
      setItem(STORAGE_KEY, store);
    }
  }
}

export function clearAll() {
  removeItem(STORAGE_KEY);
}