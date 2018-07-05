const mongoose = require("mongoose");
require("../connect");

const fs = require("fs");
const path = require("path");

let modelInfo = {};


let initDatabase = () => {
    let modelFile = fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf(".js") > 0) && (file !== "index.js")
    });
    modelFile.forEach(val => {
        let model = require(path.join(__dirname, val));
        modelInfo[model.name] = mongoose.model(model.name, model.model)
    });
};


initDatabase();

module.exports = modelInfo;

