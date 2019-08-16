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

ES5

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

ES6

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

ES5

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

ES6

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

ES5

```javascript
(function () {
    var c = 3;
})();

//console.log(c); // Can not read c because is function scope

// Output:
```

ES6

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

ES5

```javascript
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// Output: This is John Smith. He was born in 1990. Today, he is 28 years old.
```

ES6

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

ES5

```javascript
var ages5 = years.map(function (el) {
    return 2018 - el;
});

console.log(ages5);
```

ES6

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

ES5

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

ES6

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

ES5

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

ES6

You can use this because arrow functions shares the this with the outer function, and in the outer function this points to the current object

```javascript
Person.prototype.myFriends6 = function (friends) {
    var arr = friends.map(current => `${this.name} is friends with ${current}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
```

### 2.5 - Destructuring

ES5

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

ES6

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

ES5

In ES5 for use forEach in a nodeList, first we need to slice it into Array

```javascript
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (current) {
    current.style.backgroundColor = 'dodgerblue';
});
```

ES6

In ES6 we can generate an array with the function ```from```

```javascript
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(current => current.style.backgroundColor = 'dodgerblue');
```

For acces all elements in nodeList

ES5

```javascript
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') continue;
    boxesArr5[i].textContent = 'I changed to blue!';
}
```

ES6

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

ES5

```javascript
console.log(fullAge);
// Output: [false, false, false, true, false, false]

console.log(fullAge.indexOf(true));
// Output: 3

console.log(ages[fullAge.indexOf(true)]);
// Output: 21
```

ES6

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

ES5

```javascript
var ages = [18, 30, 12, 21];
// The apply() method calls a function with a given this value, and arguments provided as an array
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);
// Output 81
```

ES6

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

ES5

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

ES5

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

ES6

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

ES6

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

ES5

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

ES6

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

ES5

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

ES6

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

## 3. - Asynchronous Javascript

Synchronous

```javascript
const second = () => {
            console.log('Second');
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('The end');
}

first();
```

Output: ```Hey there```, ```Second```, ```The end```

Asynchronous

```javascript
const second = () => {
    setTimeout(() => {
        console.log('Async Hey there');
    }, 2000);
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('The end');
}

first();
```

Output: ```Hey there```, ```The end```, ```Async Hey there```

The example displayed above uses a Web API function setTimeout that is stored on the Browser (Web API) with the callback function, in this case the console.log, meanwhile the rest of the code is executed on the execution stack.

When the timer reachs 0 the data stored on the Web API is sent to the message queue which will move that data (the callback function) to the execution stack through the event loop when the execution stack gets empty.

## Asynchronous with Callbacks (the old way)

In the following examples we will use setTimeouts simulating a Rest API response delay.

```javascript

function getRecipe() {
            setTimeout(() => {
                const recipeID = [523, 883, 432, 974];
                console.log(recipeID);

                setTimeout(id => {
                    const recipe = {
                        title: 'Fresh tomato pasta',
                        publisher: 'Jonas'
                    };
                    console.log(`${id}: ${recipe.title}`);

                    setTimeout(publisher => {
                        const recipe2 = {
                            title: 'Italian Pizza',
                            publisher: 'Jonas'
                        };
                        console.log(recipe);
                    }, 1500, recipe.publisher);
                }, 1500, recipeID[2]);
            }, 1500);
        }

        getRecipe();
