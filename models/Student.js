const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    Average: {
        type: Number,
        default: 0.0
    },
    LastUpdated: {
        type: String,
        default: new Date()
    },
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Student', StudentSchema);