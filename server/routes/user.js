const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');
const modelInfo = require("../database/model/index");
const {handleUserAdd} = require("../control/user");

let router = new Router({
    prefix: '/authen/users'
});


router.get('/', (ctx, next) => {
    console.log(ctx._matchedRoute);
    ctx.response.status = 400;
    ctx.response.body = ctx
});

router.get("/test", async (ctx, next) => {
    let data = {
        username: "qweer",
        password: "asdasdasd",
        nickName: "nickName1"
    };
    await handleUserAdd(data, ctx)
    //ctx.response.body = {name: "asdas"}
});

router.get('/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = ctx.params;
    ctx.redirect('/paper')
});

module.exports = router;