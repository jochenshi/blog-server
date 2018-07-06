const model = require("../database/model");

//处理用户登录的方法
let handleUserLogin = () => {

};


//添加用户的方法
let handleUserAdd = async (obj, ctx) => {
    let {username, password, nickname, valid, role = []} = obj;

    let data = new model.users({
        username,
        password,
        nickname,
        valid,
        role
    });
    await data.save()
        .then(data => {
            console.log(data);
            ctx.response.body = {
                result: true,
                data: data
            };
        })

};

module.exports = {
    handleUserLogin, handleUserAdd
};