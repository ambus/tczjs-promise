"use strict";
const promise1 = new Promise((resolve, reject) => {
    resolve('Success!');
});
promise1.then((value) => {
    console.log(value);
}, (error) => {
    console.error(error);
});
