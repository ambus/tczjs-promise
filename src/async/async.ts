import axios from 'axios';
import { CONFIG } from '../config';

async function getUser(userName: string): Promise<{ id: string }> {
  const users = await axios.get(`${CONFIG.host}/users`);
  return users.data.find((user: { name: string }) => user.name === userName);
}

function getComments(userId: string) {
  return axios.get(`${CONFIG.host}/comments/${userId}`);
}

async function getUserComments(userId: string) {
  const user = await getUser(userId);
  const comments = await getComments(user.id);
  console.log(comments.data);
}

async function appAsync() {
  await getUserComments('Szymon');
}

appAsync();
