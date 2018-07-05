const mongoose = require("mongoose");
const {generateDatabaseUrl} = require("../methods/common");


let options = {
    authSource: "admin",
    user: "rootUser",
    pass: "qwertyui1",
    useNewUrlParser: true
};

/*//another connect url
let temp = "mongodb://rootUser:qwertyui1@47.98.136.125:27017/blogServer?authSource=admin";*/

let connectUrl = generateDatabaseUrl();

mongoose.connect(connectUrl, options);

let db = mongoose.connection;

//数据库连接失败
db.on("error", (err) => {
    console.log("database connection failed", err)
});


//数据库连接成功
db.on("open", () => {
    console.log("database connection success");
});

//数据库断开连接
db.on("disconnected", () => {
    console.log("database disconnect")
});