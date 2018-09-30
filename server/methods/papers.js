const fs = require('fs');

const {uploadConfig} = require('../../config/config');
const {uploadToCos} = require('./handle-cos');
const {saveFileToLocal} = require('./common');
const ModelInfo = require('../database/model');

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

/*
*  处理管理平台的获取文章列表的请求
* */
const handleGetPaperList = async () => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try{
        const collect = await ModelInfo['blogs'].find({}).populate({
            'path': 'category',
            'select': ['category']
        });
        res = {
            ...res,
            'data': collect,
            'status': 200
        };
    } catch (e) {
        res = {
            ...res,
            'message': e,
            'status': 404
        };
    }
    return res;
};

/*
*  处理管理平台的新建文章的请求
* */
const handlePaperCreate = async (data) => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try{
        const {title, category, tag, author='admin'} = data;
        const papers = new ModelInfo['blogs']({
            title, category, tag, author
        });
        await papers.save();
        res =  {
            ...res,
            'status': 201,
            'result': true,
            'message': '操作成功',
            'code': 200
        };
    }catch (e) {
        res = {
            ...res,
            'status': 400,
            'result': false,
            'message': e,
            'code': 10000
        };
    }
    return res;
};

/*
*  处理管理平台的修改文章的基本信息的方法
* */
const handleModifyPaperInfo = async (data) => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try {
        const {category = [], id = '', tag = [], title = ''} = data || {};
        if(!data || !category.length || !id || !title) {
            res = {
                ...res,
                'status': 400,
                'message': '参数不正确'
            }
        } else {
            const collect = await ModelInfo['blogs'].findByIdAndUpdate(id, {
                category,
                title,
                tag
            });
            res = {
                ...res,
                'data': collect
            }
        }
    } catch (e) {
        res = {
            ...res,
            'status': 400,
            'result': false,
            'message': e,
            'code': 10000
        };
    }
    return res;
};

/*
* 处理管理平台修改指定文章的内容的方法
* */
const handleModifyPaperContent = async (data, paperId = '') => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try{
        const {id, title, content} = data || {};
        if(!id || !paperId || id !== paperId){
            res = {
                ...res,
                'message': '文章ID不存在，或者不正确',
                'status': 400
            }
        } else if (!title) {
            res = {
                ...res,
                'message': '文章标题不能为空',
                'status': 400
            }
        } else {
            await ModelInfo['blogs'].findByIdAndUpdate(id.toString(), {
                content,
                title
            });
            const collect = await ModelInfo['blogs'].find({
                '_id': id.toString()
            });
            res = {
                ...res,
                'data': collect
            }
        }
    } catch (e) {
        res = {
            ...res,
            'status': 400,
            'result': false,
            'message': e,
            'code': 10000
        };
    }
    return res;
};

/*
*  处理管理平台获取指定文章的信息的请求
* */
const handleGetPaper = async (id) => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try {
        if(!id){
            res = {
                ...res,
                'status': 400,
                'message': '该文章不存在'
            }
        } else {
            const collect = await ModelInfo['blogs'].find({
                '_id': id.toString()
            });
            if(!collect.length){
                res = {
                    ...res,
                    'status': 400,
                    'message': '该文章不存在'
                }
            } else {
                res = {
                    ...res,
                    'data': collect
                }
            }
        }
    } catch (e) {
        res = {
            ...res,
            'status': 400,
            'result': false,
            'message': e,
            'code': 10000
        };
    }
    return res;
};


// 以下为博客界面的请求
/*
*  获取文章列表
* */
const handleGetFrontPaperList = async () => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try{
        const collect = await ModelInfo['blogs'].find({}).populate({
            'path': 'category',
            'select': ['category']
        });
        res = {
            ...res,
            'data': collect,
            'status': 200
        };
    } catch (e) {
        res = {
            ...res,
            'message': e,
            'status': 404
        };
    }
    return res;
};

/*
*  获取指定博客的详细内容
* */
const handleGetFrontPaper = async (id) => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try {
        if(!id){
            res = {
                ...res,
                'status': 400,
                'message': '该文章不存在'
            }
        } else {
            const collect = await ModelInfo['blogs'].find({
                '_id': id.toString()
            });
            if(!collect.length){
                res = {
                    ...res,
                    'status': 400,
                    'message': '该文章不存在'
                }
            } else {
                res = {
                    ...res,
                    'data': collect
                }
            }
        }
    } catch (e) {
        res = {
            ...res,
            'status': 400,
            'result': false,
            'message': e,
            'code': 10000
        };
    }
    return res;
};


module.exports = {
    handleUploadFile, handleGetPaperList, handlePaperCreate,
    handleModifyPaperInfo, handleGetPaper, handleModifyPaperContent,
    handleGetFrontPaperList, handleGetFrontPaper
};