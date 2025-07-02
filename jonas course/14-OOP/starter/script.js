'use strict';

// constructor func
const Person = function(firstName, birthYear){
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear
}


// copy objects
const themy = new Person('themy',1992);
console.log(themy)

const user = {
  firstName:'Blob',
  birthYear:5655
}
Object.freeze(user)

const matlida = {...user}
matlida.firstName = 'matlida';
matlida.birthYear = 4564

console.log(user, matlida);

// test for instance
console.log(matlida instanceof Person); // false
console.log(themy instanceof Person); // true

// prototypal inheritance
const date = new Date();
console.log(Person.prototype);
Person.prototype.calAge = function(){
  return date.getFullYear() - this.birthYear;
};

console.log(themy.__proto__ === Person.prototype); 
// true : because the prototype was created on the person so it can only be used on the instance that was created from person
console.log(themy.__proto__ === Person.__proto__); // false
console.log(themy.prototype); // undefined
console.log(themy.calAge());

console.log(Person.prototype.isPrototypeOf(themy)) // true
console.log(Person.prototype.isPrototypeOf(Person)) // false

// setting properties
Person.prototype.species = 'Homo Sapiens';
console.log(themy.species)
// property declared on the object directly are the object property
console.log(themy.hasOwnProperty('firstName')) // true
console.log(themy.hasOwnProperty('species')) // false
