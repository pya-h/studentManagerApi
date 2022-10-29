module.exports = async student => {
    //average
    let sum = 0,
        num = 0;
    for (const course of student.Courses) {
        sum += course.Grade;
        num++;
    }
    student.Average = sum / num;
    student.LastUpdated = new Date();
    await student.save();
}