'use-strict'
/* 
// console.log(document.querySelector('.number-input').textContent);
document.querySelector('.result p').textContent = '😋 Correct Answer';
console.log(document.querySelector('.result p').textContent);

document.querySelector('.score').textContent = 20;

console.log(document.querySelector('.guessed-number').textContent = 19);

document.querySelector('.number-input').value = 44;

document.querySelector(.guessed-number).textContent = document.querySelector('.number-input').value;
*/

const secretNumber = Math.trunc((Math.random() *20));
// document.querySelector('.guessed-number').textContent = secretNumber;

let currentScore = 20;
let highscore = '0';

document.querySelector('.check').addEventListener(
  'click', function () {
    const userNumber = Number(document.querySelector('.number-input').value);


    if (!userNumber) {
      document.querySelector('.result p').textContent = '👹 Enter a number';

    } else if (userNumber === secretNumber) {
      document.querySelector('.guessed-number').textContent = secretNumber;

      document.querySelector('body').style.backgroundColor = "#60b347";
      document.querySelector('.guessed-number').style.width = '200px';
      document.querySelector('.result p').textContent = ' 😋 Correct Answer!';
      
      document.querySelector('.score').textContent = currentScore;
      
      document.querySelector('.win-score').textContent = currentScore > highscore ?  currentScore : highscore;



    } else if (userNumber > 20) {
      document.querySelector('.result p').textContent = '🙂‍↔️ Invalid number!. Number must not be greater than 20.';

    } else if (userNumber > secretNumber) {

      currentScore--
      document.querySelector('.score').textContent = currentScore > 0 ? currentScore : 0;
      document.querySelector('.result p').textContent = currentScore > 0 ? '❌Number too high!':  '🙂‍↔️ You lose the game!';

    }else {
      currentScore--;
      document.querySelector('.score').textContent =
        currentScore > 0 ? currentScore : 0;
      document.querySelector('.result p').textContent =
        currentScore > 0 ? '❌Number too low!' : '🙂‍↔️ You lose the game!';

    };
    console.log('clicked');

  }
);


document.querySelector('.again').addEventListener(
  'click', function () {
    

    document.querySelector('body').style.backgroundColor = 'rgb(0, 0, 0)';
    document.querySelector('.score').textContent = 20;
    document.querySelector('.win-score').textContent =  ;
    document.querySelector('.guessed-number').textContent = "?" ;
    document.querySelector('h1').style.width = "100px" ;



    // location.reload();
    // return false;
  }
);