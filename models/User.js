const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    password: {
        type: String,
        select: false
    },
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    githubProfile: {
        type: String,
        required: false
    },

    languages: [{
        type: String,
        required: true
    }]
})