# 前言
本篇是我经过一周多的时间阅读博客及官方文档所写的文章，算是自己对webpack学习的总结。有篇个人认为非常不错的webpack文章贴在最下面的**参考链接**的第一条。本篇介绍的是用webpack自己搭一个react应用
## 一、概念
- **入口(entry)**
    入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

- **输出(output)**
    output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

- **loader**
    loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

- **插件(plugins)**
    用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

### 准备
    `npm init` 自动帮你创建package.json文件
    
    `npm install --save-dev webpack // 安装Webpack`

    新建文件夹app、public文件分别用于存放源文件及打包后的存放文件。在app文件夹中创建index.js与index.html文件。再创建一个webpack的配置文件webpack.config.js。使用前记得安装下webpack `npm install webpack -g`，当然你也可以不全局安装。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack</title>
</head>
<body>
    <script src="../public/bundle.js"></script>
</body>
</html>
```

### 1.入口
```javascript
const config = {
  entry: './app/index.js'
};
module.exports = config;
```
entry就是指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。本项目中的入口文件就是app文件夹中的index.js文件。(多入口及更多选项参考官方文档)

### 2.出口

```javascript
var config = {
    entry: "./app/index.js", // 入口文件
    output:{
        filename:"bundle.js",   //filename 用于输出文件的文件名。
        path:path.resolve(__dirname, './public')   //目标输出目录 path 的绝对路径。__dirname
    }
}

module.exports = config;
```

填好入口与出口配置后、在命令行中输入`.node_modules/.bin/webpack --config webpack.config.js `如果你是全局安装webpack的话可直接输入`webpack --config webpack.config.js`,直接输入`webpack`也可以，他会识别当前目录中的webpack.config.js。然后你就可以再public文件夹中看到名为bundle.js文件生成了。

### 3.更快捷的执行打包任务
如果你不想每次在命令行中输入那么长的代码,那就在package.json中的scripts字段中配置如下

```javascript
"scripts": {
    "build": "webpack --config webpack.config.js"
    }
```

不管你是否全局安装的webpack在scripts中他会自动识别node_modules中的webpack，所以不需要在里面输入`./node_modules...`。现在你可以再命令行中输入`npm run build`进行打包了。

### 4.webpack-dev-server
`webpack-dev-server` 是一个小型的Node.js Express服务器,**webpack-dev-server默认会以当前目录为基本目录**,除非你制定它.通过webpack-dev-server就可实现热加载了。使用前需要用npm安装`npm install webpack-dev-server --save-dev`，它根据webpack.config.js文件中的选项构建。常见的选项如下：

|webpack-dev-server选项|选项说明|
|----------------------|------|
|content-Base	|默认情况下，webpack-dev-server会从项目的根目录提供文件，可以通过此选项设置文件的目录名|
|port	|服务器使用的端口，默认情况下为8080|
|inline	|设为true时可以在文件发生变化时，更新页面|
|colors	|设置终端输出字体颜色|
|historyApiFallback|	当设置为true时，访问所有服务器上不存在的文件，都会被重定向到/，也就是index.html文件|

代码如下：

```javascript
var config = {
    entry: "./app/index.js", // 入口文件
    output: {
        filename: "bundle.js",   //filename 用于输出文件的文件名。
        path: path.resolve(__dirname, './public')   //目标输出目录 path 的绝对路径。__dirname
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新（为什么这个我不加都能热更新？？？）
        port: 8888, // 想webpack-dev-server在端口8888启动
    }
}
```
**webpack-dev-server默认会以当前目录为基本目录**,因为我指定到了public，所以在public中新建个index.html，并在html中引入当前文件夹中的bundle.js。

在package.json 添加如下代码就可快捷启动：

```javascript
"scripts": {
    "build": "webpack --config webpack.config.js",
    "server": "webpack-dev-server --config webpack.config.js"
  }
```

然后再命令行中输入`npm run server`启动webpack-dev-server。并在浏览器打开http://localhost:8888/就可以查看了。修改了index.js中的代码，也会实时刷新了。

### 5 babel

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：

- test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- loader：loader的名称（必须）
- include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
- query：为loaders提供额外的设置选项（可选）

#### css
webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

`npm install --save-dev style-loader css-loader //安装`
配置如下：

```javascript
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
```

可以认为他是从后面开始往前面解析 css-loader ==> style-loader，所以如果是less文件除了安装less-loader之外配置文件应该写在css-loader后面，如下：

```javascript
test: /\.less$/,
use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' }
    ]
```

##### 这样我们平时最基本的最简单的配置大致完成了

### 6.babel

