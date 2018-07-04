const mongoose = require("mongoose");
const {generateDatabaseUrl} = require("../methods/common");

/*let temp = generateDatabaseUrl();

console.log(temp);*/

let temp = "mongodb://rootUser:qwertyui1@47.98.136.125:27017/blogServer?authSource=admin";

let temp1 = "mongodb://rootUser:qwertyui1@47.98.136.125:27017/admin?dbName=blogServer";

let options = {
    authSource: "admin",
    user: "rootUser",
    pass: "qwertyui1"
};

//mongoose.connect("mongodb://47.98.136.125:27017/blogServer", options);
mongoose.connect(temp);

let db = mongoose.connection;

db.on("error", (err) => {
    console.log("database connection failed", err)
});

db.on("open", () => {
    console.log("database connection success");
    let ss = mongoose.Schema({
        name: String
    });
    let Name = mongoose.model("test1", ss);
    var aa = new Name({name: "11111"});
    aa.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("success")
        }
    })
    console.log(aa)
});