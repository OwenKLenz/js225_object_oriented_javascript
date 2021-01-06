// myBind() Improved (myBim)
function myBind(func, context, ...partialArgs) {
  return function(...args) {
    return func.apply(context, [...partialArgs, ...args]); 
  }
}

let myArr = [100, 12, 19, 'shccese'];
let unshiftWithSplice = myBind(Array.prototype.splice, myArr, 0, 0);

unshiftWithSplice(1,2, 3, 4, 5);

console.log(myArr);

