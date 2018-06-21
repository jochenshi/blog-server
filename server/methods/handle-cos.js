const COS = require("cos-nodejs-sdk-v5");
const config = require("../../config/config");

let cos = new COS({
    SecretId: config.SecretId,
    SecretKey: config.SecretKey
});

let getAuth = () => {
    let key = "test.zip";
    let auth = cos.getAuth({
        Method: "get",
        Key: key,
        Expires: 60
    });
    console.log(auth)
};

module.exports = {
    getAuth
};