# The Franchise

The problem here is the fact that a function nested within another function as the callback passed to `map` is (it's nested in `allMoves`) has an execution context of the global object, `this.name` resolves to `undefined`.

To fix this, we can supply an explicit execution context for the function of the `franchise` object, or we can set `name` to be an in scope variable defined either in the global scope or within the allMovies function.

Or, better idea... We can assign a variable named `self` to the execution context of the `allMovies` method with `let self = this`. Then the self variable will be lexically in scope within the anonymous function.

Also don't forget about the way that arrow functions inherit their execution context lexically.

```js
const franchise = {
  allMovies() {
    let name = 'How to Train Your Dragon';
    return [1, 2, 3].map(function(number) {
      return `${name} ${number}`;
    });
  },
};
```
