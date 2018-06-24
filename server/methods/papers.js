const fs = require('fs');

const {uploadConfig} = require('../../config/config');
const {uploadToCos} = require('./handle-cos');
const {saveFileToLocal} = require('./common');

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



module.exports = {
    handleUploadFile
};