'use strict';

const { act } = require('react');

const diceImages = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];
const score0E0 = document.querySelector('#score--0');
const score1E1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerSection = document.querySelector('section');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

// starting condition
score0E0.textContent = 0;
score1E1.textContent = 0;
diceEl.classList.add('hidden');

// rolling dice
btnRoll.addEventListener('click', function () {
  // 1. Generating dice number
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  console.log(diceNumber);
  diceEl.src = diceImages[diceNumber - 1];
  diceEl.classList.remove('hidden');

  // 3. check if rolled isn't one
  if (diceNumber !== 1) {
    // currentScore = scores[activePlayer];
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    console.log(currentScore);
  } else {
    // switch to the next player
    document.getElementById(`score--${activePlayer}`).textContent =
      currentScore;
    scores[activePlayer] = currentScore;

    // reset
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = scores[activePlayer];

    console.log(`active player ${activePlayer}`);
  }
});
