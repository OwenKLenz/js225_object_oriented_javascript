# What is This

outside of functions, the execution context (`this`) always resolves to the global object, so `this.firstName` and `this.lastName` will return undefined (or an error in strict mode) and undefined + undefined is `NaN`.
