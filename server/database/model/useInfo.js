const mongoose = require("mongoose");
const {Schema} = mongoose;


const userInfoModel = new Schema({
    userId: {
        type: String,
        required: true
    },
    nickname: String,
    sex: String,
    email: String,
    birth: String,
    location: String,
    address: String,
    extra: {
        type: String,
        default: ""
    },
    valid: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

module.exports = {
    name: "userInfos",
    model: userInfoModel
};
