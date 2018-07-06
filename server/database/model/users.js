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
    nickname: String,
    extra: {
        type: String,
        default: ""
    },
    valid: {
        type: Boolean,
        default: true
    },
    role: Array
},{
    timestamps: true
});

module.exports = {
    name: "users",
    model: userModel
};
