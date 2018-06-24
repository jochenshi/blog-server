const path = require('path');

const config = {
    port: 8089,
    AppId: "1256955134",
    SecretId: "AKIDPgs5NYhVEl5CBxys0ua2HJ8lEUYMal5A",
    SecretKey: "ygCSUGm6E6lLjusdBh3C7pJhsxynWFrM",
    Url: 'https://sts.api.qcloud.com/v2/index.php',
    Domain: 'sts.api.qcloud.com'
};

const uploadConfig = {
    directory: path.resolve(__dirname, '../public/uploadFile'),
    destination: 'server' //local
};

module.exports = {
    config, uploadConfig
};