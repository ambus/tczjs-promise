Promise.reject(new Error('fail')).then(
  (success) => {
    console.log('Success');
  },
  (error) => {
    console.error(error);
  }
);
