/*
let js = "amazing";
if (js == "amazing") console.log( typeof js);

let firstName = "Themy";
console.log(firstName);

console.log(45 + 6 + 1);


const currentYear = 2025;
const ageThemy = currentYear - 1975;
console.log(currentYear, ageThemy) 

const firstName ='Themy';
const lastName = 'Olla';

console.log('Using string concatenation to get full name:' + firstName + ' ' + lastName )
console.log(`Using template string full name is ${firstName} ${lastName}`)

// assignment operators
let x = 10;
x -=3;
x *= 5;
x /= 7;
x++; // increment by 1, x-- decrement by 1
console.log(x);

// comparison operator
console.log(x > 10, x) // >,<,>=, >=


// order of precedence affects execution

// Coding challenge 1
let markHeight = 1.69;
let markMass = 78;

let johnHeight = 1.96;
let johnMass = 92;

markHeight = 1.88;
markMass = 95;

johnHeight = 1.76;
johnMass = 85;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / (johnHeight * johnHeight);

console.log(markBMI, johnBMI);

const markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

//template literals for multiline strings
console.log('Anything your \n\ HAND \n\ finds doing \n\ do')
console.log(`I am doing
  something cool bro....`)


// this program checks if you are off age to get driver's license , 
// if not it tells you in what age time you can obtain it
const userAge = 14;

if (userAge >= 18){
  console.log('Take your license');
} else{
  console.log(`come back in ${18 - userAge} years time to obtain your license`);
};

//what century do you belong to
const birthYear = 2003;
let century;

if (birthYear < 2000){
  century = 20;
} else{
  century = 21
}

console.log(`You belong to the ${century} century`)


// Coding challenge 1 - refactoring
let markHeight = 1.69;
let markMass = 78;

let johnHeight = 1.96;
let johnMass = 92;

// markHeight = 1.88;
// markMass = 95;

// johnHeight = 1.76;
// johnMass = 85;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / (johnHeight * johnHeight);

if (markBMI > johnBMI){
  console.log(`Mark's BMI ${markBMI} is greater than John's! BMI ${johnBMI} `)
} else{
  console.log(`John's BMI ${markBMI} is greater than Mark's BMI ${johnBMI} `)
}



// Type conversion( we perform the conversion) and coercion(it is done by js automatically)
// we ca only convert to Number, String, Boolean. Type coercion to string happens automatically
console.log(Number('40') + 2)
console.log(String(4))

// coercion
console.log('20' + 233) // + operator get converted to str and concat
console.log('20' - 4) // - convert them to int same as ** and /     
console.log('basis' - 4) // - when it tries to convert to a number and was invalid number we get Nan



// 5 falsy values : 0, '', undefined, Nan, null, false anything other than this are truthy
// when using logical operator js uses type coercion for us
console.log(Boolean(0))
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(''))
console.log(Boolean({})) // truthy
console.log(Boolean('jonas'))

const balance = 0;

if (balance){
  console.log('give me money');
} else{
  console.log('you should get a job bro!')
}

// tight (===) and loose equality(==) it perform type coercion



// boolean operator

const TeamDolpAvg = (96 + 108 + 119) / 3
const TeamKoalAvg = (96 + 108 + 119) / 3

if ((TeamDolpAvg == TeamKoalAvg) && (TeamDolpAvg >= 100)){
  console.log(`Draw with ${TeamDolpAvg}`)
}else if ((TeamDolpAvg > TeamKoalAvg) && (TeamDolpAvg >= 100)){
  console.log(`Team Dolphin won with ${TeamDolpAvg}`)
} else if (TeamKoalAvg >=  100){
  console.log(`Team Koal won with ${TeamKoalAvg}`)
}else{
  console.log(`no team wins  the pass mark 100 ${TeamKoalAvg} ${TeamDolpAvg}`)
}



// switch statement - used when we just want to check for equality

const day = 'nice';
let instruction;

switch(day){
  case 'mon':
    instruction = 'Pray';
    break;
  case 'tue':
    instruction = 'eat';
    break;
  case 'wed':
  case 'thur':
    instruction = 'code'
    break;
  case 'fri':
    instruction = 'learn new tech';
    break;
  case 'sat':
    instruction = 'call relatives';
    break;
  case 'sun':
    instruction = 'sabbat day';
    break;
  default:
    instruction = 'you must be an alien.';  
}

console.log(instruction)
*/

// Ternary operator - used to make quick decision

const value = 275;

let tip = 50 <= value <= 300 ? value * 0.15 : value * 0.20
console.log(`The bill was ${value}, the tip was ${tip}, and the total value ${value+tip}`)  