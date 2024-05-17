import axios from 'axios';
import { CONFIG } from '../config';

async function fetchPromiseAll() {
  const fetchUsers = axios.get(`${CONFIG.host}/users`);
  const fetchPrefs = axios.get(`${CONFIG.host}/prefs`);
  // const fetchPrefs = Promise.reject(new Error('test'));

  await Promise.all([fetchUsers, fetchPrefs])
    .then((response) => response.map((r) => r.data))
    .then((values) => console.log(values))
    .catch((err) => console.error(err));
}

async function app() {
  await fetchPromiseAll();
}

app();
