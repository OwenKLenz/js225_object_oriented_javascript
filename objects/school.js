// School

let school = {
  students : [],
  addStudent(name, year) {
    const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
    
    if (VALID_YEARS.includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('invalid year');
    }
  },

  getStudent(name) {
    return this.students.find(student => student.name === name);
  },

  enrollStudent(name, courseName, code) {
    let student = this.getStudent(name);
    student.addCourse({course: courseName, code, grade: "In Pogress"})  
  },

  addGrade(name, grade, courseCode) {
    let student = this.getStudent(name);

    let course = student.courses.find(course => course.code === courseCode);
    if (course) {
      course.grade = grade;
    }
  },

  getReportCard(name) {
    let student = this.getStudent(name);
    student.courses.forEach(course => {
      console.log(`${course.course}: ${course.grade}`);
    });
  },

  courseReport(courseName) {
    let courseGrades = [];
    if (this.courseDoesntExist(courseName)) {
      return;
    }

    console.log(`=${courseName} Grades=`);
    this.students.forEach(student => {
      if (student.isEnrolled(courseName)) {
        let name = student.name;
        let course = student.courses.find(course => course.course === courseName);
        let grade = course.grade;

        if (typeof grade === 'number') {
          courseGrades.push(grade);
        }

        console.log(`${name}: ${grade}`);
      }
    });

    let courseAverage = Math.round(courseGrades.reduce((sum, grade) => sum + grade) / courseGrades.length);

    console.log(`Course Average: ${Math.round(courseAverage)}`);
  },

  courseDoesntExist(name) {
    return !this.students.find(student => student.isEnrolled(name));
  },
};

console.log(school.addStudent('Fred', '1st'));
console.log(school);
console.log(school.addStudent('Bread', '6th'));
school.enrollStudent('Fred', 'Math', 101);
school.enrollStudent('Fred', 'Science', 105);
school.enrollStudent('Fred', 'Music', 106);
console.log(school.students[0].courses); // ['Math']
school.addGrade('Fred', 91, 101);
school.addGrade('Fred', 58, 105);
console.log(school.students[0]);
school.getReportCard('Fred');
console.log(school.students[0].isEnrolled('Math'));
school.addStudent('Gertrude', '4th');
school.enrollStudent('Gertrude', 'Math', 101);
school.addGrade('Gertrude', 92, 101);
school.getReportCard('Gertrude');
school.courseReport('Math');

// LS Tests

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects

// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
//   = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
//   = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(this.name + ' is a ' + this.year + ' year student');
    },

    listCourses() {
      console.log(this.courses);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      let course = this.courses.find(course => course.code === code);

      if (course) {
        if (course.note) {
          course.note = course.note.concat('; ' + note);
        } else {
          course.note = note;
        }
      } else {
        console.log(`Course ${code} not found.`);
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      });
    },

    updateNote(code, newNote) {
      let course = this.courses.find(course => course.code === code);
      if (course) {
        course.note = newNote;
      }
    },

    isEnrolled(courseName) {
      return !!this.courses.find(course => course.course === courseName);
    },
  };
}
