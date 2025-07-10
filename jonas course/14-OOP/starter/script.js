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

// static method

Person.hey(){
  console.log("greeting as a static method")
  console.log(" ia ma not available on the instance method")
}


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


// Es6 classes are special type of class but they are still function
// we have class declaration and expression

// class expression
// const PersonCL = class(){

// }

// class declaration
class PersonCL {
  // the class takes the constructor that create the property for the object
  constructor(fullName,birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // method stay outside and will be added as the .prototype
  // called instance method
  calAge(){
    return new Date().getFullYear() - this.birthYear 
  }

  greet(){
    console.log(`Hey ${this.fullName}`)
  }

  get isAdult(){
    return this.calAge() >= 18;
  }

  set officialName(status){
    return this.fullName =  `${status} ${this.fullName}`
  }

  // static method
  static hey(){
    console.log('I am a static method!')
  }
}

const Dolla = new PersonCL('Dola', 'Eli',2003);
// console.log(Dolla)
Dolla.greet();

//  using setter to set value and getter to get value

const account = {
  owner: "Themy",
  movements: [30,90,80,45,56,70],

  get latest(){
    return this.movements.slice(-1).pop();
  },

  set newMovement(mov){
    return this.movements.push(mov)
  }
}

// console.log(account.latest)
account.newMovement = 100 // instead of  account.newMovement(100)
// console.log(account.movements)

Dolla.officialName = 'Miss';
// console.log(Dolla.fullName);
PersonCL.hey()


// creating object using object.create()
const PersonProto = {
  calcAge(){
    console.log(new Date().getFullYear() - this.birthYear)
  },

  init(firstName, birthYear){
    // this just like any other function in this object
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
}
// creating the class unlike using the new keyword
const julian = Object.create(PersonProto);
julian.init('julian', 2005 )
julian.calcAge()


//coding challenge 2

class Car{
  constructor(make, speed){
    this.make = make;
    this.speed = speed;
  }
  
  // instance method
  accelerate(){
    this.speed +=10
    console.log(`${this.make} going at ${this.speed} mi/hr`);
  }
  break(){
    this.speed -=5
    console.log(`${this.make} going at ${this.speed} mi/hr`);
  }

  // setter and getter
  get speedUs(){
    return this.speed/1.6
  }

  set speedUs(speed){
    return this.speed = speed * 1.6
  }
}

const ford =new Car('Ford', 120);
ford.speedUs
ford.speedUs = 300
ford.speedUs

console.log(ford.speed)
ford.accelerate()
ford.break()


// inheritance in construction function
// parent class
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

// child class
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // set the this keyword manually
  // instead of this inherit and have access to the prototype of the parent
  //  this.firstName = firstName;
  // this.birthYear = birthYear;
  this.course = course;
};

// inherits the parent prototype first before adding more prototype
Student.prototype = Object.create(Person.prototype)

Student.prototype.announce = function () {
  console.log(`my name is ${this.firstName}, studying ${this.course} `);
};

const mike = new Student('Themy', 2001, 'Cyber');
mike.announce();
// because of the prototype inheritance we can do this
console.log(mike.calcAge());

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor)
console.log(mike instanceof Person) // student inherits from parent
console.log(mike instanceof Student) // instance of student

// challenge 4

// parent class
const Car =  function(make, speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate =function() {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} mi/hr`);
};

Car.prototype.break =function() {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} mi/hr`);
}

// child class
const EV = function(make,speed,charge){
  Car.call(this, make,speed); // inherit from car and set this kw
  this.charge = charge;
}

// copy its prototype and set the constructor prototype
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function(chargeTo){
  this.charge = chargeTo;
};

EV.prototype.accelerate = function(){
  console.log(`${this.make} is going at ${this.speed}km/hr, with a charge of ${this.charge}%`)
  this.speed += 20;
  --this.charge;
  console.log(`${this.make} is going at ${this.speed}km/hr, with a charge of ${this.charge}%`)
};

const tesla = new EV('Tesla', 120, 40);
console.log(Car.prototype)
console.log(tesla instanceof Person)
tesla.accelerate();
tesla.accelerate();
tesla.break();
tesla.break();
tesla.chargeBattery(90);
tesla.accelerate();


