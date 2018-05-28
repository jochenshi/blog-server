const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');

let router = new Router({
    prefix: '/users'
});


router.get('/', (ctx, next) => {
    console.log(ctx._matchedRoute);
    ctx.response.status = 400;
    ctx.response.body = ctx
});

router.get('/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = ctx.params;
    ctx.redirect('/paper')
});

module.exports = router;