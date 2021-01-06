// Anonymizer

const Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function anonymize() {
    const LETTERS_NUMBERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let displayName = '';

    for (let count = 1; count <= 16; count++){
      let randomNumber = Math.floor(Math.random() * LETTERS_NUMBERS.length);
      displayName += LETTERS_NUMBERS[randomNumber];
    }

    return displayName;
  }

  function checkPasswordThenDoAThing(password, thing) {
    if (password === userPassword) {
      return thing();
    } else {

      return "Invalid Password";
    }
  }

  return {
    init(userEmail, userPassword, userFirstName, userLastName) {
      this.resetPassword = function (password, newPassword) {
        checkPasswordThenDoAThing(password, function() {
          userPassword = newPassword;
          return true;
        });
      };

      this.displayName = anonymize();

      this.firstName = (password) => checkPasswordThenDoAThing(password, () => userFirstName);

      this.lastName = (password) => checkPasswordThenDoAThing(password, () => userLastName);

      this.email = (password) => checkPasswordThenDoAThing(password, () => userEmail);

      this.reanonymize = function(password) {
        return checkPasswordThenDoAThing(password, function() {
          this.displayName = anonymize();
          return true;
        }.bind(this));
      };

      return this;
    }
  };
})();

// const fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// const displayName = fooBar.displayName;
// console.log(displayName === fooBar.displayName);   // logs false
// console.log(fooBar.displayName);

console.log(Account);

const owenObject = Object.create(Account).init('owen@lenz.com', 'passWord', 'owen', 'lenz');
console.log(owenObject.firstName('passWord'));
console.log(owenObject.lastName('passWord'));
console.log(owenObject.email('passWord'));
console.log(owenObject.displayName);
console.log(owenObject.reanonymize('passWord'));
console.log(owenObject.displayName);

console.log(owenObject.resetPassword('passWord', 'ostrich')); //true
console.log(owenObject.reanonymize('passWord')); // Invalid Passowrd
console.log(owenObject.displayName);

// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(owenObject.firstName('passWord'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(owenObject.firstName('password'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(owenObject.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
// console.log(owenObject.resetPassword('passWord', 'ABC')) // logs true
// console.log(owenObject.password);

// fooBar.reanonymize('abc');                         // returns true
// console.log(owenObject.displayName);
// console.log(fooBar.displayName);
