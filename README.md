# Javascript quick notes

## 2. - ES5 vs ES6

### 2.1 - let and const

Variable declarations in ES5 are defined with var keyword which has function scope. In ES6 two new keywords are introduced:

* const - For values that will not change. If you try to change the value later, an Exception will be displayed
* let - For values that may change

Both keywords have block scope instead of a function scope like var

ES5

```javascript
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// Output: "Jane Miller"
```

ES6

```javascript
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller'; // Const can not be modfied
console.log(name6);

// Output: "Jane Miller"
```

#### Example

Scope differences in var, const and let

#### ES5

The ```var``` has function scope and variables can be read outside block statement

```javascript
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicense5(true); 

// Output: "John, born in 1990, is now officially allowed to drive a car"
```

#### ES6

The ```let``` and ```const``` have block scope and can not be read from outside

```javascript
function driversLicense6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;
    }

    //console.log(firstName + ', born in ' + yearOfBirth + ', is now offically allowed to drive a car.'); 
    // This statement won't work because new variable types have block scope
}

driversLicense6(true);

// Output:
```

#### ES5

The ```var``` will be modified/replaced inside the for loop

```javascript
function theLoop5() {
    var i = 23;

    for (var i = 0; i < 5; i++) {
        console.log(i);
    }

    console.log('theLoop5: ' + i);
}

theLoop5();

/* Output:
* theLoop5: 0
* theLoop5: 1
* theLoop5: 2
* theLoop5: 3
* theLoop5: 4
*/
```

#### ES6

The ```let``` will not be modified/replaced and the i inside the for loop will be independant

```javascript
function theLoop6() {
    let i = 23;

    for (let i = 0; i < 5; i++) {
        console.log(i); // Because of the block scope, this i variable is a different variable and does not affect to the outer one
    }

    console.log('theLoop6: ' + i);
}

theLoop6();

// Output: theLoop6: 23
```

### 2.2 - Blocks and IIFEs

#### ES5

```javascript
(function () {
    var c = 3;
})();

//console.log(c); // Can not read c because is function scope

// Output: 
```

#### ES6

```javascript
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b); // Can not read a and b because are block scope
console.log(c); // However, c is still visible from outter the block

// Output: 3
```

### 2.3 - Strings

```javascript
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}
```

#### ES5

```javascript
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// Output: This is John Smith. He was born in 1990. Today, he is 28 years old.
```

#### ES6

In ES6 we can use **Template Strings** to place variables and even expressions

```javascript
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

// Output: This is John Smith. he was born in 1990. Today, he is 28 years old.
```

Some useful functions in ES6 with Strings

* startsWith
* endsWith
* includes
* repeat

```javascript
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J')); // It's case sensitive!!
console.log((n.endsWith('Sm'))); // It's case sensitive!!
console.log(n.includes('oh')); // It's case sensitive!!
console.log(`${firstName} `.repeat(5));

/* Output:
* true
* false
* true
* John John John John John
*/
```

### 2.4 - Arrow Functions

* Arrow functions with 0 or more than one parameter must use ```()```
* Arrow functions with more than one statement must use ```{ }``` and ```return```

```javascript
const years = [1990, 1965, 1982, 1937];
```

#### ES5

```javascript
var ages5 = years.map(function (el) {
    return 2018 - el;
});

console.log(ages5);
```

#### ES6

```javascript
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}`);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}`
});
```

#### 2.4.1 - this scope in arrow functions

Arrow functions share the ```this``` value with the outer function

#### ES5

```javascript
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            // If you try to use here this, the return of the value will be undefined
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}

//box5.clickMe();
```

* We need to store this into var self because in the inner function on the event listener this points to global scope (window object)

#### ES6

```javascript
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            // Here you can use this because arrow functions shares the this with the outer function, and in the outer function this points to the current object
            const str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    }
}

box6.clickMe();
```

* If you change the first function for an arrow function, will share the ```this``` with the current object which is the global object, and below will be undefined again

#### 2.4.2 - bind alternative

```javascript
function Person(name) {
    this.name = name;
}

var friends = ['Bob', 'Jane', 'Mark'];
```

#### ES5

With bind we can pass the this variable into the function, because we're binding it from outer the function

```javascript
Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (current) {
        return this.name + ' is friends with ' + current;
    }.bind(this));
    console.log(arr);
}

new Person('John').myFriends5(friends);
```

#### ES6

You can use this because arrow functions shares the this with the outer function, and in the outer function this points to the current object

```javascript
Person.prototype.myFriends6 = function (friends) {
    var arr = friends.map(current => `${this.name} is friends with ${current}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
```

### 2.5 - Destructuring

#### ES5

In ES5 for apply variables from array you must access/store them

```javascript
var john = ['John', 26];
var nameD5 = john[0];
var ageD5 = john[1];

console.log(nameD5);
console.log(ageD5);

/* Output:
* "John"
* 26
*/
```

#### ES6

In ES6 you can destructure the array

```javascript
const [nameD6, ageD6] = ['John', 26];

console.log(nameD6);
// Output: "John"

console.log(ageD6);
// Output: 26

const obj = {
    firstNameD: 'John',
    lastNameD: 'Smith'
};

// Keys must match with the obj
const { firstNameD, lastNameD } = obj;
console.log(firstNameD);
// Output: "John"

console.log(lastNameD);
// Output: "Smith"

