const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require("../Wrap");
const Update = require("../student/Update");

module.exports = async(req, res) => {
    try {
        let { studentid, courseid } = req.params;
        let { id, name, grade } = req.body;
        name = name.trim();
        id = Number(id);
        courseid = Number(courseid);
        grade = Number(grade);

        const student = await StudentModel.findOne({ ID: studentid }).populate("Courses");
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }

        const course = student.Courses.find(c => c.ID === courseid);
        if (!course) {
            const error = new Error("This student has no course with such id!");
            error.code = 404;
            SendError(error, res);
            return;
        }
        let change = "";

        if (grade !== course.Grade)
            change += "grade";
        if (name !== course.Name)
            change += (change ? " and " : "") + "name";
        if (id !== course.ID)
            change += (change ? " and " : "") + "id";

        if (!change) {
            const error = new Error("The course data you entered is exactly like before!");
            error.code = 403;
            SendError(error, res);
            return;
        }
        // check if new id or name has not been taken by other course
        if (id !== course.ID) {
            if (student.Courses.find(course => course.ID === id)) {
                const error = new Error("The new course id you entered is taken by another course in this student\'s course list!");
                error.code = 403;
                SendError(error, res);
                return;
            }
        }
        if (name !== course.Name) {
            if (student.Courses.find(course => course.Name === name)) {
                const error = new Error("The new course name you entered is taken by another course in this student\'s course list!");
                error.code = 403;
                SendError(error, res);
                return;
            }
        }
        // course is obtained by reference
        // so any change in course object, will also happen in student object (as parent object of the student.Courses objects)
        course.Name = name;
        course.ID = id;
        course.Grade = grade;
        await course.save();
        await Update(student);
        res.status(200).json({...Wrap.Course(course), code: 200, message: `${change} updated successfully!` });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};