'use strict';

const diceImages = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
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
let playing = true;

// starting condition
score0E0.textContent = 0;
score1E1.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // reset
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // toggle include the class if it doen't exist and vice versa
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating dice number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    console.log(diceNumber);
    diceEl.src = diceImages[diceNumber - 1];
    diceEl.classList.remove('hidden');

    // 3. check if rolled isn't one
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player and you loosse your accumulated score
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.toggle('hidden');
      // document.querySelector(`.player--${activePlayer}`).classList.add('hidden');
    }

    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  window.location.reload();
  return false;
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'p') {
    window.location.reload();
  }
});
