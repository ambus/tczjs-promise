"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function fetchPromiseAll() {
    const fetchUsers = axios_1.default.get(`${config_1.CONFIG.host}/users`);
    // const fetchPrefs = axios.get(`${CONFIG.host}/prefs`);
    const fetchPrefs = Promise.reject(new Error('test'));
    await Promise.all([fetchUsers, fetchPrefs])
        .then((response) => response.map((r) => r.data))
        .then((values) => console.log(values))
        .catch((err) => console.error(err));
}
async function app() {
    await fetchPromiseAll();
}
app();
