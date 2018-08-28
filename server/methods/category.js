const ModelInfo = require('../database/model');

const handleCategoryAdd = async (data) => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try {
        const {category, value, description} = data;
        const collect = await ModelInfo['categories'].find({
            $or: [
                {category},
                {value}
            ]
        });
        if (collect.length){
            res =  {
                ...res,
                'status': 400,
                'result': false,
                'message': '已存在相同类别或值的分类，请重新填写',
                'code': 10001
            };
        }else {
            const categorys = new ModelInfo['categories']({
                category, value, description
            });
            await categorys.save();
            res =  {
                ...res,
                'status': 201,
                'result': true,
                'message': '操作成功',
                'code': 200
            };
        }
    } catch(e){
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

const handleCategoryGetAll = async () => {
    let res = {
        'status': 200,
        'result': true,
        'data': [],
        'message': ''
    };
    try{
        const collect = await ModelInfo['categories'].find({});
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

module.exports = {
    handleCategoryAdd, handleCategoryGetAll
};