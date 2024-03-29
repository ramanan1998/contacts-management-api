const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, "userId is required" ],
        ref: "user"
    },
    name: {
        type: String,
        required: [ true, "Please add contact name" ]
    },
    gender: {
        type: String,
        required: [ true, "Please add gender" ]
    },
    email: {
        type: String,
        required: [ true, "Please add email address" ]
    },
    phone: {
        type: String,
        required: [ true, "Please add contact number" ]
    }
}, {
    timestamps: true
});

const contactsModel = mongoose.model("Contact", contactSchema);

module.exports = contactsModel;