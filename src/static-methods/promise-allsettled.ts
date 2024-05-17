import axios from 'axios';
import { CONFIG } from '../config';

function getWeatherAllSettled(id: number) {
  return axios.get(`${CONFIG.host}/weather/${id}`).then((res) => res.data);
}

async function fetchPromiseAllSettled() {
  const getWeather1 = await getWeatherAllSettled(1);
  const getWeather2 = getWeatherAllSettled(2);
  const getWeather3 = getWeatherAllSettled(3);
  const getWeather4 = Promise.reject(0);

  await Promise.allSettled([getWeather1, getWeather2, getWeather3, getWeather4])
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function appPromiseAllSettled() {
  await fetchPromiseAllSettled();
}

appPromiseAllSettled();
