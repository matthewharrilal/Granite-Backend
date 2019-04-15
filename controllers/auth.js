const User = require("../models/User");
const jwt = require('jsonwebtoken');

function createToken(user) {
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
};

module.exports = function (server) {
    // Route hit when user signs up
    server.post("/signup", function (req, res) {
        console.log("User has requested to sign up")

        // If the password confirmation stage is successful on the user behalf
            const user = new User(req.body)

            user.save()
            .then(user, function () {
                var token = createToken(user)

                console.log("This is the token created " + token) 
            });
    });
}