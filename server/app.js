const Koa = require("koa");
const logger = require("koa-logger");
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const paper = require('../routes/paper');
const user = require('../routes/user');

app.use(logger());
app.use(async (ctx, next) => {
        console.log(111);
        ctx.body = "hello";
        next()
    });
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