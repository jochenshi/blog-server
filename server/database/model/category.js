const mongoose = require("mongoose");
const {Schema} = mongoose;

const categories = new Schema(
    {
        category: {
            required: true,
            type: String
        },
        value: {
            required: true,
            type: String
        },
        description: {
            type: String,
            default: ''
        },
        extra: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


module.exports = {
    name: "categories",
    model: categories
};