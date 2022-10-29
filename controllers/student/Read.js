const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require("../Wrap");

module.exports = async(req, res) => {
    try {
        let size = 0;
        const students = (await StudentModel.find().populate('Courses')).map(student => {
            size++;
            return Wrap.Student(student);
        });

        res.status(200).json({ size, code: 200, message: "All students received successfully!", students });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};