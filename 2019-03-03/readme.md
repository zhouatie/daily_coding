# 数据结构

## 数组

### 方法
```javascript
//一、数组
var arr = [];
// 添加元素
arr.push(1, 2); // [1,2]
// 开头插入
arr.unshift(0); // [0, 1, 3]
// 尾部删除
arr.pop(); // [0, 1] 
// 头部删除
arr.shift(); // [1]
// 数组合并
[1].concat([2]) // [1,2]
```

### 迭代器

- `every` every方法会迭代数组中每个元素，直到返回false。
- `some` some和every类似，不过some方法会迭代数组的每个元素，直到函数返回true
- `forEach` 和for循环的结果相同
- `map` 返回新的数组 `[1,2].map(o => o * 2) // [2,4]`
- `filter` 返回新的数组 `[1,2].filter(o => o > 1) // [2]`
- `reduce` `[1,2].reduce((result, current) => result + current) // 3`
- `for of` `for (let n of numbers) { console.log((n % 2 === 0) ? 'even' : 'odd')};`
- `entries`
    ```javascript
    const numbers = [1,2,3];
    let aEntries = numbers.entries(); // 得到键值对的迭代器
    console.log(aEntries.next().value); // [0, 1] 位置0的值为1
    console.log(aEntries.next().value); // [1, 2] 位置1的值为2
    console.log(aEntries.next().value); // [2, 3] 位置2的值为3
    ```
- `keys`
    ```javascript
    const numbers = [1,2,3];
    console.log(Object.keys(numbers)); // ['0','1','2'];
    ```

- `values`
    ```javascript
    const numbers = [1,2,3];
    console.log(Object.values(numbers)); // [1,2,3]
    ```

- `Array.from`
- `Array.of`
- `fill`
- `copyWithin`
- `sort`
- `find`
- `findIndex`
- `includes`

## 栈

> 栈是一种遵从**后进先出**原则的有序集合

### 实现

```javascript
function Stack() {
    let items = [];
    // 向栈添加元素
    this.push = function(element) {
        items.push(element);
    }
    // 从栈移除元素
    this.pop = function() {
        return items.pop();
    };
    // 查看栈顶元素
    this.peek = function() {
        return items[item.length - 1];
    }
    // 检查栈是否为空
    this.isEmpty = function() {
        return items.length == 0;
    }
    this.size = function() {
        return items.length;
    };
    // 清空和打印栈元素
    this.clear = function() {
        items = [];
    };
    this.print = function() {
        console.log(items.toString());
    };
}

```

### 用栈解决问题

存储访问过的任务或路径、撤销的操作等。

## 队列

> 队列是遵循FIFO(First In First Out, 先进先出，也称为先来先服务)

### 实现

```javascript
function Queue() {
    let items = [];
    // 向队列添加元素
    this.enqueue = function(element) {
        items.push(element);
    };
    // 从队列移除元素
    this.dequeue = function() {
        return items.shift();
    };
    // 查看队列头元素
    this.front = function() {
        return items[0];
    };
    // 检查队列是否为空
    this.isEmpty = function() {
        return items.length == 0;
    };
    this.size = function() {
        return items.length;
    };
    // 打印队列元素
    this.print = function() {
        console.log(items.toString());
    };
}
```

## 链表

> 链表村粗有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
> 相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点（表头）开始迭代列表直到找到所需的元素。

### 实现

```javascript
function LinkedList() {
    let Node = function(element) {
        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;
    // 向链表尾部追加元素
    this.append = function(element) {
        let node = new Node(element),
        current;

        if (head === null) {
            head = node;
        } else {
            current = head;
            // 循环列表，直到找到最后一项
            while (current.next) {
                current = current.next;
            }
            // 找到最后一项，将其next赋为node，建立链接
            current.next = node;
        }
        length++； // 更新列表的长度
    }
    // 从链表中移除元素
    this.removeAt = function() {
        // 检查越界值
        if (position > -1 && position < length) {
            let current = head,
            previous,
            index = 0;

            // 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                // 将previous 与 current的下一项链接起来： 跳过current，从而移除它
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    // 在任意位置插入元素
    this.insert = function(position, element) {
        // 检查越界值
        if (position >= 0 && position <= length) {
            let node = new Node(element),
            current = head,
            previous,
            index = 0;

            if (position === 0) { // 在第一个位置添加
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++; // 更新列表的长度
            return true;
        } else {
            return false;
        }
    }
    // toString方法
    this.toString = function() {
        let current = head,
        string = '';

        while (current) {
            string += current.element + (current.next ? 'n' : '');
            current = current.next;
        }
        
        return string;
    }
    // indexOf 方法
    this.indexOf = function(elment) {
        let current = head,
        index = 0;
        
        while(current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    }
    // remove 方法
    this.remove = function(elment) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }
    // isEmpty 方法
    this.isEmpty = function() {
        return length == 0;
    }
    // size 方法
    this.size = function() {
        return length;
    }
    // getHead 方法
    this.getHead = function() {
        return head;
    }
}

```

### 双向链表（留给大家自己思考）

## 集合

> 集合是由一组无序且唯一（即不能重复）的项组合的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

```javascript
function Set() {
    let items = {};
    // has 方法
    this.has = function(value) {
        return items.hasOwnProperty(value);
    };
    // add 方法
    this.add = function(value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    }
    // remove 方法
    this.remove = function(value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    }
    // clear 方法
    this.clear = function() {
        items = {};
    }
    // size 方法
    this.size = function() {
        return Object.keys(items).length;
    }
    // values 方法
    this.values = function() {
        let values = [];
        for (let i = 0, keys = Object.keys(items); i< keys.length; i++) {
            values.push(items[keys[i]]);
        }
        return values;
    }
    // 并集
    this.union = function(otherSet) {
        let unionSet = new Set();

        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
    }

}
```