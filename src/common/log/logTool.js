const log4js = require('log4js');

const log_config = require('./config');

log4js.configure(log_config);

let errorLogger = log4js.getLogger('errorLogger');

let resLogger = log4js.getLogger('resLogger');

let logTool = {
    "logError": (ctx, error, resTime) => {
        errorLogger.error(formartError(ctx, error, resTime));
    },

    "logResponse": (ctx, resTime) => {
        resLogger.info(formatResponse(ctx, resTime));
    }
};


//格式化请求的日志
let formatRequest = (req, resTime) => {
    let logText = "";
    let method = req.method;

    logText += "request method: " + method + "\n";

    logText += "request originalUrl: " + req.originalUrl + "\n";

    logText += "request client ip: " + req.ip + "\n";

    if (method === "GET") {
        logText += "request query: " + JSON.stringify(req.query) + "\n";
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }

    logText += "response time: " + resTime + "\n";

    return logText;
};



//格式化请求的响应的日志
let formatResponse = (ctx, resTime) => {
    let logText = '';

    logText += "\n" + "======================== response log start =============" + "\n";

    logText += formatRequest(ctx.request, resTime);

    logText += "response status: " + ctx.status + "\n";

    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    logText += "============================== response log end =======================" + "\n";

    return logText
};

//格式化错误日志
let formartError = (ctx, err, resTime) => {
    let logText = '';

    logText += "\n" + "======================= error log start ======================" + "\n";

    logText += formatRequest(ctx.request, resTime);

    logText += "error name: " + err.name + "\n";

    logText += "error message: " + err.message + "\n";

    logText += "err stack: " + err.stack + "\n";

    logText += "======================== error log end ====================" + "\n";

    return logText;
};

module.exports = logTool;