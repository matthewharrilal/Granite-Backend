const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const LocationSchema = new Schema({
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    // updatedAt: {
    //     type: Date
    // }
})

// LocationSchema.pre("save", function() {
//     // Delete all documents by the user id before posting the new location
// })


module.exports = mongoose.model("Location", LocationSchema);
