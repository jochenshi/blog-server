let Koa = require("koa");

const app = new Koa();

app.use(async (ctx) => {
    ctx.body = "hello"
});



module.exports = app;