```

The parameter pass to the callback function in setTimeout is the third parameter allowed. For example the id in the second setTimeout is the recipeID[2].

In the example above you can see what is called as callback hell.

## Promises

A promise is an object that keeps track about whether a certain event has happened already or not.

### Promises States

* Pending
* Settled / Resolved
  * Fulfilled
  * Rejected

### Create a Promise

```javascript
const promise = new Promise((resolve, reject) => {
    if (thingsGoOk) resolve('All clear!');
    else reject('Something was wrong :(');
 }
```

### Consume the promise

```javascript
promise
    .then(myResult => { ... })
    .catch(myError => { ... });
```

### ES8 async / await

```javascript
async function getRecipesAW() {
    const IDs = await getIDs;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    const related = await getRelated('Jonas');
    console.log(related);

    return recipe;
}

getRecipesAW().then(result => { console.log(`${result} is the best ever!`) });
```

With ES8 you can create an async function that will run in the background, with the keyword await the execution of that code will be stoped until the promise of that value is fullfiled.

The await keyword must be used only of functions not to stop the main execution code, for example:

```javascript
const res = getRecipesAW();
console.log(res);
```

In this case, the output will be a pending Promise because getRecipesAW continues running in the background but the main code is still executed line by line

Remember that, any async function returns a promise and the value of the return (if it has).

## ES6 Modules

### Import/Export

In order to do a very basic test, create a new .js file with the following code:

```javascript
console.log('Imported module');
export default 23;
```

On index.js file add:

```javascript
import num from './test'

console.log(`I imported ${num} from another module!`);
```

The ```export default 23``` is the value that is recieved when you import the module on index.js. When you import the module the code it's executed and if something is export that value is returned.

The keyword ```default``` is used when you only want to export one thing and then in the import you can omit the {}.

Let's put an example of a multiple exports/import:

```javascript
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 23;
```

If you want to import only add and multiply:

```javascript
import {add, multiply} from './test'
```

If you want to use different names you can create an alias:

```javascript
import {add as a, multiply as m, ID} from './test'
```

Theres also a third way to do the import, import all from a module, here is how to import and use it:

```javascript
import * as searchView from './test'

console.log(`The add: ${searchView.add}, the multiply: ${searchView.multiply}, the ID: ${searchView.ID}.`);
```

## [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

The local storage it's a function that is located on the window object which allows to store key value pairs, key value must be always strings in the local storage. The localStorage has no expiration time.

### Add items

```javascript
localStorage.setItem('id', 'test');
```

## Retrieve items

```javascript
localStorage.getItem('id');
// Output: "test"
```

## Remove item

```javascript
localStorage.removeItem('id');
```

## Clear all items

```javascript
localStorage.clear();
```

## Copying values (safely)

```javascript
let number = 1;
let newNumber = number;

number = 2;

console.log(newNumber);
// Output: 1
```

With the primitive values (numbers, strings, booleans, null, bigint, undefined and symbol) when one variable is assigned to another, creates a copy of that value.


```javascript
let myObject = { val: 1 };
let myNewObject = myObject;

myObject.val = 2;

console.log(myNewObject.val);
// Output: 2
```

With no primitive values (like Objects and Arrays) when one "variable" is assigned to another, creates a pointer of that reference in memory, for that, when the value is mutated, the pointer sees that change.

In order to prevent that, we can safe copy with spread operator.

```javascript
let myObject = { val: 1 };
let myNewObject = { ...myObject };
// let myNewObject = { val: myObject.val };

myObject.val = 2;

console.log(myNewObject.val);
// Output: 1
```

Note that the key in this is not the spread operator, we create a new object and spread the properties of ```myObject``` in it. In the commented line you can already see another way of doing it without spread operator, and works too.

---

## ES7

### Classes without constructors

```javascript
class Person {
    name = 'test',
    age = 30

    getName = () => this.name;
}
```

In ES7 you can write classes without a constructor (and that implies no super method is needed either) putting the atributes outside of the constructor scope. Is common see the notation of arrow functions for functions inside of the class in order to prevents problems with the ```this``` keyword.

---

## Install and use NodeJs portable

### Set System Variables

In the cmd type ```set PATH=%PATH%;yourNodejsPath;yourNPMPath```

Check that returns the version

```bash
node -v
npm -v
```

## Create package.json

Use the following command on your project folder: ```npm init```

You can specify the package name, version, description, author, etc.

## Init project from an existing package.json

If node_modules are not present type ```npm install`` on the root folder of your project.

## Install dependencies

Use the following command on your project folder: ```npm install dependencyName --save-dev```

In your package.json a development dependency is added.

```json
"devDependencies": {
    "dependencyName": "^4.37.0"
  }
```

* If you dont use -dev it will installed as a dependencies instead of devDependencies. The devDependencies are not installed when a production npm install is done.
* If you use ```--global``` the dependency will be available for other projects.

## Uninstall dependencies

Use the following command on your project folder: ```npm uninstall dependencyName --save-dev```

In your package.json a development dependency is removed.

```json
"devDependencies": {}
```

---

## [Webpack](https://webpack.js.org/concepts/)

## Install webpack

In your root folder of your project type:

```bash
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

## Configure webpack

Webpack 4+ does not require a configuration file, but you can set up custom config file named ```webpack.config.js``` located in your project root folder.

An example below:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};
```

The main attributes of the object module.exports are:

* entry: Defines your main .js file. By default webpack search index.js in the root folder.
* output: Defines where goes your final product.
  * path: The path of the final product, it must be an absolute route, for this you can use the built-in feature path.
  * filename: The name of the final product.
* loaders: Allows to import all kinds of diferents of files and process it.
* plugins: Allows to do complex processing of our input files.

## Scripts

In the package.json theres a section of scripts, there you can define diferent scripts which can be used with ```npm run scriptName```

```json
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```

Here you can se an example of a dev run and a production run, the difference in the mode parameters is production minifies the code, for development propouses development mode is faster to run.

## Webpack Dev Server

Webpack development server is useful for autorefresh the browser when the code changes.

First install the dependency with ```npm install webpack-dev-server --save-dev```

And add to your package.json the following lines:

```json
"start": "webpack-dev-server --mode development --open"
```

This will start the dev server in the default browser.

With ```HtmlWebpackPlugin``` we can copy our HTML files automatically into our final folder each time we save the project.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

...

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
```

---

## [Babel](https://babeljs.io/docs/en/)

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

### Install Babel

Run the following commands:

```bash
npm install babel-core babel-loader babel-preset-env --save-dev
npm install babel-polyfill --save
```

Polyfill will transform features that are missing in your target environment, this is needed on the final product, for this, don't add as a development dependency.

### Config Babel

Create a ```.babelrc``` file in your project root folder with the following settings:

```javascript
{
    "presets": [
        ["env", {
            "targets": {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}
```

The preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms.

## [Node.js](https://nodejs.org/en/docs/)

Node.js is a run-time environment for running Javascript outside of the browser with the support of the V8 Google.

### Load Modules

In Node.js each file (*.js) is treated as a separate module. In order to load the module we use

```javascript
const http = require('http');
```

### Create the server

For mantain the server listening needs a port and an IP

```javascript
server.listen(1337, '127.0.0.1', () => {
    console.log('Start listening');
});
```

Then when the server recieves a request we can send a reponse code and a response data, always with a header first

```javascript
const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end('knock knock');
});
```

### Routing

For create a simple routing system we will use the URL module

```javascript
const url = require('url');

const server = http.createServer((request, response) => {
    const pathName = url.parse(request.url, true).pathname;
    const id = url.parse(request.url, true).query.id;
    console.log(url.parse(request.url, true));

    if (pathName === '/products' || pathName === '/') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end('This is the PRODUCTS page');
    } else if (pathName === '/laptop' && (!id || id < laptopData.length)) {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(`This is the LAPTOP page ${id ? `for laptop ${id}` : ''}`);
    } else {
        response.writeHead(404, { 'Content-type': 'text/html' });
        response.end('URL not found on the server');
    }
});
```

With the URL module we can parse de URL in the request to retrieve the pathname and the entire query. With the pathname you can manage the workflow of your webpage.
