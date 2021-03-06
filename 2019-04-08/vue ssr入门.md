# vue ssr入门

## 前言

近期需要接手一个vue ssr项目，由于本人之前没有写过ssr，只是稍微了解了点。所以跟着官网学了下，并整理出了这篇学习笔记。方便自己以后对vue ssr知识的回顾。好记性不如烂笔头。



## 介绍

相信大家在看到这篇文章之前，都知道ssr是什么了。SSR，英文全称叫 Server(服务) side(端) rendering (渲染)哈哈☺

那么究竟什么是服务器端渲染？

>  Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

>  服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在**服务器**和**客户端**上运行。

如果你问我为什么使用ssr呢？([具体可参考官网](<https://ssr.vuejs.org/zh/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F>))

> - 有利于seo。
> - 更快的内容到达时间 (time-to-content),特别是对于缓慢的网络情况或运行缓慢的设备。



## 正文

### 基本用法

ssr主要依靠两个包`vue-server-renderer`和 `vue`(两个版本必须匹配)

安装: `npm install vue vue-server-renderer --save`













## 参考

[Vue SSR 指南](<https://ssr.vuejs.org/zh/>)

[vue 服务端渲染ssr](<https://www.jianshu.com/p/a7631293d7f1>)

[带你五步学会Vue SSR](<https://segmentfault.com/a/1190000016637877#articleHeader0>)