'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className} ">
          <img class="country__img" src="${data.flags.png}"/>
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

/* 


const getCountryAndNeighbourData = function (country) {
  const link = `https://restcountries.com/v2/name/${country}`;
  const request = new XMLHttpRequest();
  request.open('GET', link);
  request.send();

  request.addEventListener('error', function () {
    alert("COuld not load country data")

  })

  request.addEventListener('load', function () {
    const [data1] = JSON.parse(this.responseText);
    console.log(data1);
    
    // render the main country
    renderCountry(data1);
    
    // render the neighbour
    const data2 = data1.?borders
    console.log(data2);

    if (!data2) return;

    for (let code of data2.slice(0, 1)) {
      const neighbourLink = `https://restcountries.com/v2/alpha/${code}`;
      const neighbourRequest = new XMLHttpRequest();
      neighbourRequest.open('GET', neighbourLink);
      neighbourRequest.send();

      neighbourRequest.addEventListener('load', function(){
        const neighbourCountry = JSON.parse(this.responseText);
        renderCountry(neighbourCountry, 'neighbour');
      })
    };



  });
};

getCountryAndNeighbourData('Egypt');
getCountryAndNeighbourData('Nigeria');



const getCountryData = function (country) {
  // for ordinary `GET` you don't need to include the HTTP method
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      // json() also return a promise
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};


// v1
const getCountryData = function (country) {
  // for ordinary `GET` you don't need to include the HTTP method
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country Not Found(${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const borderCountryCode = data[0]?.borders[0];
      if (!borderCountryCode) {
        throw new Error(`Neighbour Not Found(${response.status})`);
      }
      return fetch(`https://restcountries.com/v2/alpha/${borderCountryCode}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country Not Found(${response.status})`);
      }
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong. ${err.message}. Try again.`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getJSON = function (url, errMsg = 'Something Went Wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // for ordinary `GET` you don't need to include the HTTP method
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
    .then(data => {
      renderCountry(data[0]);
      const borderCountryCode = data[0]?.borders[0];
      if (!borderCountryCode) {
        throw new Error(`Neighbour Not Found(${response.status})`);
      }
      return getJSON(
        `https://restcountries.com/v2/alpha/${borderCountryCode}`,
        'Country Not Found'
      )
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong. ${err.message}. Try again.`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};



btn.addEventListener('click', function () {
  getCountryData('Canada');
});


// coding challenge

const getJSON = function (url, errMsg = 'Something Went Wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};


btn.addEventListener('click', function () {
  const locationError = () => {
    countriesContainer.style.opacity = 1;
    countriesContainer.insertAdjacentText(
      'beforeend',
      'Could not get your location'
    );
  };
  const locationSuccess = position => {
    // const { latitude: lat, longitude: lng } = position.coords;
    const [lat, lng] = [0.0, -97.0];
  
    // first approach
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    getJSON(url, 'Problem with reverse geocoding')
      .then(data => {
        console.log(`You are in ${data.city}, ${data.countryName}`)
        console.log(data)
        const code = data.countryCode;
        return getJSON(
          `https://restcountries.com/v2/alpha/${code}`,
          'country not found'
        );
      })
      .then(data => {
        console.log(data);
        renderCountry(data);
        //
      })
      .catch(err =>
        renderError(`Something went wrong ${err.massage}. Try again!`)
      )
      .finally(() => (countriesContainer.style.opacity = 1));

    // console.log(`https://restcountries.com/v2/name/kenya`);
    // console.log(position);
  };

  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
});


// prove Fetch api has more priority than other WEBAPI
console.log('Test Start')
setTimeout(()=> console.log('0 second timer'),0)
Promise.resolve('promise 1').then(data=> console.log(data))
Promise.resolve('promise 2').then(data=> {
  for(let i=0; i< 1000000000000000;i++){}
  console.log(data)})
console.log('Test end')


// it takes the executor function
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('You Win 😋');
    } else {
      reject(new Error('You lose❌'));
    }
  }, 2000);
});


lotteryPromise
  .then(response => console.log(response))
  .catch(err => console.error(err));


// promise.resolve() or promise.reject() are used to return value immediately
// let wrap asynchronous behaviour to be promise based
// here the wait function will cause a delay of the seconds passed.
// it doesn't require nothing to be passed to the resolve because we just want to cause delay

const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};

// to chain promise , the second promise must be return of the first resolve
wait(1)
  .then(() => {
    console.log('i wait 1 second');
    return wait(2);
  })
  .then(() => console.log('i wait 2 second'));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      () => reject(new Error('Could not get location'))
    );
  });
};

getPosition()
  .then(pos => console.log(pos))
  .catch(err => console.error(err.message));

// coding challenge 2
const imageContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error("Couldn't load image"));
    });
  });
};

// wait(2)
//   .then(() => {
//     return createImage('IMG_1.jpg');
//   })
//   .then(res => {
//     console.log(res);
//     return wait(2);
//   })
//   .then(() => {
//     return createImage('IMG_2.jpg');
//   })
//   .then(res => console.log(res));

let currentImage;

createImage('IMG_1.jpg')
  .then(res => {
    currentImage = res;
    console.log(`load img 1`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display= 'none';
    console.log(`wait for 2 secs`);
    return createImage('IMG_2.jpg');
  })
  .then(res => {
    console.log(`load img 2`);
    currentImage = res;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    console.log(`wait for 2 secs`);
    return createImage('IMG_3.jpg');
  })
  .then(res => {
    console.log(`load img 3`);
    currentImage = res;
    return wait(2);
  }).then(()=>{
    currentImage.style.display = 'none';
    console.log(`hide all`);
  })
  .catch(err => console.error(err));

// createImage('IMG_2.jpg').then(res=> console.log(res))
// createImage('IMG_3.jpg').then(res => console.log(res));


// Async // await: they are syntatic sugar over the promise .then and it allows us to run code the wait for each other to execute before go forward

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      () => reject(new Error('Could not get location'))
    );
  });
};

const whereAmI = async function () {
  try {
    // get lat from navigator.geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // get country
    const url1 = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    const getRevCountryData = await fetch(url1);
    if (!getRevCountryData.ok) {
      throw new Error(`Coordinate not fetched ${getRevCountryData.status}`);
    }
    const revCountryJSONData = await getRevCountryData.json();

    const getCountryData = await fetch(
      `https://restcountries.com/v2/alpha/${revCountryJSONData.countryCode}`
    );
    if (!getCountryData.ok) {
      throw new Error(`Country not found ${getCountryData.status}`);
    }
    const countryJSONData = await getCountryData.json();
    renderCountry(countryJSONData[0]);
    return `You are in You are in ${getRevCountryData.city}, ${getRevCountryData.countryName} `;
  } catch (err) {
    console.error(`${err}❌`);
    renderError(`${err.message} ❌`);
    countriesContainer.style.opacity = 1;

    throw err;
  }
};

// whereAmI()
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.error(`${err.message}`))
//   .finally(() => console.log('Finished getting location'));
// console.log('using async /await');
// when using async await with try catch block we should throw errors and include
// return value when needed. it not good to mix feature like this (having then and catch when using async await)
// so we use IIFE: immediately Invoked function expression

(async function () {
  try {
    const city = await whereAmI();
    console.log(`1: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Everything now use async /await');
})();
console.log(
  'using async /await with IIFE to handle async resolve and rejection'
);



const getJSON = function (url, errMsg = 'Something Went Wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};

// promise combinators : .all,race, .all settled
// running promises in parallel
const get3CountriesAll = async function (c1, c2, c3) {
  try {
    const states = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(states);
    const data = states.map(state => {
      // console.log(state);
      return state[0].capital;
    });
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};
// get3CountriesAll('nigeria','canada','usa');

// promise.race : takes an array of promise and return the first settles promise(resolve or reject).
// the first promise to get settles gets returned either resolved or rejected
// const get3CountriesRace = async function (c1, c2, c3) {
//   try {
//     const [state] = await Promise.race([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     console.log(state.capital);
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3CountriesRace('nigeria', 'canada', 'usa');

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error(`Timeout `)), sec * 1000);
  });
};

// using IIFE
// (async function () {
//   try {
//     const state = await Promise.race([
//       getJSON(`https://restcountries.com/v2/name/nigeria`),
//       timeout(0.12),
//       getJSON(`https://restcountries.com/v2/name/usa`),
//     ]);
//     console.log(state);
//   } catch (err) {
//     console.error(err);
//   }
// })();

Promise.race([
  getJSON(`https://restcountries.com/v2/name/nigeria`),
  timeout(0.2),
  getJSON(`https://restcountries.com/v2/name/usa`),
])
  .then(res => console.log(`Race: ${res}`))
  .catch(err => console.error(`Race: ${err}`));

// promise.allSettled: return array of all settled array
Promise.allSettled([
  Promise.resolve('Settled'),
  Promise.reject('error'),
  Promise.resolve('Settled'),
]).then(res => console.log(res));

// error if any fail
Promise.all([
  Promise.resolve('Settled'),
  Promise.reject('error'),
  Promise.resolve('Another Settled'),
])
  .then(res => console.log(`all: ${res}`))
  .catch(err => console.error(`all: ${err}`));
*/
// show first settled
Promise.any([
  Promise.resolve('Settled'),
  Promise.reject('error'),
  Promise.resolve('Another Settled'),
])
  .then(res => console.log(`any: ${res}`))
  .catch(err => console.error(`any: ${err}`));



const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imageContainer = document.querySelector('.images');
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('load', function () {
      reject(new Error(`Couldn't load image`));
    });
  });
};

const images = ['IMG_1.jpg', 'IMG_2.jpg', 'IMG_3.jpg'];

const loadNPause = async function (images) {
  try {
    for (let image of images) {
      const img = await createImage(image);
      await wait(2);
      img.style.display = 'none';
    }
  } catch (err) {
    console.error(err);
  }
};

loadNPause(images);


const loadAll = async function(images){
  try{
    const promises = images.map(img=>createImage(img)) // return list of promise
    // to get the value of the promise
    // console.log(await Promise.race(promises));
    const imgsEl = await Promise.all(promises);
    imgsEl.forEach(img=> img.classList.add('parallel'))
  }catch (err){
    console.log(err)
  }
}

// loadAll(images)