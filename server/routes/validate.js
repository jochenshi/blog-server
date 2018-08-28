const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

let router = new Router();

router.all('/*', async (ctx, next) => {
    const url = ctx.url;
    console.log(url);
    if(/^(\/authen)/.test(url)) {
        // 匹配到需要进行身份验证的路由
        await next();
    } else {
        await next();
    }
});

module.exports = router;