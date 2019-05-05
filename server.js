const express = require('express');
const server = express();
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const User = require("./models/User");
const bodyParser = require("body-parser");
const Auth = require("./controllers/auth");
const expressValidator = require("express-validator")

mongoose.Promise = global.Promise // What is the exact signifigance of this operation?

mongoose.connect(
    "mongodb://localhost/granite-db", {
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

server.use(expressValidator())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())
server.use(cookieParser())



Auth(server);

server.get("/", (req, res) => {
    console.log("Hello World")
})

server.listen(3000, function () {
    console.log("Listening on port 3000")
});

module.exports = server