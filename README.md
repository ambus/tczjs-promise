## Agenda

1. Czym jest Promise w JS?
2. ... czy wcześniej było coś?
3. Metody statyczne w klasie Promise
4. Metody na obiekcie Promise
5. async/await
6. Promise chaining

## Zaproszenie

Pracując w ****\*\***** mam okazję uczestniczyć w wielu rozmowach rekrutacyjnych po drugiej stronie stołu - pozycji pytającego. Jednym z moich ulubionych pytań na rozgrzewkę jest - "Czym jest Promise w JS?".... i powiem Ci że bardzo często kandydaci nie znają odpowiedzi :0. A czy Ty wiesz czym jest Promise w JS?

# Prezentacja

## Wstęp

## 1. Czym jest Promise?

Promise to zapewnienie lub gwarancja, że coś wydarzy się w przyszłości.
Odbiegając od JS, obietnicę może złożyć osoba innej osobie. Nie musi to być także jedna osoba, może to być np. organizacja, rząd.

Z obietnicą wiążą się dwa możliwe wyniki - spełnienie albo porażka.

W dokumentacji mamy:
===A Promise is an object that is used as a placeholder for the eventual results of a deferred (and possibly asynchronous) computation.===

Promise jest obiektem który jest używany jako placeholder dla ewentulanego resultatu z odroczonego obliczenia (prawdopodobnie asynchronicznego)

W JavaScripcie, Promise jest obiektem który w pewnym momencie, w przyszłości, wygeneruje pojedyncza wartość. Jeśli obietnica się powiedzie, wygeneruje ustaloną wartość, a jeśli coś pójdzie nie tak, zwróci nam powód dla którego obietnica się nie powiodła. Może on występować w trzech różnych stanach:

- _pending_: Jest to domyślny stan zdefiniowanej obietnicy.
- _fulfilled_:  To jest stan udanej obietnicy (foufild)
- _rejected_: To jest stan nieudanej obietnicy

Obietnica przechodzi ze stanu _pending_ do _fulfilled_ lub z _pending_ do _rejected_ —„_pending_” i „_rejected_” oznaczają koniec obietnicy.

Przykład z zamawianiem Hamburgera w Macu

## 2. ... czy wcześniej coś było?

Promise pojawiły się w JavaScript wraz z wydaniem ECMAScript 6 (ES6) w 2015 roku

### Callback

Jest funkcją którą przekazano jako argument do innej funkcji i która zostanie wywołana z jej wnętrza, aby zasygnalizować ukończenia jakiegoś działania, np. nadejście odpowiedzi z REST API za pomocą `fetch()`

Przykład:

```JavaScript
function helloCallback(name) {
  console.log(`Hello ${name}`);
}

function nameIsInvalidCallback() {
  console.log('Name cannot be empty.');
}

function sayHello(callback, errorCallback) {
  const name = prompt('Enter you name.');
  if(!name) {
    errorCallback();
  } else {
    callback(name);
  }
}

sayHello(helloCallback, nameIsInvalidCallback);
```

https://jsfiddle.net/00_zapora_butik/uk27egd1/1/

### Callback Hell

Jest jednym z antywzorców. Występuje w kodzie w którym przeplata się wiele zagnieżdżonych callbacków co czyni kod trudnym do czytania i utrzymywania.

```JavaScript
function findUserComment(username, callback) {
  fetchUserData(username, user => {
    fetchUserMessages(user.userId, messages => {
      messages.forEach(message => {
        getMessageContent(message.uuid, messageContent => {
          callback(messageContent);
        })
      })
    })
  })
}
```

https://jsfiddle.net/00_zapora_butik/pquwb1ro/4/

## 3. Metody na obiekcie Promise

### Promise.prototype.then()

Metoda `then()` na instancji obiektu Promise, przyjmuje dwa argumenty, callbacki z funkcjmi dla przypadków gdy akcja asynchoniczna się powiedzie lub zostanie odrzucona fulfilled

```typescript
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.error(error);
  }
);
```

### Promise.prototype.catch()

Metoda `catch()` na instancji obiektu Promise, przyjmuje funkcję callback która jest wywoływana gdy promise jest odrzucony. Od razu zwraca Promisa, dzięki czemu możemy zastosować Promise chaining

```typescript
const promise1 = new Promise((resolve, reject) => {
  throw new Error('Uh-oh!');
});

promise1.catch((error) => {
  console.error(error);
});

//Ekwiwalent:

Promise.resolve().then(undefined, (err) => {
  console.error(err);
});
```

### Promise.prototype.finally()

Methoda `finally()` na instancji obiektu Promise, kolejkuje funkcję która zostanie wywołana po spełnieniu lub odrzuceniu promisa. Natychmiast zwraca równoważny obiekt Promise, umożliwiający łączenie wywołać - Promise Chaning

```typescript
function checkSomething() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Something with success');
    } else {
      reject(new Error('Failed do something'));
    }
  });
}

checkSomething()
  .then((somethinsResponse) => {
    console.log(somethinsResponse);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
```

## 4. Metody statyczne w klasie Promise

### Promise.reject()

`Promise.reject()` zwraca obiekt Promise który jest rejectowany z podanym powodem

```typescript
Promise.reject(new Error('fail')).then(
  (success) => {
    console.log('Success');
  },
  (error) => {
    console.error(error);
  }
);
```

### Promise.resolve()

