# 你不知道的JavaScript

- 函数长度

```javascript
function a(b, c) {}
a.length // 2 
```

- 防错机制

```javascript
var a;
a; // undefined
b; // ReferenceError: b is not defined
var a;
typeof a; // "undefined"
typeof b; // "undefined"

if (DEBUG) {
  console.log("Debugging is starting");
}
// 这样是安全的
if (typeof DEBUG !== "undefined") {
  console.log("Debugging is starting");
}
// or
if (window.DEBUG) {
  // ..
}
if (!window.atob) {
  // ..
}
// 通过 typeof 的安全防范机制(阻止报错)来检查 undeclared 变量，有时是个不错的 办法。
```

- 值

```js
var a = [];
a["13"] = 42;
a.length; // 14
```

- 函数中this的指向取决于调用位置（且只有上一层或者说最后一层在调用位置中起作用）

```javascript
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
}

var obj1 = {
    a: 2,
    obj2: obj2
}
obj1.obj2.foo(); // 42

```
- es5的bind的实现方法
```javascript
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}
```

- api调用的上下文

```js
function foo(el) {
    console.log(el,this.id)
}
var obj = {
    id: 'awesome'
}
[1,2,3].forEach(foo, obj);
// 1 awesome 2 awesome 3 awesome
// 这些函数实际上就是通过call(...)或者apply(...)实现了显式绑定，这样你可以少写一些代码
```