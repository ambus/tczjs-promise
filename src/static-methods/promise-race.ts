function getWeatherRace(id: number) {
  const random = Math.floor(Math.random() * 1000);
  console.log(`${id} - Time ${random}`);
  return new Promise((resolve) => setTimeout(() => resolve({ id: id, name: 'Rainy', time: random }), random));
}

async function fetchPromiseRace() {
  const getWeather1 = getWeatherRace(1);
  const getWeather2 = getWeatherRace(2);
  const getWeather3 = getWeatherRace(3);

  await Promise.race([getWeather1, getWeather2, getWeather3])
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function appPromiseRace() {
  await fetchPromiseRace();
}

appPromiseRace();
