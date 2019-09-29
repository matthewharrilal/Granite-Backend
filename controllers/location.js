module.exports = function (server) {
    server.post("/location", function (req, res) {
        console.log("User wants to post location")

        const location = new Location(req.body)

        location.save()
            .then((location) => {
                console.log("Location that has been saved " + location)
                res.status(201)
                res.send(location)
            })

            .catch(function (err) {
                return res.status(409)
                    .send({
                        err
                    })
            })
    })
}