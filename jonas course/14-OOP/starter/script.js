'use strict';
/*
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


const sectFunctionTab = function () {
  const tabs = document.querySelectorAll('.tab');
  const contentTab = document.querySelectorAll('.tab__content');
  const funcTabs = document.querySelector('.func__tabs');

  funcTabs.addEventListener('click', function (e) {
    const clickedTab = e.target.closest('.tab');
    if (!clickedTab) return;

    // toggle off active tab alone
    if (clickedTab.classList.contains('active')) {
      deactivateTab();
      return;
    }
  
    deactivateTab();
    activateTab(clickedTab);
  });

  const deactivateTab = function () {
    contentTab.forEach(content => {
      content.style.maxHeight = null;
      content.classList.remove('active');
    });

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
  };

  const activateTab = function (clicked) {
    const tabNum = clicked.dataset.tab;
    const content = document.querySelector(`.tab__content--${tabNum}`);

    clicked.classList.add('active');
    content.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  };
};
sectFunctionTab();


// prototype of an array
const arr = [2,4,5,6,6,7];
console.log(arr.__proto__)
console.log(arr.__proto__ === Array.prototype)
// walking down the prototype chain
console.log(arr.__proto__.__proto__) 


// first coding challenge
const Car = function(make, speed){
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function(){
  this.speed += 10;
  return `${this.make} is going at ${this.speed} km/hr`
};

Car.prototype.break = function(){
  this.speed -= 5;
  return `${this.make} is going at ${this.speed} km/hr`
};

const BMW = new Car('BMW',120);
const Mercede = new Car("Mercedes", 95);

console.log(BMW.accelerate());
console.log(BMW.accelerate());
console.log(BMW.accelerate());
console.log(BMW.break());  
*/

// Es6 classes are special type of class but they are still function
// we have class declaration and expression

// class expression
// const PersonCL = class(){

// }

// class declaration
class PersonCL {
  // the class takes the constructor that create the property for the object
  constructor(firstName, lastName,birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  // method stay outside and will be added as the .prototype
  calAge(){
    console.log(new Date().getFullYear() - this.birthYear) 
  }

  greet(){
    console.log(`Hey ${this.firstName}`)
  }
}

const Dolla = new PersonCL('Dola', 'Eli',2003);
console.log(Dolla)
Dolla.greet();

// 