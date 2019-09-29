
module.exports = function (server) {
    server.post("/location", function (req, res) {
        console.log("User wants to post location")
    })
}