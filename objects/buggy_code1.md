The code will raise a reference error because because there are no identifiers name `morning`, `name`, `afternoon`, or `evening` in scope in the switch statement. In order to fix this, append `this.` to each of the aformentioned identifiers. This will allow that code to reference the appropriate properties of the object when the method is invoked.

Further Exploration:
- This works because the `name` variable that is part of the `createGreeter` function is still in scope as part of the `greet` method's binding.
