const SendError = require('../../errors');
const CourseModel = require('../../models/Course');
const StudentModel = require("../../models/Student");
const Wrap = require('../Wrap');
const Update = require('../student/Update');

module.exports = async(req, res) => {
    try {
        const { studentid } = req.params;
        const { name, id, grade } = req.body;
        const student = await StudentModel.findOne({ ID: studentid }).populate('Courses');
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }
        if (student.Courses.find(course => course.ID === id || course.Name === name)) {
            const error = new Error("Cannot add a course that already exists!");
            error.code = 403;
            SendError(error, res);
            return;
        }

        const course = new CourseModel({
            Name: name.trim(),
            ID: Number(id),
            Grade: Number(grade)
        });
        await course.save();

        student.Courses.push(course);
        await Update(student);
        res.status(200).json({ message: 'Course addedd successfully!', code: 200, ...Wrap.Course(course) });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res)
    }
};