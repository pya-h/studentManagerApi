const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require("../Wrap");

module.exports = async(req, res) => {
    try {
        const { studentid } = req.params;
        const { studentid: newID } = req.body;

        const student = await StudentModel.findOne({ ID: studentid });
        if (!student) {
            const error = new Error("No such student!");
            error.code = 404;
            SendError(error, res);
            return;
        }

        if (!newID || isNaN(newID)) {
            const error = new Error("Your new student id is not valid!")
            error.code = 403;
            SendError(error, res);
            return;
        }
        student.ID = newID;
        student.LastUpdated = new Date();
        await student.save();
        res.status(200).json({...Wrap.Student(student), code: 200, message: "student id changed successfully!" });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};