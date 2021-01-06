function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

Person.prototype.communicate = function() {
  console.log('Communicating');
}

Person.prototype.sleep = function() {
  console.log("Sleeping");
}

Person.prototype.eat = function() {
  console.log("Eating");
}

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Object.defineProperty(Doctor.prototype, 'constructor', { writable: false, value: Doctor });

Doctor.prototype.diagnose = function() {
  console.log("Diagnosing");
}

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Object.defineProperty(Professor.prototype, 'constructor', { writable: false, value: Professor })

Professor.prototype.teach = function () {
  console.log("Teaching");
}

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student.prototype, 'constructor', { writable: false, value: Student });

Student.prototype.study = function () {
  console.log("Studying");
}

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
Object.defineProperty(GraduateStudent.prototype, 'constructor', { writable: false, value: GraduateStudent });

GraduateStudent.prototype.research = function () {
  console.log("Researching");
}

professional = {
  invoice() {
    console.log(`${this.fullName()} is Billing customer`);
  },

  payTax() {
    console.log(`${this.fullName()} Paying Taxes`);
  },
}

function delegate(object, functionName, ...args) {
  return function() {
    object[functionName](...args);
  }
}

function extend(object, mixin) {
  let prototype = Object.getPrototypeOf(object);

  Object.keys(mixin).forEach(methodName => {
    prototype[methodName] = function (...args) {
      mixin[methodName].call(this, ...args);
    }
  });

  return object;
}

const doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'S
doctor.diagnose();                         // logs 'Diagnosing'

const professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function(stuff) {
  console.log(`${this.fullName()} is Asking customer to pay`);
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice('hello');                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'
