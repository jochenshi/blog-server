const marked = require('marked');
const fs = require('fs');;
//const Busboy = require('busboy');

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
                let temp = marked(data);
                setTimeout(() => {
                    resolve(temp)
                }, 3000)
                //console.log(temp);
            }
        })
    })
    return p;
};

let uploadFile = (ctx, options) => {
    let req = ctx.req;
    let busboy = new Busboy({headers: req.headers});
    return new Promise((resolve, reject) => {
        console.log("uploading");
        busboy.on("file", (fieldname, file, filename) => {
            console.log(file);
            file.on("end", () => {
                console.log("upload ok");
                resolve("ok")
            })
        })
        busboy.on("error",  (err) => {
            console.log("upload failed");
            reject("field")
        })
    })
}

module.exports = {
    transformFile, uploadFile
};