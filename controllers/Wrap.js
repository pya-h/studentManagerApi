// returning the object obtained from database, may contain some unwanted fields (like _v); this two methods defined below, are for :
// 1.converting the database object to normal js object
// 2.return exactly what is expected
const Course = course => {
    return {
        name: course.Name,
        id: course.ID,
        grade: course.Grade
    }
};

const Student = (student) => {
    const result = {
        studentid: student.ID,
        average: student.Average,
        last_updated: student.LastUpdated,
        Courses: student.Courses.map(course => Course(course))
    };
    return result;
}

const Wrap = { Student, Course };

module.exports = Wrap;