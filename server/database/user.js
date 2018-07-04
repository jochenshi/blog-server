const mongoose = require("mongoose");
const {Schema} = mongoose;

const userModel = new Schema({
    userName: String,
    password: String,
    nickName: String,
    extra: String,
    createTime: {
        type: Date,
        default: Date.now()
    },
    valid: Boolean,
    role: Array
});

module.exports = {
    name: "user",
    model: userModel
};