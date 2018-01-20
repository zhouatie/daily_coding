# formdata上传文件

### 1.关于formdata
> XMLHttpRequest Level 2 添加了一个新的接口——FormData。利用 FormData 对象，我们可以通过 JavaScript 用一些键值对来模拟一系列表单控件，我们还可以使用 XMLHttpRequest 的 send() 方法来异步的提交表单。与普通的 Ajax 相比，使用 FormData 的最大优点就是我们可以异步上传二进制文件。
[FormData的api](https://developer.mozilla.org/en-US/docs/Web/API/FormData)


###### 方法一：
创建一个空FormData对象：
`var formData = new FormData()`
使用FormData.append添加一个键/值对：
`formData.append('username', 'Chris');`

###### 方法二：利用form表单传递给formdata
```
<form id="myForm" name="myForm">
  <div>
    <label for="username">Enter name:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">Enter account number:</label>
    <input type="text" id="useracc" name="useracc">
  </div>
  <div>
    <label for="userfile">Upload file:</label>
    <input type="file" id="userfile" name="userfile">
  </div>
<input type="submit" value="Submit!">
</form>
```
```
var myForm = document.getElementById('myForm');
formData = new FormData(myForm);
```

### 2.formdata上传文件

##### 目录结构
```
.
├── index.js
├── node_modules
├── package.json
└── public
    ├── index.html
    └── uploads
```
##### 客户端代码
```
 <!-- index.html -->
    <input id="file" type="file">
    <button id="btn">点击上传</button>
    <img id="img" src="" alt="">
    <script>
        var btn = document.getElementById("btn"),
            file = document.getElementById("file"),
            img = document.getElementById("img");
        btn.onclick = function () {
            // 获取文件
            var upload_file = file.files[0],
                formdata = new FormData(),
                xhr = new XMLHttpRequest();
            
            formdata.append('date',new Date().toLocaleString());  
            // 将文件添加到formdata对象中，（注：下面的file字段名在node中有用）
            formdata.append('file', upload_file);
            xhr.open("POST", "/upload", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    img.src = xhr.responseText;
                }
            }
            xhr.send(formdata);
        }
    </script>
```
##### 服务端代码
```
// index.js
var express = require("express");
var app = express();
var multer = require("multer");
// 这里dest对应的值是你要将上传的文件存的文件夹
var upload = multer({dest:'./public/uploads'});
app.use(express.static('./public'));
app.post("/upload", upload.single('file'),(req, res) => {
    // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
    // req.body 将具有文本域数据，如果存在的话  。（上面前端代码中传递的date字段在req.body中获取）
    console.log(req.body)  // { date: '2018/1/20 下午5:25:56' }
    res.send('./uploads/'+req.file.filename)
});
app.listen(9999);
```
##### 接下来解释下上述代码

> 上面的例子是上传图片，服务端传回图片路径进行展示。上传其他文件同理！

index.js中依赖express、multer 可以通过`npm install express multer --save`进行安装，当然你也可以不使用express。
接下去重点讲述下multer：
1.安装：
`npm install --save multer`
2.使用：
**multer(opts)**
> Multer 接受一个 options 对象，其中最基本的是 dest 属性，这将告诉 Multer 将上传文件保存在哪。如果你省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘。通常，只需要设置 dest 属性 像这样：
`var upload = multer({ dest: 'uploads/' })   // dest对应的值就是你想文件存储的文件夹`

**.single(fieldname)   **
> 其他方法详见[multer文档](https://www.npmjs.com/package/multer)
接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。（这里的fieldname指的是formdata.append("file",文件）中的'file'字段
Multer 会添加一个 `body` 对象 以及 `file` 或 `files` 对象 到 express 的 `request` 对象中。`body` 对象包含表单的文本域信息，`file` 或 `files` 对象包含对象表单上传的文件信息。
```
app.post("/upload", upload.single('file'),(req, res) => {
    // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
    // req.body 将具有文本域数据，如果存在的话 。（上面前端代码中传递的date字段在req.body中获取）
    console.log(req.body) // { date: '2018/1/20 下午5:25:56' }
    res.send('./uploads/'+req.file.filename)
})
```


### 注意事项:
一、formdata在控制台打印为空

    可通过下面方法获取：
```
var formData = new FormData();
formData.append('username', 'Chris');
formData.append('username', 'Bob');
// get()函数只会返回username附加的第一个值
formData.get('username'); // Returns "Chris"
// getAll()函数将返回username一个数组中的两个值：
formData.getAll('username'); // Returns ["Chris", "Bob"]
```
[更多formdata方法](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

二、如果formdata添加文件成功了的话，还是上传失败，可以看看头部是否为`multipart/form-data`



> **文章都是学习过程中的总结，如果发现错误，欢迎留言指出~**
