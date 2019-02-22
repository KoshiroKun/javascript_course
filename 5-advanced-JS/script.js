// Function constructor

// Simple Object
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// Object constructor
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// Inhiterance - Better this way than in the constructor, the code isn't repeated in each construction
Person.prototype.calculateAge = function () {
    console.log(2018 - this.yearOfBirth);
};

// This works with attributes too
Person.prototype.lastName = 'Smith';

// Instance a new empty Person object and fill it with the values
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName, jane.lastName, mark.lastName);

console.log(john.hasOwnProperty('name')); // The name is in his own properties
console.log(john.hasOwnProperty('lastName')); // The last name is inherited
console.log(john instanceof Person); // John is an instance of Object (in this case, class) Person
console.log(john.__proto__ === Person.prototype) // The __proto__ attribute of john is actually the prototype attribute of the Object Person
// All Custom Objects (like the Person) inherits from the Object Class

console.log('==========================================================');

// Object.create
var personProto = {
    calculateAge: function() {
        console.log(2018 - this.yearOfBirth);
    }
};

// This creates an empty object wich his __proto__ attribute is the personProto blueprint
var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

// Another way of doing this, is using the second parameter of create which allows the data
var jane = Object.create(personProto, 
    {
        name: { value: 'Jane' },
        yearOfBirth: { value: 1969 },
        job: { value: 'designer' } 
    });

console.log(john);
console.log(jane);
// Object.create is usefull for create complex inhiterance models
console.log('==========================================================');

// Primitives vs Objects

// Primitives - They hold a real copy of the data
var a = 23;
var b = a;
a = 46;

console.log(a, b); // Because they have a real copy of the data, mutate one variable does not affect the other

// Objects - They hold a reference to the data
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age, obj2.age); // obj2 is pointing at the same reference than obj1 for that if you mutate obj1, obj2 changes too

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age, obj.city); // Primitive has not been efected by the changes inside the function but the object yes, because you are not passing the object, you are passing the reference
console.log('==========================================================');

// Passing functions as arguments

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    return el >= 18 && el <= 81 ? Math.round(206.9 - (0.67 * el)) : -1;
}

// Passing the function as value does not use the ()
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);
console.log('==========================================================');

// Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please expplain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

// Now the reference to the function is stored in the variable
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Jane');
teacherQuestion('Mark');

// This works because is evaluated from left to right and interviewQuestion returns a function
interviewQuestion('designer')('Jane');
console.log('==========================================================');

// IIFE - Immediately-Invocked Function Expression

// Without IIFE - Create a function and call it
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

// With IIFE - For JS everthing inside of a parentesis can not be a declaration, it must be an expression
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

// IIFE with parameters
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);
console.log('==========================================================');

// Clousures

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function (yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

// Even the outer function finishes the inner function has access to the variables and parameters of the outer function
var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

var yearOfBirth = 1990;
retirementUS(yearOfBirth);
retirementGermany(yearOfBirth);
retirementIceland(yearOfBirth);

//retirement(66)(yearOfBirth);

// Clousures version - Only one function needed because now we know job is accesible by the inner function
function interviewQuestion(job) {
    return function (name) {
        if (job === 'designer') {
            console.log(name + ', can you please expplain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('teacher')('John');
console.log('==========================================================');

// Bind, call and apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', ladies and gentleman! I\'m ' + this.name +
            ' , I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name +
            ' , I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' +
            timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

// With call method we can set the this variable and borrow the method from John to Emily
john.presentation.call(emily, 'friendly', 'afternoon');

// Similar to call but with an array of arguments for the function
//john.presentation.apply(emily, ['friendly', 'afternoon']);

// Bind creates a copy of the function with the parameters attached
var johnFriendly = john.presentation.bind(john, 'friendly');

// Now only needs the last parameter because we set the others before
johnFriendly('morning');
johnFriendly('night');

// This is called carrying - Create a function based on other function with preset parameters
var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


var years = [1990, 1965, 1937, 2005, 2000];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
// We want to pass a custom limit age for isFullAge function, bind will pass a copy of the function with preset 20 value
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);
console.log('==========================================================');