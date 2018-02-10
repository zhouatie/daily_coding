# CSS水平垂直居中解决方案

## 准备
创建元素
```html
<div class="parent">
  <div class="child">child</div>
</div>
```
## 垂直水平居中方案一：知道宽度的情况下 absolute+margin负值

```html
.parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  background: yellow;
  width:50px;
  height:50px;
  margin-left:-25px;
  margin-top:-25px;
}
```

## 垂直水平居中方案二：不知道宽高的情况下 absolute+transform
```html
.parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
```
## 垂直居中方案三：position+margin:auto

```html
.parent {
  position:relative;
  width:200px;
  height:200px;
  background: red;
}
.child {
  width:80px;
  height:40px;
  background: yellow;
  position: absolute;
  left:0;
  top:0;
  right:0 ;
  bottom:0;
  margin:auto;
}
```
## 垂直居中方案四：+ 多行文本的垂直居中 :table-cell+vertical-align:middle;
```html
.parent {
    height: 300px;
    width:400px;
    border: 1px solid red;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.child {
  display: inline-block;
  width:50px;
  height:50px;
  background: blue;
}
/* 或者 */
.parent {
    width: 400px;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid red;
    text-align: center;
}
.child {
    display: inline-block;
    vertical-align: middle;
    background: blue;
}
```
## 垂直居中方案五：display: flex
```html
.parent {
  width:400px;
  height:200px;
  background:red;
  display: flex;
  justify-content:center;
  align-items:center;
}
.child {
  height:100px;
  width:100px;
  background:green;
}
```
## 垂直居中方案六：伪元素
```html
.parent {
  width:200px;
  height:200px;
  background:red;
  text-align: center;
}
.child {
  height:100px;
  width:100px;
  background:yellow;
  display: inline-block;
  vertical-align: middle;
}
.parent:before {
  content:"";
  height:100%;
  vertical-align: middle;
  display: inline-block;
}
```
