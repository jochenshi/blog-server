const marked = require('marked');
const fs = require('fs');

marked.setOptions({
    renderer: new marked.Renderer()
});

//用于处理上传md格式的文件
let transformFile = async (file) => {
    let p = new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                let temp = marked.lexer(data);
                setTimeout(() => {
                    resolve(temp)
                }, 3000)
                //console.log(temp);
            }
        })
    })
    return p;
};

module.exports = transformFile;