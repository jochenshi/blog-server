const Koa = require("koa");
const logger = require("koa-logger");
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const logTool = require('../src/common/log/logTool');

const paper = require('../routes/paper');
const user = require('../routes/user');

//用于在console中打印相关的日志
app.use(logger());

//用于过滤所有的请求，并根据相应的规则生成关于请求，错误的日志的记录
app.use(async (ctx, next) => {
        const start = new Date();
        let end;
        //ctx.body = "hello";
        try {
            await next();
            end = new Date();

            logTool.logResponse(ctx, start, end)
        } catch (error) {
            end = new Date();
            logTool.logError(ctx, error, start, end);
        }
    });

//加载具体的各个模块的路由
app.use(paper.routes());
app.use(user.routes());



// app.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     console.log(`${ctx.method} ${ctx.url} start:${start} - ${ms}ms`)
// });



/*app.use(paper.routes())
    .use(paper.allowedMethods());*/



module.exports = app;