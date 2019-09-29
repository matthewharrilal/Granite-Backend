const express = require('express');
const server = express();
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const User = require("./models/User");
const bodyParser = require("body-parser");
const Auth = require("./controllers/auth");
const Location = require("./controllers/location");
const expressValidator = require("express-validator");
const JSON = require("circular-json")
const jwt = require('jsonwebtoken');


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

var checkAuth = (req, res, next) => {
    console.log("Checking authentication " + JSON.stringify(req.headers))

    if (typeof req.headers.cookie === "undefined" || req.headers.cookie === null) {
        console.log('User is null')
        req.user = null;
    } else {
        var token = req.headers.cookie.slice(7, req.headers.cookie.length );
        console.log('This is the token present on the request ' + token)
        var decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        console.log('This is the decoded JWT token user ' + JSON.stringify(decodedToken.payload))
        req.user = decodedToken.payload;
        res.locals.user = req.user // Every request has this middleware with it therefore every request has a scope to the local properties such as the user
    }

    next();
}

server.use(checkAuth)
Auth(server);
Location(server);

server.get("/", (req, res) => {
    console.log("Hello World")
})

server.listen(3000, function () {
    console.log("Listening on port 3000")
});

module.exports = server