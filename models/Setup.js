const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/students";

exports.ConnectToDataBase = () => {
    return mongoose.connect(connectionString);
};