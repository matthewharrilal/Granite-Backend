const Location = require("../models/Location");
const JSON = require("circular-json");

module.exports = function (server) {


    server.post("/location", function (req, res) {

        const location = new Location(req.body)
        // console.log("User wants to post location " + req.user._id)
        location.userID = req.user._id

        var locationsQuery = async () => {
            const locations = Location.deleteMany({userID: req.user._id})
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
}