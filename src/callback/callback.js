"use strict";
function helloCallback(name) {
    console.log(`Hello ${name}`);
}
function nameIsInvalidCallback() {
    console.log('Name cannot be empty.');
}
function sayHello(callback, errorCallback) {
    const name = prompt('Enter you name.');
    if (!name) {
        errorCallback();
    }
    else {
        callback(name);
    }
}
sayHello(helloCallback, nameIsInvalidCallback);
// https://jsfiddle.net/00_zapora_butik/uk27egd1/1/