//2. inheritance with ES6 classes
class PersonCL {
  // the class takes the constructor that create the property for the object
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // method stay outside and will be added as the .prototype
  // called instance method
  calAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get isAdult() {
    return this.calAge() >= 18;
  }

  set officialName(status) {
    return (this.fullName = `${status} ${this.fullName}`);
  }

  // static method
  static hey() {
    console.log('I am a static method!');
  }
}

// the extend kw sets the prototype to the parent class
class StudentCL extends PersonCL{
  constructor(fullName, birthYear, course){
    super(fullName, birthYear);
    this.course = course;
  };

  announce(){
    console.log(`I am ${this.fullName}, studying ${this.course}`)
  }

  calAge(){
    console.log(`I am ${new Date().getFullYear() - this.birthYear} but people say i am 5 years older`);
  }

};

const themy = new StudentCL('themy', 2004, 'Cybersecurity')
themy.announce()
themy.calAge()


//3. inheritance with Object.create
const PersonProto = {
  init(firstName,birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge(){
    console.log(`${new Date().getFullYear() - this.birthYear}`);
  },
}

//  create the person class instance with object.create
const steven = Object.create(PersonProto);
steven.init('Steven', 1940);
steven.calcAge()

// create inheritance copy the person proto to student
const StudentProto = Object.create(PersonProto);

// polymorphism: overwriting the iit mtd that was copied for the StudentProto
StudentProto.init = function(firstName,birthYear,course){
  PersonProto.init.call(this,firstName,birthYear);
  this.course = course
}

// add new function
StudentProto.announce = function(){
  console.log(`I am ${this.firstName}, studying ${this.course}`)
}

const themy = Object.create(StudentProto);
themy.init('themy', 2003, 'physics')
console.dir(themy)
themy.announce()

class Account{

  // 1. public properties(they are accessible using the this kw)
  locale = navigator.language

  // 2. private fields
  #movements = []

  // declare the pin as private variable to make it private
  #pin


  constructor(owner,cur, pin){
    this.owner = owner;
    this.cur = cur;
    this.#pin = pin;
    //protect properties
    // this._movements = []
    // this.locale = navigator.language
  };

  deposit(val){
    if(val < 5) return `Amount is less than ${this.cur}5`
    this.#movements.push(Number(val))
    return this
  };

  withdrawal(val){
    if(val < 5) return `Amount is less than ${this.cur}5`
    this.#movements.push(-val)
    return this;
  };

  get getMovements(){
    return this.#movements;
  }
  
  // protected method
  // _approveLoan(val){
  #approveLoan(val){
    return true;
  };

  requestLoan(val){
    if(this.#approveLoan(val)){
      this.deposit(val);
      console.log(`Loan approved`)
      return this;

    };
  };
};

const acc1 = new Account('themy', 'NGN', 1111)
console.log(acc1.deposit(4));
acc1.deposit(10);
acc1.deposit(1000);
// you shouldn't access a protected property or method from outside

// Method chaining: will work if the method return this(the acc after performing an action)
acc1.deposit(300).deposit(500).withdrawal(250).deposit(500).requestLoan(300);
console.log(acc1.getMovements); // using getter


*/

class CarCl {
  constructor(make,speed){
    this.make = make;
    this.speed = speed;
  }

  accelerate(){
    this.speed +=10
    console.log(`${this.make} is going at ${this.speed} km/hr`)
    return this
  }

  brake(){
    this.speed -=5;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
    return this
  }

  get speedUs(){
    // convert to US speed Unit
    return `${this.speed / 1.6}km/hr`;
  }

};

class EVCl extends CarCl{
  // charge is a private field
  #charge

  constructor(make,speed,charge){
    super(make,speed);
    this.#charge = charge;
  }

  accelerate(){
    this.speed +=20;
    --this.#charge
    console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.#charge}%`);
    return this
  }

  brake(){
    this.speed -=10;
    --this.#charge
    console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.#charge}%`);
    return this
  }

  chargeBattery(val){
    this.#charge += val
    console.log(`${this.make} is charged to new charge: ${this.#charge}%`);
    return this
  }
};


const fabian = new EVCl('Fabian', 120, 30)
fabian.accelerate().chargeBattery(40).brake().brake().accelerate()
console.log(fabian.speedUs)