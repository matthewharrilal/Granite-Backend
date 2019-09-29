const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    password: {
        type: String
        // select: true // Not going to be returned in the query results of this model
    },
    username: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },

    githubProfile: {
        type: String,
        required: false,
        unique: true, // Every github profile is unique
        sparse: true
    },

    twitterProfile: {
        type: String,
        required: false,
        unique: true, // Every github profile is unique
        sparse: true
    },

    mediumProfile: {
        type: String,
        required: false,
        unique: true, // Every github profile is unique
        sparse: true
    },

    linkedInProfile: {
        type: String,
        required: false,
        unique: true, // Every github profile is unique
        sparse: true
    },

    personalWebsite: {
        type: String,
        required: false,
        unique: true, // Every github profile is unique
        sparse: true
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

    // Go through ten rounds of password salting 
    bcrypt.genSalt(10, function (err, salt) {

        // Hash users password with the given salt ... user password doesn't exist
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash // Updates the plain password to be the hashed form
            next() // Return method callback
        });
    });
});

// Need to enable this function to gain access to this.password ... more research on why this is neccesarry?
UserSchema.methods.comparePassword = function (password, next) {
    // Hash the second parameter (user password) and compare it to hashed password
    console.log("THIS -> ", this)


    bcrypt.compare(password, this.password, function (err, isMatch) {
        next(err, isMatch)
    });
};

module.exports = mongoose.model("User", UserSchema);