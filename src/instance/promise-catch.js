"use strict";
const promiseCatch = new Promise((resolve, reject) => {
    throw new Error('Uh-oh!');
});
promiseCatch.catch((error) => {
    console.error(error);
});
//Ekwiwalent:
promiseCatch.then(undefined, (err) => {
    console.error(err);
});
