const fs = require('fs');

const {uploadConfig} = require('../../config/config');
const {uploadToCos} = require('./handle-cos');
const {saveFileToLocal} = require('./common');
const {blogs} = require('../database/model');

/*
* 处理上传文件的操作*/
let handleUploadFile = async (ctx) => {
    let file = ctx.request.files.file;
    if (file) {
        let result;
        if (uploadConfig.destination === 'server') {
            result = await uploadToCos(file.name, file.path, ctx);
        } else {
            result = await saveFileToLocal(file);
        }
        console.log(result);
        ctx.response.body = {
            result: true,
            message: "upload success",
            data: result
        };
    } else {
        ctx.body = {
            result: false,
            message: 'invalid data',
            data: []
        }
    }
};

/*
*  处理保存文章的操作
* */
let handleSaveFile = async (ctx) => {
    const {title, content, id} = ctx.request.body || '';
    if(!title || !content){
        ctx.response.body = {
            result: false,
            message: 'title or content can not be empty',
            data: []
        };
    }else {

    }
};



module.exports = {
    handleUploadFile
};