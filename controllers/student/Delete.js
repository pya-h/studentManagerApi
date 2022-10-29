const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require("../Wrap");

module.exports = async(req, res) => {
    try {
        let { studentid } = req.params;
        studentid = Number(studentid);

        const student = await StudentModel.findOne({ ID: studentid });
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }
        const removedStudentInfo = Wrap.Student(student);
        student.LastUpdated = new Date(); // last update => deleting it!
        await student.save();
        await StudentModel.findOneAndRemove({ ID: studentid });
        res.status(200).json({...removedStudentInfo, code: 200, message: "student deleted successfully!" });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};