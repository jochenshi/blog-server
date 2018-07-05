const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
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

//数据库连接失败
db.on("error", (err) => {
    console.log("database connection failed", err)
});


//数据库连接成功
db.on("open", () => {
    console.log("database connection success");
    let ss = mongoose.Schema({
        name: String,
        date: {
            type: Date,
            default: Date.now()
        }
    },{timestamps: true});
    let Name = mongoose.model("test1", ss);
    let user = mongoose.model(userModel.name, userModel.model);
    var aa = new Name({name: "11111"});
    aa.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("success")
        }
    });
    console.log(aa);
    initDatabase();
});

//数据库断开连接
db.on("disconnected", () => {
    console.log("database disconnect")
});

let initDatabase = async () => {
    let files = fs.readdirSync(__dirname);
    console.log(files);
};