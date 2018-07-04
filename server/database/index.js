const mongoose = require("mongoose");
const {generateDatabaseUrl} = require("../methods/common");

const userModel = require('./user');

/*let temp = generateDatabaseUrl();

console.log(temp);*/

let temp = "mongodb://rootUser:qwertyui1@47.98.136.125:27017/blogServer?authSource=admin";


//another method used to connect database
let options = {
    authSource: "admin",
    user: "rootUser",
    pass: "qwertyui1",
    useNewUrlParser: true
};

mongoose.connect("mongodb://47.98.136.125:27017/blogServer", options);

//mongoose.connect(temp, {useNewUrlParser: true});

let db = mongoose.connection;

db.on("error", (err) => {
    console.log("database connection failed", err)
});

db.on("open", () => {
    console.log("database connection success");
    let ss = mongoose.Schema({
        name: String,
        date: {
            type: Date,
            default: Date.now()
        }
    });
    let Name = mongoose.model("test1", ss);
    let user = mongoose.model(userModel.name, userModel.model);
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