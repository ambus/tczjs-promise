function checkSomething() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Something with success');
    } else {
      reject(new Error('Failed do something'));
    }
  });
}

let loading = true;
checkSomething()
  .then((somethinsResponse) => {
    console.log(somethinsResponse);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
    loading = false;
  });
