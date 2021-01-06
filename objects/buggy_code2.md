# Buggy Code 2

Here we're reassigning the price property of the `item` object to the new discounted value each time `discount` is called. In order to avoid this it would be better to simply return the discounted price `this.price - discount` instead of modifying the `price` property of the `item` object.
