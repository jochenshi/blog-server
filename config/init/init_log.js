const fs = require('fs');
const logConfig = require('../../src/common/log/config');


/*检查目录是否存在不存在则创建*/
let confirmPath = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log("createPath: ", path);
    }
};

/*
初始化日志目录的方法,
创建用于存放不同类型日志文件的目录
*/
let initLogPath = () => {
    if (logConfig.basePath) {
        confirmPath(logConfig.basePath);
        for (let i in logConfig.appenders) {
            let temp = logConfig.appenders[i];
            if (temp.path) {
                confirmPath(logConfig.basePath + temp.path)
            }
        }
        /*for (let i = 0, temp = logConfig.appenders; i < temp.length; i++) {
            if (temp[i].path) {
                confirmPath(logConfig.basePath + temp[i].path)
            }
        }*/
    }
};

initLogPath();