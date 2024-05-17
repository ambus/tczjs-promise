"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
function getWeatherAllSettled(id) {
    return axios_1.default.get(`${config_1.CONFIG.host}/weather/${id}`).then((res) => res.data);
}
async function fetchPromiseAllSettled() {
    const getWeather1 = getWeatherAllSettled(1);
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
