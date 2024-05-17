"use strict";
Promise.resolve('success').then((successMessage) => {
    console.log(successMessage);
}, (error) => {
    console.error(error);
});
