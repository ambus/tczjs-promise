"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function getUser(userName) {
    const users = await axios_1.default.get(`${config_1.CONFIG.host}/users`);
    return users.data.find((user) => user.name === userName);
}
function getComments(userId) {
    return axios_1.default.get(`${config_1.CONFIG.host}/comments/${userId}`);
}
async function getUserComments(userId) {
    const user = await getUser(userId);
    const comments = await getComments(user.id);
    console.log(comments.data);
}
async function appAsync() {
    await getUserComments('Szymon');
}
appAsync();
