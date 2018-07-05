const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');
const modelInfo = require("../server/database/model");

let router = new Router({
    prefix: '/users'
});


router.get('/', (ctx, next) => {
    console.log(ctx._matchedRoute);
    ctx.response.status = 400;
    ctx.response.body = ctx
});

router.get("/test", (ctx, next) => {
    let test1 = new modelInfo.users({
        username: "qweer",
        password: "asdasdasd",
        nickName: "nickName1"
    });

    test1.save();
});

router.get('/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = ctx.params;
    ctx.redirect('/paper')
});

module.exports = router;