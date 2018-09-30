const Router = require('koa-router');
const koaBody = require('koa-body');

const {handleGetFrontPaperList, handleGetFrontPaper} = require('../../methods/papers');

let router = new Router({
    prefix: '/api/v1'
});

/*
*  博客界面获取文章的接口
* */
router.get('/papers', async (ctx, next) => {
    const result = await handleGetFrontPaperList();
    ctx.response.status = result.status;
    ctx.response.body = result;
});


/*
*  博客界面获取指定文章的接口
* */
router.get('/papers/:id', async (ctx, next) => {
    const {id} = ctx.params;
    const result = await handleGetFrontPaper(id);
    ctx.response.status = result.status;
    ctx.response.body = result;
});

module.exports = router;