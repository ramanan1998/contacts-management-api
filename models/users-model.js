const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    firstname: {
        type: String,
        required: [ true, "firstname is required" ]
    },
    lastname: {
        type: String,
        required: [ true, "lastname is required" ]
    },
    email: {
        type: String,
        required: [ true, "email is required" ],
        unique: [ true, "email is already taken" ]
    },
    password: {
        type: String,
        required: [ true, "password is required" ]
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("user", userschema);