const SendError = require("../../errors");
const StudentModel = require("../../models/Student");
const Wrap = require('../Wrap');

module.exports = async(req, res) => {
    try {
        let { studentid } = req.body;
        studentid = Number(studentid);

        if (!studentid || isNaN(studentid)) {
            const error = new Error("This student id is not valid!")
            error.code = 403;
            SendError(error);
            return;
        }

        const found = await StudentModel.findOne({ ID: studentid });
        if (found) {
            const error = new Error("This student id is taken.");
            error.code = 403;
            SendError(error, res);
            return;
        };

        let student = new StudentModel({ ID: studentid, LastUpdated: new Date() });
        await student.save();
        res.status(200).json({...Wrap.Student(student), code: 200, message: "student added successfully!" });
    } catch (err) {
        err.code = 500;
        console.log(err);
        SendError(err, res);
    }
};