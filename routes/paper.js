const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');

let transformFile = require('../server/methods/tranformFile');

let router = new Router({
    prefix: '/papers'
});


//查询文章
router.get('/', async (ctx, next) => {
    console.log(222);
    let tt = await transformFile("./server/methods/test.md");
    console.log('tt', tt)
    ctx.response.body = 'asdasdasd'
});

//查询特定的文章
router.get('/:id', (ctx, next) => {

});

//新增文章
router.post('/', (ctx, next) => {

});

module.exports = router;