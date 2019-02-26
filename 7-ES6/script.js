// Lecture: let and const

// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
/**
 * const for values that will not change
 * let for values that may change
 * Both types have block scope instead of function scope like var
 * Cannot use before declaring it, var can be used and will be displayed as undefined
 */
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller'; // Const can not be modified
console.log(name6);

console.log('=================================');

// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    console.log(firstName + ', born in ' + yearOfBirth + ', is now offically allowed to drive a car.');
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;
    }

    //console.log(firstName + ', born in ' + yearOfBirth + ', is now offically allowed to drive a car.'); // This statement won't work because new variable types have block scope
}

driversLicense6(true);

console.log('=================================');

// ES5
function theLoop5() {
    var i = 23;

    for (var i = 0; i < 5; i++) {
        console.log(i);
    }

    console.log('theLoop5: ' + i);
}

theLoop5();

// ES6
function theLoop6() {
    let i = 23;

    for (let i = 0; i < 5; i++) {
        console.log(i); // Because of the block scope, this i variable is a different variable and does not affect to the outer one
    }

    console.log('theLoop6: ' + i);
}

theLoop6();

console.log('=================================');

// Lecture: Blocks and IIFEs
// ES5
(function () {
    var c = 3;
})();

//console.log(c); // Can not read c because is function scope

// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b); // Can not read a and b because are block scope
console.log(c); // However, c is still visible from outter the block

console.log('=================================');

// Lecture: Strings
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
// In ES6 we can use Template Strings to place variables and even expressions
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J')); // It's case sensitive!!
console.log((n.endsWith('Sm'))); // It's case sensitive!!
console.log(n.includes('oh')); // It's case sensitive!!
console.log(`${firstName} `.repeat(5));

console.log('=================================');

// Lecture: Arrow Functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
    return 2018 - el;
});

console.log(ages5);

// ES6
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

// Arrow functions with 0 or more than one parameter must use ()
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}`);

// Arrow functions with more than one statement must use {} and return
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}`
});

console.log('=================================');

// Lecture: Arrow functions 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        // We need to store this into var self because in the inner function on the event listener this points to global scope (window object)
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            // If you try to use here this, the return of the value will be undefined
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}

//box5.clickMe();

// ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        // If you change the function above for an arrow function, will share the this with the current object which is the global object, and below will be undefined again
        document.querySelector('.green').addEventListener('click', () => {
            // Here you can use this because arrow functions shares the this with the outer function, and in the outer function this points to the current object
            const str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    }
}

box6.clickMe();


function Person(name) {
    this.name = name;
}

var friends = ['Bob', 'Jane', 'Mark'];

// ES5
Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (current) {
        return this.name + ' is friends with ' + current;
    }.bind(this));
    // With bind we can pass the this variable into the function, because we're binding it from outer the function

    console.log(arr);
}

new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    // Here you can use this because arrow functions shares the this with the outer function, and in the outer function this points to the current object
    var arr = friends.map(current => `${this.name} is friends with ${current}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);

console.log('=================================');

// Lecture: Destructuring

// ES5
var john = ['John', 26];
var nameD5 = john[0];
var ageD5 = john[1];

console.log(nameD5);
console.log(ageD5);

// ES6
const [nameD6, ageD6] = ['John', 26];

console.log(nameD6);
console.log(ageD6);

const obj = {
    firstNameD: 'John',
    lastNameD: 'Smith'
};

// Keys must match with the obj
const { firstNameD, lastNameD } = obj;
console.log(firstNameD);
console.log(lastNameD);

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

console.log('=================================');


// Lecture: Arrays

const boxes = document.querySelectorAll('.box');

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (current) {
    current.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(current => current.style.backgroundColor = 'dodgerblue');


// ES5
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') continue;
    boxesArr5[i].textContent = 'I changed to blue!';
}

// ES6
for (const current of boxesArr6) {
    if (current.className.includes('blue')) continue;
    current.textContent = 'I changed to blue!';
}


// ES5
var ages = [12, 17, 8, 21, 14, 11];
var fullAge = ages.map(function (current) {
    return current >= 18;
});

console.log(fullAge);
console.log(fullAge.indexOf(true));
console.log(ages[fullAge.indexOf(true)]);

// ES6
console.log(ages.findIndex(current => current >= 18)); // Find the index where the condition is true
console.log(ages.find(current => current >= 18)); // Find the element where the condition is true

console.log('=================================');


// Lecture: Spread Operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21]
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages); // Spread operator applies the values as arguments
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark',];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller]; // Applies the values as elements
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes5 = document.querySelectorAll('.box');
const all = [h, ...boxes5]; // Works too with nodes and nodeList

Array.from(all).forEach(current => current.style.color = 'purple');

console.log('=================================');

// Lecture: Rest parameters

// ES5
function isFullAge5() {
    // arguments have access to every function parameter and has a Array-like structure (not an array)
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(current) {
        console.log((2018 - current) >= 18)
    });
}

isFullAge5(1990, 1999, 2012);
// Output: true, true, false

// ES6
// It looks like spread operation but the difference is spread operator is used in the function call and the rest parameters in the function declaration
function isFullAge6(...years) {
    // Here is currently an array
    years.forEach(current => console.log((2018 - current) >= 18));
}

isFullAge6(1990, 1999, 2012);
// Output: true, true, false


// If we want to add one parameter to the functions...

// ES5
function isFullAge51(limit) {
    // In ES5 you must slice after the first element
    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(current) {
        console.log((2018 - current) >= limit)
    });
}

isFullAge51(18, 1990, 1999, 2012);
// Output: true, true, false

// ES6
function isFullAge61(limit, ...years) {
    // In ES6 it's clear the first parameter, and the rest parameters
    years.forEach(current => console.log((2018 - current) >= limit));
}

isFullAge61(18, 1990, 1999, 2012);
// Output: true, true, false

console.log('=================================');

// Lecture: Default parameters

// ES5
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

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    // In ES6 you do not need to check the undefineds, it is already done in the function declaration
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