const Koa = require('koa');
const koaLogger = require('koa-logger');
const Router = require('koa-router');
const COS = require("cos-nodejs-sdk-v5");
const path = require("path");

let transformFile = require('../server/methods/tranformFile');
let {getAuth} = require("../server/methods/handle-cos");

let router = new Router({
    prefix: '/papers'
});

let cos = new COS({
    //AppId: "1256955134",
    SecretId: "AKIDPgs5NYhVEl5CBxys0ua2HJ8lEUYMal5A",
    SecretKey: "ygCSUGm6E6lLjusdBh3C7pJhsxynWFrM"
});

//上传图片
router.get("/picture", (ctx, next) => {
    //ctx.response.body = 'asdasdasd'
    cos.sliceUploadFile({
        Bucket: "blog-1256955134",
        Region: "ap-shanghai",
        Key: "topBackground1.jpg",
        FilePath: path.resolve(__dirname, "topBackground.jpg")
    }, (err, data) => {
        if (err) {
            console.log("asd",err);
            ctx.response.body = "asdasd"
        } else {
            console.log("asd",data);
            ctx.response.body = data
        }
    })
});

router.get("/getAuth", (ctx, next) => {
    getAuth()
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