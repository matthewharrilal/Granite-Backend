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
        type: Schema.Types.ObjectId
    },
    updatedAt: {
        type: Date
    }
})

LocationSchema.pre("save", function (next) {
    const now = new Date()

    this.updatedAt = now

    if !(this.updatedAt) {
        this.updatedAt = now
    }
})


module.exports = mongoose.model("Location", LocationSchema);