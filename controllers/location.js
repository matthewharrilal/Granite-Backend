const Location = require("../models/Location");
const User = require("../models/User");
const JSON = require("circular-json");

module.exports = function (server) {

    // Change this to PATCH
    server.post("/location", function (req, res) {

        const location = new Location(req.body)
        // console.log("User wants to post location " + req.user._id)
        location.userID = req.user._id

        var locationsQuery = async () => {
            const locations = Location.deleteMany({
                userID: req.user._id
            })
            await locations.exec()
        }

        locationsQuery()


        location.save()
            .then((location) => {
                console.log("Location that has been saved " + location)
                res.status(201)
                res.send(location)
            })

            .catch(function (err) {
                console.log("ERRRRR -------->>>> " + err)
                return res.status(409)
                    .send({
                        err
                    })
            })
    })

    server.get("/location", function (req, res) {
        // Need to fetch the location document corresponding to the user id return that and the user object corresponding

        var locationsQuery = async () => {
            const location = Location.findOne ({
                userID: req.user._id
            })
            await location.exec()
            return location
        }

        var userQuery = async () => {
            const user = User.findById(req.user._id);
            await user.exec()
            return user
        }

        locationsQuery().then(function (location) {
            userQuery().then(function (user) {
                res.send({
                    location,
                    user
                })
            })
        })



    })
}