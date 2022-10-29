const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const CourseModel = require('../../models/Course');

const Wrap = require("../Wrap");
const Update = require("../student/Update");

module.exports = async(req, res) => {
    try {
        let { studentid, courseid } = req.params;
        studentid = Number(studentid);
        courseid = Number(courseid);

        const student = await StudentModel.findOne({ ID: studentid }).populate("Courses");
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }
        console.log(student);
        console.log("courseid = ", courseid);

        const course = student.Courses.find(c => c.ID === courseid);
        if (!course) {
            const error = new Error("This student has no course with such id!");
            error.code = 404;
            SendError(error, res);
            return;
        }
        const removedCourseInfo = Wrap.Course(course);
        student.Courses = student.Courses.filter(c => c.ID !== courseid);
        await CourseModel.findByIdAndRemove(course._id);
        await Update(student);
        res.status(200).json({...removedCourseInfo, code: 200, message: "course deleted successfully!" });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};