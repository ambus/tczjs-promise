"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
function getUser() {
    return axios_1.default.get(`${config_1.CONFIG.host}/users`);
}
function getComments(userId) {
    return axios_1.default.get(`${config_1.CONFIG.host}/comments/${userId}`);
}
async function getUserComments(userName) {
    const comments = await getUser()
        .then((response) => response.data)
        .then((users) => users.find((user) => user.name === userName))
        .then((user) => {
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