// Change keys name in the final object
const { firstNameD: customNameA, lastNameD: customNameB } = obj;
console.log(customNameA);
console.log(customNameB);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [ageD, retirement] = calcAgeRetirement(1990);
console.log(ageD);
console.log(retirement);
```

### 2.6 - Arrays

```javascript
const boxes = document.querySelectorAll('.box');
```

#### ES5

In ES5 for use forEach in a nodeList, first we need to slice it into Array

```javascript
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (current) {
    current.style.backgroundColor = 'dodgerblue';
});
```

#### ES6

In ES6 we can generate an array with the function ```from```

```javascript
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(current => current.style.backgroundColor = 'dodgerblue');
```

For acces all elements in nodeList

#### ES5

```javascript
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') continue;
    boxesArr5[i].textContent = 'I changed to blue!';
}
```

#### ES6

```javascript
for (const current of boxesArr6) {
    if (current.className.includes('blue')) continue;
    current.textContent = 'I changed to blue!';
}
```

Useful functions in arrays

```javascript
var ages = [12, 17, 8, 21, 14, 11];
var fullAge = ages.map(function (current) {
    return current >= 18;
});
```

#### ES5

```javascript
console.log(fullAge);
// Output: [false, false, false, true, false, false]

console.log(fullAge.indexOf(true));
// Output: 3

console.log(ages[fullAge.indexOf(true)]);
// Output: 21
```

#### ES6

* findIndex - Find the index where the condition is true
* find - Find the element where the condition is true

```javascript
console.log(ages.findIndex(current => current >= 18));
// Output: 3

console.log(ages.find(current => current >= 18));
// Output: 21
```

### 2.7 - Spread Operator

Spread operator is introduced in ES6 and permits expand the arrays as individual parameters

```javascript
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);
// Output: 81
```

#### ES5

```javascript
var ages = [18, 30, 12, 21];
// The apply() method calls a function with a given this value, and arguments provided as an array
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);
// Output 81
```

#### ES6

Spread operator applies the values as arguments

```javascript
var ages = [18, 30, 12, 21];
const sum3 = addFourAges(...ages);
console.log(sum3);
// Output 81
```

```javascript
const familySmith = ['John', 'Jane', 'Mark',];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller]; // Applies the values as elements
console.log(bigFamily);
// Output: ["John", "Jane", "Mark", "Lily", "Mary", "Bob", "Ann"]

const h = document.querySelector('h1');
const boxes5 = document.querySelectorAll('.box');
const all = [h, ...boxes5]; // Works too with nodes and nodeList

Array.from(all).forEach(current => current.style.color = 'purple');
```

### 2.8 - Rest parameters

#### ES5

```javascript
function isFullAge5() {
    // arguments have access to every function parameter and has a Array-like structure (not an array)
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function (current) {
        console.log((2018 - current) >= 18)
    });
}

isFullAge5(1990, 1999, 2012);
// Output: true, true, false
```

### 2.9 - Default parameters

#### ES5

```javascript
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {
    lastName = lastName === undefined ? 'Smith' : lastName;
    nationality = nationality === undefined ? 'American' : nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john5 = new SmithPerson5('John', 1990);
var emily5 = new SmithPerson5('Emily', 1983, 'Diaz', 'Spanish');
console.log(john5, emily5);
// Output: Object { firstName: "John", lastname: "Smith", yearOfBirth: 1990, nationality: "American"}
// Object { firstName: "Emily", lastName: "Diaz", yearOfBirth: 1983, nationality: "Spanish" }
```


#### ES6

```javascript
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

const john6 = new SmithPerson6('John', 1990);
const emily6 = new SmithPerson6('Emily', 1983, 'Diaz', 'Spanish');
console.log(john6, emily6);
// Output: Object { firstName: "John", lastname: "Smith", yearOfBirth: 1990, nationality: "American"}
// Object { firstName: "Emily", lastName: "Diaz", yearOfBirth: 1983, nationality: "Spanish" }
```

In ES6 you do not need to check the undefineds, it is already done in the function declaration

### 2.10 - Maps

* Objects in ES5 are hashmaps structures which the key is a string and the value is any
* Maps in ES6 are hashmaps structures which the key can be any
  
Pros of using Maps

* Key can be anything
* Are iterables
* It's easy to get the size of the collection
* It's easy to put and remove elements

#### ES6

```javascript
const question = new Map();
question.set('question', 'What is the official name of the latest major Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
//console.log(question.size);

/*if (question.has(4)) {
    question.delete(4);
}*/

//console.log(question);

//question.clear();
//console.log(question);

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

// Destructuring
for (let [key, value] of question.entries()) {
    if (typeof (key) === 'number') {
        console.log(`Answer ${key}: ${value}`)
    }
}

//const ans = parseInt(prompt('Write the correct answer'));
//console.log(question.get(ans === question.get('correct')));
```

### 2.11 - Classes

#### ES5

```javascript
var Person5c = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5c.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5c = new Person5c('John', 1990, 'teacher');
```

### ES6

```javascript
class Person6c {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greetings() {
        console.log('Hey there!');
    }
}

const john6c = new Person6c('John', 1990, 'teacher');

Person6c.greetings();
```

The static keyword defines a static method for a class. Static methods aren't called on instances of the class. Instead, they're called on the class itself. These are often utility functions, such as functions to create or clone objects.

The static method will be not available for the child objects of the class.

### 2.12 - Classes and Subclasses

#### ES5

```javascript
var Person5c2 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5c2.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5c2.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

// Connect Athlete subclass with Person class
Athlete5.prototype = Object.create(Person5c2.prototype);

// Add methods to athlete subclass
Athlete5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// Now have access to own functions and parent class functions
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();
```

#### ES6

```javascript
class Person6c2 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greetings() {
        console.log('Hey there!');
    }
}

// With extends you do the same than before, connecting the prototypes
class Athlete6 extends Person6c2 {
    // You must pass the attributes of the parent class
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();
```
