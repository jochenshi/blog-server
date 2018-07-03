const mongoose = require("mongoose");
const {generateDatabaseUrl} = require("../methods/common");

let temp = generateDatabaseUrl();

console.log(temp);

mongoose.connect(temp);

let db = mongoose.connection;

db.on("error", (err) => {
    console.log("database connection failed", err)
});

db.on("open", () => {
    console.log("database connection success")
});