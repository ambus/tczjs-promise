let { promise, resolve, reject } = Promise.withResolvers();

let resolve2, reject2;
const promise2 = new Promise((res, rej) => {
  resolve2 = res;
  reject2 = rej;
});
