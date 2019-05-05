const User = require("../models/User");
const jwt = require('jsonwebtoken');

function createToken(user, res) {

    // Pass in response so cookie can be written onto it
    // Cookie instantiation for the user
    var token = jwt.sign({
        _id: user._id,
        admin: false
    }, "test", {
        expiresIn: "60 days"
    });
    res.cookie('nToken', token, {
        maxAge: 900000,
        httpOnly: true
    });

    return token
};

// TODO: MODULARIZING QUERYING FOR USER
// function queryUser(username) {
//     // Query for a given user

//     const userQuery = User.findOne({
//         "username": username
//     }, function (err, user) {
//         if (err) {

//             return err
//         }
//         console.log("USER => ", user)
//     })

//     return new Promise(function (resolve, reject) {
//         resolve(userQuery)
//     });

// }

module.exports = function (server) {
    // Route hit when user signs up
    server.post("/signup", function (req, res) {
        console.log("User has requested to sign up")

        // If the password confirmation stage is successful on the user behalf
        const user = new User(req.body)
        console.log("USER -> ", req.body)

        user
            .save()
            .then((user) => {
                var token = createToken(user, res)

                console.log("This is the token created " + user)
                res.sendStatus(201)
                res.send(user)
            })
            .catch(function (err) {
                console.log("ERRRR --> ", err)
                return res.status(400)
                    .send({
                        err: err
                    })
            });
    });

    // POST in the sense that we are sending data not accessing through request body
    server.post("/login", function (req, res) {
        const username = req.headers.username
        const password = req.headers.password


        console.log(req.headers)
        // Find the user first
        User.findOne({
                "username": username
            }, function (err, user) {
                if (err) {
                    console.log("Err finding user ", user)
                }
            })
            .then(function (user) {
                // Once we have the user that returned from the query operation
                console.log("Found user --> ", user)

                user.comparePassword(password, function (err, isMatch) {
                    if (!isMatch) {
                        console.log("Passwords do not match")
                        // If the two passwords do not match
                        return res.status(401)
                            .send({
                                err: "Wrong username or password"
                            });
                    }
                    createToken(user, res)
                    res.send(user)
                    // Once we hvae created the token what can we proceed to do
                })
            });

    });
}