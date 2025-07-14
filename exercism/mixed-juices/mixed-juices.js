// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
function timeToMixJuice(name) {
  let min;
  switch (name) {
    case "Pure Strawberry Joy":
      min = 0.5;
      break;
    case "Energizer":
    case "Green Garden":
      min = 1.5;
      break;
    case "Tropical Island":
      min = 3;
      break;
    case "All or Nothing":
      min = 5;
      break;
    default:
      min = 2.5;
  }
  return min;
}

// console.log(timeToMixJuice("Green Garden"));
/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
function limesToCut(wedgesNeeded, limes) {
  let limeCount = 0;
  const wedgeType = {
    large:10,
    medium:8,
    small:6
  }

  for (let [i, type] of limes.entries()) {
    if (wedgesNeeded <= 0) {
      break;
    } else {
      ++limeCount;
      // console.log(wedgeType[type])
      wedgesNeeded -= wedgeType[type];
    };
  };
  return limeCount;
}
// console.log(limesToCut(10, ["medium", "small"]));
/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
function remainingOrders(timeLeft, orders) {
  do {
    timeLeft -= timeToMixJuice(orders.shift());
 } while(timeLeft > 0 && orders.length > 0)

  return orders;
}

console.log(
  remainingOrders(13, [
    "Pure Strawberry Joy",
    "Pure Strawberry Joy",
    "Vitality",
    "Tropical Island",
    "All or Nothing",
    "All or Nothing",
    "All or Nothing",
    "Green Garden",
    "Limetime",
  ])
);
