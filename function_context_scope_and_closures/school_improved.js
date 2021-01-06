let school = function() {
  let students = [];
  const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    student.courses.find(course => course.course === courseName);
  }

  return {
    addStudent(name, year) {
      if (VALID_YEARS.includes(year)) {
        let newStudent = createStudent(name, year);
        students.push(newStudent);
        return newStudent;
      } else {
        console.log('invalid year');
      }
    },

    getStudent(name) {
      return students.find(student => student.name === name);
    },

    enrollStudent(name, courseName, code) {
      let student = this.getStudent(name);
      student.addCourse({course: courseName, code, grade: "In Pogress"})  
    },

    addGrade(name, grade, courseName) {
      let student = this.getStudent(name);
    
      let course = getCourse(student, courseName);
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

      students.forEach(student => {
        if (student.isEnrolled(courseName)) {
          let name = student.name;
          let course = getCourse(student, courseName);
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
      return !students.find(student => student.isEnrolled(name));
    },
  };
}();
