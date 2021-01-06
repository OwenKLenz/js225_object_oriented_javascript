// Our Very Own Bind()

function myBind(func, context) {
  return function(...args) {
    return func.call(context, ...args); 
  }
}

let myOb = {
  name: 'Fred',
}

function sayName(firstName, lastName) {
  console.log(`Hi ${firstName} ${lastName}! My name is ${this.name}.`);
}

let myFunc = myBind(sayName, myOb);

myFunc("Joe", "Schmoe");