`Promise.resolve()` podobnie jak reject, zwraca obiekt Promise który jest rozwiązany z podaną wartością.

```typescript
Promise.resolve('success').then(
  (successMessage) => {
    console.log(successMessage);
  },
  (error) => {
    console.error(error);
  }
);
```

### Promise.withResolvers()

`Promise.withResolvers()` zwraca obiekt który zawiera Promise oraz dwie funkcje `resolve` i `reject`.

Od marca 2023 jest już wspierane przez wszystkie główne przeglądarki oraz Node w wersji 22

```typescript
let { promise, resolve, reject } = Promise.withResolvers();

//Ekwiwalent takiego zapisu:
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});
```

### Promise.all()

`Promise.all()` służy do łączenia wielu powiązanych operacji asynchronicznych w jedną. Jako parametr przyjmuje tablicę `Promise` i zwraca tablicę wyników ale dopiero gdy wszystkie Promise się zakończą.
Jeśli którykolwiek z Promisów zostanie odrzucony - to `Promise.all()` także zostanie odrzucony.

```typescript
const fetchUsers = axios.get(`${CONFIG.host}/users`);
const fetchPrefs = axios.get(`${CONFIG.host}/prefs`);

await Promise.all([fetchUsers, fetchPrefs])
  .then((response) => response.map((r) => r.data))
  .then((values) => console.log(values))
  .catch((err) => console.error(err));
```

### Promise.race()

`Promise.race()` zwraca pojedynczy Promise, ten który został wykonany najszybciej.
\_

Np. Chcemy użytkownikowi pokazać pogodę jak najszybciej, odpytujemy różne api z pogodami, ale interesuje nas tylko pierwszy response. Czyli ten który odpowiedział najszybciej.

```typescript
function getWeather(id: number) {
  const random = Math.floor(Math.random() * 1000);
  console.log(`${id} - Time ${random}`);
  return new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: 'Rainy', time: random }), random));
}

async function fetchPromiseAll() {
  const getWeather1 = getWeather(1);
  const getWeather2 = getWeather(2);
  const getWeather3 = getWeather(3);

  await Promise.race([getWeather1, getWeather2, getWeather3])
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
```

### Promise.any()

`Promise.any()` zwraca pojedynczy Promise, ten który został wykonany najszybciej ale w odróżnieniu od `Promise.race()` nie rejectuje od razy gdy tylko jakikolwiek z promisów stanie się _rejected_
Reject następuje jedynie gdy wszystkie z promisów zostaną odrzucone

```typescript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

await Promise.any([promise1, promise2, promise3])
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

### Promise.allSettled()

oull setould - wszystko załatwione

`Promise.allSettled()` przyjmuje jako argument tablicę promisów i zwraca jeden pojedyńczy Promise. Zwrócony promise fulfills dopiero wtedy gdy wszystkie przekazane w inpucie promisy się zakończą - sukcesem lub nie.

```typescript
function getWeatherAllSettled(id: number) {
  return axios.get(`${CONFIG.host}/weather/${id}`).then((res) => res.data);
}

async function fetchPromiseAllSettled() {
  const getWeather1 = getWeatherAllSettled(1);
  const getWeather2 = getWeatherAllSettled(2);
  const getWeather3 = getWeatherAllSettled(3);
  const getWeather4 = Promise.reject(0);

  await Promise.allSettled([getWeather1, getWeather2, getWeather3, getWeather4])
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
```

## 5. async/await

`async/await` jest to _lukier składniowy_ który pozwala nam zapisać w prostrzy sposób funkcje asynchroniczne. Opiera się on o Promise. Dzięki temu rozwiązaniu nasz kod asynchroniczny może wyglądać jak kod synchroniczny.

Słowo kluczowe `async` przed deklaracją funkcji sprawia, że będzie ona domyślnie zwracała `Promise`.
`await` może występować jedynie wewnątrz funkcji `async`.

```typescript
async function getUser(userName: string): Promise<{ id: string }> {
  const users = await axios.get(`${CONFIG.host}/users`);
  return users.data.find((user: { name: string }) => user.name === userName);
}

function getComments(userId: string) {
  return axios.get(`${CONFIG.host}/comments/${userId}`);
}

async function getUserComments(userId: string) {
  const user = await getUser(userId);
  const comments = await getComments(user.id);
  console.log(comments.data);
}
```

https://www.youtube.com/shorts/pkAPVl6y_GQ - async/await jest wspierany przez Angulara

## 6. Promise chaining

Promise chaining polega na łączeniu i wykonywaniu sekwencji operacji asynchronicznych jedna po drugiej. Jest to alternatywa dla kodu opartego na callbackach.

Chaining opera się na tym, że funkcja `then()` zwraca nowy Promise, który reprezentuje wynik operacji. Najlepiej obrazuje to przykład:

```typescript
fetch('./myapi/getUser)
  .then(response => respone.json())
  .then((user: User) => fetch(`./myapi/usercomments/${user.id}`))
  .then(response => respone.json())
  .then((comments: Comment[]) => console.log(comments))
  .catch(err => console.error(err));
```

Jak widzicie, Promisy nie są zbyt skomplikowane. Dobry programista JS na pewno musi umieć odpowiedzieć czym jest promise tj. .....

Czekam na wasze pytania i obiecuje że postaram się na nie odpowiedzieć tutaj na antenie lub w późniejszym czasie
