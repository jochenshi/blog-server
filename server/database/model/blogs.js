const mongoose = require("mongoose");
const {Schema} = mongoose;

const blogs = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        tag: {
            type: Array
        },
        category: [{
            type: Schema.Types.ObjectId,
            ref: 'categories',
            default: ''
        }],
        valid: {
            type: Boolean,
            default: true
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
    name: "blogs",
    model: blogs
};