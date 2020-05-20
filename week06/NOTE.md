#### 本周学习主题

##### 浏览器工作原理 | 有限状态机

###### 什么是有限状态机？

* 有限状态机一般指有限状态自动机（FSM "finite state machine" 或者 FSA "finite state automaton"），有限状态机拥有有限数量的状态，每个状态可以迁移到零个或多个状态，输入字串决定执行哪个状态的迁移。有限状态自动机可以表示为一个有向图。

###### 有限状态机的应用

* 构建游戏中敌人的AI
* 编译原理中构建AST
* 实现正则表达式
* 学界也经常用有限状态机来描述一些算法

###### 有限状态机的特点

* 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算、存储、输出
    * 所有的这些机器接受的输入都是一致的
    * 状态机的每一个机器本身没有状态，如果用函数表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（[Mealy](https://zh.wikipedia.org/wiki/%E7%B1%B3%E5%88%A9%E5%9E%8B%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)）

###### 有限状态机处理字符串

* 在一个字符串中，找到字符"a"
    
    ```javascript
        // 在一个字符串中，找到字符"a"
        function match(string) {
            for (let c of string) {
                if (c === "a") {
                    return true;
                }
            }
            return false;
        }

        console.log(match("I am groot"));

    ```
* 在一个字符串中，找到字符"ab"

    
    ```javascript
        // 在一个字符串中，找到字符"ab"
        function match(string) {
            let foundA = false;
            for (let c of string) {
                if (c === "a")
                    foundA = true;
                else if(foundA && c === "b")
                    return true;
                else
                    foundA = false;
            }
            return false;
        }

        console.log(match("I am groot"));
        console.log(match("I abm groot"));
        console.log(match("I acbm groot"));

    ```
* 在一个字符串中，找到字符"abcdef"

    
    ```javascript
        // 在一个字符串中，找到字符"abcdef"
        function match(string) {
            let foundA = false;
            let foundB = false;
            let foundC = false;
            let foundD = false;
            let foundE = false;
            for (let c of string) {
                if (c === "a")
                    foundA = true;
                else if (foundA && c === "b")
                    foundB = true;
                else if (foundB && c === "c")
                    foundC = true;
                else if (foundC && c === "d")
                    foundD = true;
                else if (foundD && c === "e")
                    foundE = true;
                else if (foundE && c === "f")
                    return true;
                else {
                    foundA = false;
                    foundB = false;
                    foundC = false;
                    foundD = false;
                    foundE = false;
                }
            }
            return false;
        }

        console.log(match("I ambcdef groot"));
        console.log(match("I abcdefm groot"));

    ```

###### JavaScript中的有限状态机（Mealy）

```javascript
    // 每个函数是一个状态
    function state(input) // 函数参数就是输入
    {
        // 在函数中可以自由地编写代码，处理每个状态的逻辑
        return next; // 返回值作为下一个状态
    }
    
    // 以下是调用
    while(input) {
        // 获取输入
        state = state(input); // 把状态机的返回值作为下一个状态
    }
```

###### 使用状态机实现上上小节中的例3：在一个字符串中，找到字符"abcdef"

```javascript
    // 在一个字符串中，找到字符"abcdef"
    // 使用状态机实现
    function match(string) {
        let state = start;
        for (let c of string) {
            state = state(c);
        }
        return state === end;
    }

    function start(c) {
        if (c === "a")
            return foundA;
        else
            return start;
    }

    function end(c) {
        return end;
    }

    function foundA(c) {
        if (c === "b")
            return foundB;
        else
            return start(c);
    }

    function foundB(c) {
        if (c === "c")
            return foundC;
        else
            return start(c);
    }

    function foundC(c) {
        if (c === "d")
            return foundD;
        else
            return start(c);
    }

    function foundD(c) {
        if (c === "e")
            return foundE;
        else
            return start(c);
    }

    function foundE(c) {
        if (c === "f")
            return end;
        else
            return start(c);
    }

    console.log(match("I ambcdef groot"));
    console.log(match("I abcdefm groot"));
    console.log(match("I aabcdefm groot"));

```


##### 浏览器工作原理 | HTML的解析

1. 拆分文件
    * 将parser单独拆到文件中，方便文件管理
    * parser接受HTML文本作为参数，返回一颗DOM树
    
2. 创建状态机

    * 用FSM来实现HTML的解析
    * 在[HTML标准](https://html.spec.whatwg.org/multipage/parsing.html#before-attribute-name-state)中，已经规定了HTML的状态
    * Toy-Browser只挑选其中一部分状态，完成一个最简版本
    
3. 解析标签

    * 主要的标签有：开始标签、结束标签和自闭合标签
    * 在这一步暂时先忽略对属性的解析（到第5步时再处理）

4. 创建元素

    * 在状态机中，除了状态迁移，还要加入业务逻辑
    * 在标签结束状态提交标签token

5. 处理属性

    * 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
    * 处理属性的方式跟标签类似
    * 属性结束时，将属性加到标签token上
    
6. 构建DOM树

    * 从标签构建DOM树的基本技巧是使用**栈**，
    * 遇到开始标签时，创建元素并入栈，遇到结束标签时则出栈
    * 自闭合标签可以视为入栈后立刻出栈
    * 任何元素的父元素是它**入栈前**的栈顶
    
7. 文本节点

    * 文本节点与自闭合标签处理类似
    * 多个文本节点需要闭合

##### 浏览器工作原理 | CSS计算

###### 环境准备 npm install css

###### 步骤

1. 收集CSS规则
    * 遇到style标签时，把CSS规则保存起来
    * 调用[CSS Parser](https://www.npmjs.com/package/css)来分析CSS规则
    * 必须要仔细研究[此库](https://www.npmjs.com/package/css)分析CSS规则的格式
    
2. 添加调用
    * 当我们创建一个元素后，立即计算CSS
    * 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
    * 在真实浏览器中，可能遇到写在body的style标签，需要重新进行CSS计算的情况，这里我们直接忽略
    
3. 获取父元素序列
    * 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
    * 我们从上一步的stack，可以获取本元素的所有父元素
    * 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是**从内向外**
        * div div #myid 其中的#myid一定匹配当前元素
        
4. 拆分选择器
    * 选择器也要从当前元素向外排列
    * 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
    
5. 计算选择器与元素匹配
    * 根据选择器的类型和元素属性，计算是否与当前元素匹配
    * 这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
    
6. 生成computed属性
    * 一旦选择匹配，就应用选择器到元素上，形成computedStyle
    
7. 确定规则覆盖关系
    * CSS规则根据 [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) 和后来优先规则覆盖
    * specificity 是个四元组，越左边权重越高
    * 一个CSS规则的 specificity 根据包含的简单选择器相加而成
    
    
#### 个人感悟

1. 学习了有限状态机这种编码模式。
2. 通过代码加深了对浏览器解析HTML与计算CSS的过程的理解。

