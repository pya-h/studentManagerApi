const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require("../Wrap");

module.exports = async(req, res) => {
    const { studentid } = req.params;
    try {
        const student = (await StudentModel.findOne({ ID: studentid }).populate('Courses'));
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }

        res.status(200).json({ code: 200, message: "All courses received successfully!", ...Wrap.Student(student) });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};