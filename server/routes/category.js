const Router = require('koa-router');
const koaBody = require('koa-body');
const ModelInfo = require('../database/model');
const {handleCategoryAdd, handleCategoryGetAll} = require('../methods/category');

let router = new Router({
    prefix: '/authen/category'
});

/*
*  新建分类
* */
router.post('/', koaBody(), async (ctx, next) => {
    const {category = '', value = '', description = ''} = ctx.request.body;
    if(!category || !value){
        console.log('param can not be null');
    } else {
        const res = await handleCategoryAdd(ctx.request.body);
        ctx.response.status = res.status;
        ctx.response.body = res;
    }
});

/*
*  获取所有的分类
* */
router.get('/', async (ctx, next) => {
    const result = await handleCategoryGetAll();
    ctx.response.status = result.status;
    ctx.response.body = result;
});

module.exports = router;