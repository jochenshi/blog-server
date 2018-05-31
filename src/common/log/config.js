const path = require('path');

//错误日志的目录
const baseLogPath = path.resolve(__dirname, '../../../logs');

const errorFileName = "error";

//错误日志的完整路径
const errorLogPath = baseLogPath + "/error/" + errorFileName;


//响应日志的配置
const responseFileName = "response";

const responseLogPath = baseLogPath + "/response/" + responseFileName;

let config = {
    "appenders": {
        "errorLog": {
            "name": "errorLogger", //logger名称
            "type": "dateFile",   //日志类型
            "filename": errorLogPath,  //日志完整路径
            "path": "/error",
            "level": "ERROR",
            "alwaysIncludePattern": true,
            "category": "error",
            "pattern": "-yyyy-MM-dd-hh.log"  //日志后缀，每小时重新生成一个文件
        },
        "resLog": {
            "name": "resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "level": "ALL",
            "path": "/response",
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log"
        }
    },
    /*"levels": {
        "errorLogger": {
            "ERROR": "red"
        },
        "resLogger": {
            "ALL": "#e3e3e3"
        }
    },*/
    "categories": {
        "error": {
            "appenders": ["errorLog"],
            "level": ["ERROR"]
        },
        "default": {
            "appenders": ["resLog"],
            "level": ["ALL"]
        }
    },
    "basePath": baseLogPath   //日志的根目录
};

module.exports = config;