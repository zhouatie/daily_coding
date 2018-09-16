# happypack提升项目构建速度

## 前言
最近在看《深入浅出webpack》看到了`happypack`。就想起公司一vue项目，每次项目启动都将近2分钟。等的实在让人不耐烦，都够我支付宝偷一波能量了。就自己实践了下，事实证明是有效的。原平均构建速度为1分55秒（5次），使用happypack后平均构建速度为1分45秒（5次）。我只修改了对.vue文件的处理，如下实战代码，节省了10秒还是不错滴。

## happypack
由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，Webpack 构建慢的问题会显得严重。 运行在 Node.js 之上的 Webpack 是单线程模型的，也就是说 Webpack 需要处理的任务需要一件件挨着做，不能多个事情一起做。`happypack`把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。



## 实战(代码来自构建将近2分钟的项目）

**修改前代码**

```javascript

// ...

module: {
    // ...
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
  ]
},
plugins: []

```


**修改后代码**
```javascript
// ...
module: {
// ...
  rules: [
    {
      test: /\.vue$/,
      loader: 'happypack/loader?id=vue',
    },
  ]
},
plugins: [
  new HappyPack({
    id: 'vue',
    loaders: [{
      loader: 'vue-loader',
      options: vueLoaderConfig
    }],
  }),
]

```


在 Loader 配置中，所有.vue文件的处理都交给了 happypack/loader 去处理，使用紧跟其后的 querystring ?id=vue(这个id随便去只要跟下面实例中的id对应上就行了) 去告诉 happypack/loader 去选择哪个 HappyPack 实例去处理文件（可以new 多个HappyPack分别去处理多种类型文件,比如你可以再new一个HappyPack去处理css，同上面处理.vue文件一样）。
在 Plugin 配置中，新增了个 HappyPack 实例分别用于告诉 happypack/loader 去如何处理.vue。选项中的 id 属性的值和上面 querystring 中的 ?id=vue相对应，选项中的 loaders 属性和 Loader 配置中一样。


接入 HappyPack 后，你需要给项目安装新的依赖：

> `npm i -D happypack`




在实例化 HappyPack 插件的时候，除了可以传入 `id` 和 `loaders` 两个参数外，`HappyPack` 还支持如下参数：
- `threads` 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
- `verbose` 是否允许 `HappyPack` 输出日志，默认是 true。
- `threadPool` 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多，