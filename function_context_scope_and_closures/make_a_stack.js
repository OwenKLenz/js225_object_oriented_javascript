// Make a Stack

function newStack() {
  let theStack = [];
  return {
    push(value) {
      theStack.push(value);  
      return theStack.length;
    },

    pop() {
      return theStack.pop();
    }, 

    printStack() {
      console.log("The Stack:");
      theStack.forEach(value => console.log(value));
    },
  };
}

let myStack = newStack();

console.log(myStack.push('hello'));
console.log(myStack.push('goodbye'));
console.log(myStack.push('wtf?'));
console.log(myStack.pop('wtf?'));
myStack.printStack();
