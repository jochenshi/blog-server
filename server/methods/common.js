const path = require('path');
const fs = require('fs');
const {uploadConfig, dbConfig} = require('../../config/config');

/*
* 将上传的文件保存到服务器
* */
let saveFileToLocal = async (file) => {
    if (file) {
        let reader = fs.createReadStream(file.path); //创建读取流
        let extence = file.name.split('.').pop(); //获取文件的后缀
        let upstream = fs.createWriteStream(`${uploadConfig.directory}/${file.name}.${extence}`); //创建写文件流
        let a = await reader.pipe(upstream); //写文件
        return a;
    } else {
        return false
    }
};

/*
* 格式化返回数据的方法
* */

let formatResponse = (flag, data) => {
    return {
        result: flag,
        message: flag ? "操作成功" : "操作失败",
        data: data
    }
};

/*
* 读取数据库配置文件并生成可连接的数据库地址的方法
* */
let generateDatabaseUrl = () => {
    let {username, password, ip, port, database} = dbConfig;
    return "mongodb://" + username + ":" + password + "@" + ip + ":" + port + "/blogServer?authSource=admin"
};

module.exports = {
    saveFileToLocal,  formatResponse, generateDatabaseUrl
};