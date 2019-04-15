const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

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
});

UserSchema.pre("save", function (next) {
    const now = new Date()

    this.updatedAt = now // If the user schema is being called in anyway update the time its been called

    if (!this.createdAt) {
        this.createdAt = now // If the schema object is being created for the first time
    }

    // HASHING OF USER PASSWORD 
    const user = this;
    if (!user.isModified('password')) { // If the user hasn't modified password return callback
        return next() 
    }

    // Go through ten rounds of password salting 
    bcrypt.genSalt(10, function (err, salt) {
        // Hash users password with the given salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash // Updates the plain password to be the hashed form
            next() // Return method callback
        });
    });

});