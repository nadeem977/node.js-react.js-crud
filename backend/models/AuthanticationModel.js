const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    isLoggedIn:{
        type: Boolean,
    },
    profileImge:{
        type: String,
    }
}, { timestamps: true });

const Authentication = mongoose.model('Authentication', AuthSchema);

module.exports = Authentication;
