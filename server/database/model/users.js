const mongoose = require("mongoose");
const {Schema} = mongoose;


const userModel = new Schema({
    username: {
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
    name: "users",
    model: userModel
};
