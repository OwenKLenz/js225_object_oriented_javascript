// Don't Pollute My Window

let greeter = (function() {
  const name = 'Naveed';
  const greeting = 'Hello';

  return {
    message: `${greeting} ${name}!`,

    sayGreetings() {
      console.log(this.message);
    }
  };
})();

greeter.sayGreetings();

// console.log(name); // Error
// console.log(greeting); // Error
