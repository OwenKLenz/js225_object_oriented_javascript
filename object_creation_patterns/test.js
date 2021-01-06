function One() {
}

One.prototype.sayHi = function () {console.log('hi')};
One.sayHI = function () {console.log('HI!')};


function Two() {}

Two.prototype = Object.create(One.prototype);
Two.__proto__ = One;
Two.sayHI();

let two = new Two();

// two.sayHi();

class A {
  static sayHI() {
    console.log('HI!');
  }
}

class B extends A {

}

// A.sayHI();
// B.sayHI();
