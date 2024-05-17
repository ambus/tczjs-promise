import axios from 'axios';
import { CONFIG } from '../config';

type UserChaningT = { id: string; name: string };

function getUser() {
  return axios.get<UserChaningT[]>(`${CONFIG.host}/users`);
}

function getComments(userId: string) {
  return axios.get(`${CONFIG.host}/comments/${userId}`);
}

async function getUserComments(userName: string) {
  const comments = await getUser()
    .then((response) => response.data)
    .then((users: UserChaningT[]) => users.find((user) => user.name === userName))
    .then((user: UserChaningT | undefined) => {
      if (user) {
        return getComments(user.id);
      }
      return undefined;
    })
    .then((response) => response?.data)
    .then((comments) => console.log(comments))
    .catch((err) => console.error(err));

  return comments;
}

async function appAsync() {
  await getUserComments('Szymon');
}

appAsync();
