var express = require("express");
var app = express();
var multer = require("multer");

/*
    1. 保存在文件夹中的文件为二进制，所以想在本地点开能预览的，取消下面fs模块引用的注释
    2. 并在命令行中输入 npm install fs --save
*/
// var fs = require("fs");

// 这里dest对应的值是你要将上传的文件存的文件夹
var upload = multer({ dest: './public/uploads' });

app.use(express.static('./public'));

app.post("/upload", upload.single('file'), (req, res) => {
    
    // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
    // req.body 将具有文本域数据，如果存在的话  。（上面前端代码中传递的date字段在req.body中获取）
    console.log(req.body) //{ date: '2018/1/20 下午5:25:56' }

    // ---------- 因为保存的文件为二进制，取消下面代码块注释可让保存的图片文件在本地文件夹中预览------
    /*
    var file_type;
    if (req.file.mimetype.split('/')[0] == 'image') file_type = '.' + req.file.mimetype.split('/')[1];
    if (file_type) {
        fs.rename(req.file.path, req.file.path + file_type, function (err, doc) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('55');
            res.send('./uploads/' + req.file.filename + file_type)
        })
        return;
    }
    */
    // ---------------------
    
    res.send('./uploads/' + req.file.filename)
})

app.listen(9999);