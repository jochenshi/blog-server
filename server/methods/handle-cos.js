const COS = require("cos-nodejs-sdk-v5");
const {config} = require("../../config/config");

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

//将文件上传到腾讯云
let uploadToCos = async (name, position, ctx) => {
    return new Promise((resolve, reject) => {
        cos.sliceUploadFile({
            Bucket: "blog-1256955134",
            Region: "ap-shanghai",
            Key: name,
            FilePath: position
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    location: "https://" + data.Location,
                    name: data.Key
                });
            }
        })
    })
};

module.exports = {
    getAuth, uploadToCos
};