var express = require("express");
var app = express();
var multer = require("multer");
// 这里dest对应的值是你要将上传的文件存的文件夹
var upload = multer({dest:'./public/uploads'});

app.use(express.static('./public'));

app.post("/upload", upload.single('file'),(req, res) => {
    console.log(req.body) //{ date: '2018/1/20 下午5:25:56' }
    res.send('./uploads/'+req.file.filename)
})

app.listen(9999);