'use strict'

/* 
// const private = 'male' // here is reserved KW without strict mode it will be used.
// console.log(private)

// Function takes argument or without parameter that are used to create reuseable code that returns a result.
// when invoking the function. parameter is passed to it

// birthYear is the parameter while 2003 is the argument
// function declaration
function calAge1(birthYear){
  return 2045 - birthYear;
}

console.log(calAge1(2003));

// anonymous function - return a value, must be defined before invoking
// function expression
const calAge2 = function (birthYear){
  return 2045 - birthYear
}

console.log( `2 types of function declaration: ${calAge1(2003)}, expression ${calAge2(2003)} `);


// arrow function

const calAge3 = birthYear => 2045 - birthYear
console.log(calAge3(2003))

const yearUnitRetirement = (firstName, birthYear) => {
    const yearLeft = 65 - calAge3(birthYear);
    return `${firstName} retires in ${yearLeft} years...`
}
console.log(yearUnitRetirement('Themy', 2003))



// coding challenge

const calAvg = (first, second, third) => (first + second + third) / 3;

let scoreDolp = calAvg(44, 23, 71);
let scoreKoal = calAvg(65, 54, 49);

const decideWinner = (score1, score2) => {
  if (score1 >= 2 * score2){
    return `team 1 wins with (${score1} vs ${score2 })`;
  } else if (score2 >= 2 * score1){
    return `team 2 wins with (${score2} vs ${score1})`;
  } else {
    return `no team wins with (${score1} vs ${score2})`;
  }
}
console.log(decideWinner(scoreDolp, scoreKoal));

scoreDolp = calAvg(85, 54, 41);
scoreKoal = calAvg(23, 34, 27);

console.log(decideWinner(scoreDolp, scoreKoal));


// Array - container that holds items 
const friends = ['bola', 'john', 'sister', 34];
console.log(friends);

// using array class to create an array
const year = new Array(1912, 1913, 1914);

// accessing through indexing 
console.log(friends[1], year[1]);

// length of an array
console.log(year.length)

// get last item in an array
console.log(friends[friends.length - 1])

// inserting item at an index
friends[2] = 'Oyin'
console.log(friends)

// you can't replace the entire array but you can change item in each index
// friend = ['bob', 'ore']

const calAges = years => {
  const age = [];
  for (let i = 0; i <= years.length; i++){
    const curAge = 2037 - years[i];
    age.push(curAge);
    console.log(age);
  }
  return age;
};

console.log(calAges(year))

// add element to first index , last index .push()
friends.unshift('olla'); // return length of the new array

// remove element
friends.pop() // remove last item and return item
friends.shift() // remove last item and return item
console.log(friends)

// index and include
console.log(friends.indexOf('bolla')) // -1 if the index is not found
console.log(friends.indexOf('bola'))
console.log(friends.includes('bola'))

// object are in key values pairs called the object literals syntax

 
const profile = {
  name: 'Themy olla',
  birthYear: 2003,
  class: '400lvl',
  job: 'software developer',
  hobbies: ['reading', 'eating', 'praying'],
  calAge : function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
  hasDriverLicense: false,
}


// retrieving item 
console.log(profile.name)
console.log(profile['hobbies'])

// const property = prompt('What details will you like to retrieve?' )
// console.log(profile[property]) 

// add item to object
profile['religion'] = 'christ';

console.log(`${profile.name}, you have a very descriptive nature. you love ${profile['hobbies'][0]}`)


// this keyword is equal to the object on which the variable is called
console.log(profile.calAge(2003));
console.log(profile.birthYear);

// to use the profile.age we must first call the profile.calAge so we vcan have the key set
console.log(profile.age);
console.log(profile.age);

console.log(`${profile.name} is a ${profile.job}. He has ${profile.hasDriverLicense ? '' :'not'} acquired driver's license`)



// challenge 

const mark ={
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calBMI: function (){
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

const john ={
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calBMI: function (){
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

mark.calBMI()
john.calBMI()

console.log(mark.bmi, john.bmi)
const johnCondition= john.bmi > mark.bmi
const chooseBMI = `${  john.bmi > mark.bmi ? john.fullName : mark.fullName}'s BMI ${ john.bmi > mark.bmi ? john.bmi: mark.bmi} is higher than ${ john.bmi > mark.bmi ? mark.fullName :john.fullName  }'s ${  john.bmi > mark.bmi ? mark.bim : john.bmi}`
console.log(chooseBMI)

// Iteration
// for loop keeps the code running as long as the condition is true
// continue skip the current step and break statement to stop the current process
// reverse a loop

const hobbies = ['reading', 'eating', 'praying'];

for (let i=hobbies.length - 1; i >= 0; i-- ){
  console.log(i, hobbies[i]); 
}
*/


// while loop - used when we don't know the number of time to run a loop
let counter = 0;
while (counter < 7){
  console.log(counter);
  counter++;
}
