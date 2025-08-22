'use strict';
/* 
const nice = 23;
if (nice === 23) console.log(nice);

// console.log(Math.round(Math.random() * 45) + 1)
// get the amplitude given an array of temparature


const temps = [3, -4, 'error', 9, 13, 9, 5, 17, 15];

const tempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    debugger;
    if (typeof curTemp != 'number') continue;
    if (curTemp > max) {
      max = curTemp;
    }
    if (curTemp < min) {
      min = curTemp;
    }
  }
  return `The min value ${min}, ${max}, amplitude ${max - min}`;
};

console.log(tempAmplitude(temps));
*/
// debug your code using debugger; keyword or the source from the web browser

const tempForecast = function (temp){
  let daysTemp = ''

  for (let i =0 ; i < temp.length; i++) {
    daysTemp = daysTemp + '...' + `${temp[i]}C in ${i+1} days `;
  };
  return daysTemp;
}

console.log(tempForecast([1,23,4]))