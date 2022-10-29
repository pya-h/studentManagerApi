const path = require("path");
const express = require("express");
const { setHeaders } = require("./middlewares/headers");
const { ConnectToDataBase } = require("./models/Setup");
const studentRoutes = require("./routes/Student");
const courseRoutes = require("./routes/Course");

const app = express();
//──── Server Port
const port = process.env.PORT || 4000;

//──── Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setHeaders);

//──── Routes
app.use('/', studentRoutes);
app.use('/', courseRoutes);

//──── Connecting To Database
ConnectToDataBase()
    .then(result => {
        console.log(`Connected To Database`);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });