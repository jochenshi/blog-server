const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');
const path = require("path");
const koaBody = require('koa-body');

let {transformFile} = require('../server/methods/tranformFile');
let {handleUploadFile} = require('../server/methods/papers');

let router = new Router({
    prefix: '/papers'
});

/*上传文件的入口*/
router.post("/upload",koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}), async (ctx, next) => {
    await handleUploadFile(ctx);
});

router.get("/getAuth", (ctx, next) => {
    getAuth()
});

//查询文章
router.get('/', async (ctx, next) => {
    console.log(222);
    let tt = await transformFile("./server/methods/test.md");
    console.log('tt', tt);
    ctx.response.body = 'asdasdasd'
});



//查询特定的文章
router.get('/:id', (ctx, next) => {

});



//新增文章
router.post('/', (ctx, next) => {

});



module.exports = router;