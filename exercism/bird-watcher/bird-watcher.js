// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */

const birdsPerDay = [2, 5, 0, 7, 4, 1, 3, 0, 2, 5, 0, 1, 3, 1];

function totalBirdCount(birdsPerDay) {
  let sum = 0;
  for (let i = 0; i < birdsPerDay.length; i++) {
    sum += birdsPerDay[i];
  }
  return sum;
}
// console.log(totalBirdCount(birdsPerDay))

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
function birdsInWeek(birdsPerDay, week) {
  let sum = 0;
  for (let day = 7*(week -1) , end = 7 * week; day < end; day++) {
    sum += birdsPerDay[day];
  }
  return sum;
}
// console.log(birdsInWeek(birdsPerDay, 1));

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {void} should not return anything
 */
function fixBirdCountLog(birdsPerDay) {
  const correctCount = [];

  for (let i = 0; i < birdsPerDay.length; i +=2) {
    ++birdsPerDay[i]
  }
  return birdsPerDay;
}
console.log(fixBirdCountLog([2, 5, 0, 7, 4, 1]));
