const odds = {
  team1: 1.33,
  x: 3.25,
  team2: 6.5,
};

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [ 'Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski',
    ],
    [ 'Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  // es6 ways of object literals
  odds,
};

const [player1, player2] = game.players;
const [gk1, ...fieldPlayers1] = player1;
const [gk2, ...fieldPlayers2] = player2;

// console.log(gk, fieldPlayers);

const allPlayers = [...player1, ...player2];
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...player1];
// console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
// const {odd:{team1, x:draw, team2}} = game;

game.printGoals = function (...players) {
  return `${players.length} goal were scored`;
};

// console.log(game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich'));
// console.log(game.printGoals(...game.scored));

// allPlayers.forEach(element => console.log(element));
 
game.won = function (teamA, teamB) {
  teamA < teamB && console.log(`${teamA} is likely to win`);
  teamA > teamB && console.log(`${teamB} is likely to win`);
};

// game.won(team1, team2);

// for-of each . When we need only the item we use item , if we need index access .entries()\
// for (const item of allPlayers) console.log(` first example ${item}`);

// for (const [i, el] of allPlayers.entries())  console.log(` second example ${i +1}: ${el}`);

// console.log(game);

const scorers = game.scored;

// challenge 2: 1
for (const [i, el] of scorers.entries()){
  console.log(`Goal ${i + 1}: ${el}`);
}

// :2
const arrOdds =  Object.entries(odds);
// console.log(arrOdds.length);  

let avg = 0;
for (const [club, number] of arrOdds){
  avg +=number
}
// console.log(avg /= arrOdds.length);



// :3
for (const [club, number] of arrOdds){
  // console.log((game?.[club] && `odd of victory ${game[club]} ${number}`) ?? `odd of ${club}: ${number}`)
};


// set store unique items without duplicate. its other doen't matter
const restaurantOrders = new Set(['pizza', 'rice', 'indomie','rice', 'bund' ]);

// create new set from string
// console.log(new Set('jonas'));

// get the size of the set
console.log(restaurantOrders.size);

// check for presence of item 
console.log(restaurantOrders.has('beans'));
console.log(restaurantOrders.has('rice'));
console.log(restaurantOrders.add('beans'));
console.log(restaurantOrders.add('beans'));
console.log(restaurantOrders.delete('beans'));
// restaurantOrders.clear(); // delete all item in a set
// console.log(restaurantOrders);

// looping through
// for (const order of restaurantOrders) console.log(order)


// use set when you need to store data in order and that might contains duplicate.

// MAPS DS : they are used to map values to keys.
// Diff. maps and object. Kays in obj. are string while in maps they can have diff. data types

const tech = new Map();
tech.set('tools', 'VS code');
tech.set('DB', 'MySQL').set('test', ['unitest', 'pytest']);
console.log(tech);

// retrieve
console.log(tech.get('test'));

// check for availability of keys
// console.log(tech.has('tools')) // true
// console.log(tech.has('tool')) // false

tech.delete('tools') // delete key
tech.clear();
console.log(tech);
console.log(tech.size); // get the size 

// another ways of adding items to set.

const question = new Map([
  ['question', 'What is the best programming language'],
  [1, 'c'], 
  [2, 'java'],
  [3, 'javascript'],
  ['correct',3],
  [true, 'correct'],
  [false, 'Try again!']
]);

console.log(question);

console.log(question.get('question'));

for (const [key, value] of question){
 if(typeof key === 'number'){
  console.log(`Answer ${key}: ${value}`)
 }
};

// const userInput = Number(prompt('Enter your answer'));
const userInput = 3;
console.log(question.get(question.get('correct') === userInput));

// convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);


