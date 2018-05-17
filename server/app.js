const Koa = require("koa");
const logger = require("koa-logger");

const app = new Koa();

app.use(logger());

// app.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     console.log(`${ctx.method} ${ctx.url} start:${start} - ${ms}ms`)
// });


app.use(async (ctx) => {
    ctx.body = "hello"
});



module.exports = app;