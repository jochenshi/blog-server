const mongoose = require("mongoose");
const {Schema} = mongoose;


console.log("execute user.js");
const userModel = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickName: String,
    extra: String,
    valid: Boolean,
    role: Array
});

module.exports = {
    name: "user",
    model: userModel
};
