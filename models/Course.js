const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    Name: {
        type: String,
        required: true,
        min: 3
    },
    ID: {
        type: Number,
        default: 0,
    },
    Grade: {
        type: Number,
        required: false,
        min: 0.0,
        max: 20.0,
        default: 0
    },
});

module.exports = mongoose.model('Course', CourseSchema);