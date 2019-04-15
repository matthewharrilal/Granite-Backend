const User = require("../models/User");
const jwt = require('jsonwebtoken');

function createToken(user, res) {

    // Pass in response so cookie can be written onto it
    // Cookie instantiation for the user
    var token = jwt.sign({
        _id: user._id,
        admin: false
    }, process.env.SECRET, {
        expiresIn: "60 days"
    });
    res.cookie('nToken', token, {
        maxAge: 900000,
        httpOnly: true
    });

    return token
};

function queryUser(username) {
    // Query for a given user
    User.findOne({"username": username}, function(err, user) {
        if (err) {
            
            return err
        }

        return user
    })
}

module.exports = function (server) {
    // Route hit when user signs up
    server.post("/signup", function (req, res) {
        console.log("User has requested to sign up")

        // If the password confirmation stage is successful on the user behalf
            const user = new User(req.body)

            user.save()
            .then(user, function () {
                var token = createToken(user, res)

                console.log("This is the token created " + token) 
                res.send(201)
            });
    });

    // POST in the sense that we are sending data not accessing through request body
    server.post("/login", function(req, res) {
        const username = req.headers.username
        const password = req.headers.password

        // Find the user first
        queryUser(username)
        .then(user, function () {
            // Once we have the user that returned from the query operation
            user.comparePassword(password, function(err, isMatch) {
                if (!isMatch) {
                    // If the two passwords do not match
                    return res.status(401)
                    .send({err: "Wrong username or password"});
                }
                createToken(user, res)
            })
        });

    });
}
