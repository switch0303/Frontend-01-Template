#### 本周学习主题

##### 一、JavaScript浮点数

##### 二、JavaScript Expression 表达式，类型转换

###### 语法

1. 语法树 vs 优先级
2. Expressions (ECMAScript标准P.201)
    * MemberExpression (返回的都是Reference类型)
        ```javascript
        a.b
        a[b]
        foo`string`
        super.b
        super['b']
        new.target
        new Foo()
        ```
        new.target可以用于判断构造函数是否被new调用
        ```javascript
        function foo() {
            if(new.target === foo) {
                console.log("new");
            }
            console.log(this);
        }
        ```
        
    * NewExpression
        * new Foo
        ```javascript
        function cls1(s){
            console.log("1", s);
        }
        function cls2(s) {
            console.log("2", s);
            return cls1;
        }
        
        new new cls2('a');
        // 2 a
        // 1 undefined
        ```
        
    * CallExpression
        ```javascript
            foo()
            super()
            foo().b
            foo()['b']
            foo()`abc`
        ```
        
     **一个例子感受上述三者的优先级（依次降低）**
     
    ```javascript
        new a()['b'] // new a() ---> ['b'] 两个member表达式
        new a['b']  // a['b'] ---> new 先member表达式再new表达式
    ```
    **Left-Hand-Side & Right-Hand-Side**
    * Example
        * a.b = c
        * a+b = c
    * Left-Hand-Side Expressions包含上述三种表达式，理论上CallExpression也可以被赋值，但没有一个环境这么实现
        ```javascript
            function foo(){ return {}; }
            foo() = 2;
            // Uncaught ReferenceError: Invalid left-hand side in assignment at <anonymous>:1:1
        ```
        
    * UpdateExpression (标准P.210)
        * a++
        * a--
        * ++a
        * --a
        **Notice**
        ```javascript
        // LeftHandSideExpression [no LineTerminator here] ++
        var a = 1, b = 1, c = 1;
        a
        ++
        b
        ++
        c;
        [a,b,c]
        // [1,2,2]
        ```
        
    * UnaryExpression
        * delete a.b
        * void foo()
        * typeof a
        * +a
        * -a
        * ~a
        * !a
        * await a

    * ExponentiationExpression
        * \**
        * 右结合运算符 3\**2**3 等价于 3\**(2**3)

    * MultiplicativeExpression
        * */%
    * AdditiveExpression
        * +-
    * ShiftExpression
        * << >> >>>
    * RelationalExpression
        * < > <= >= instanceof in
    * EqualityExpression
        * == != === !==
    * Bitwise
        * & ^ |
    * Logical
        * && ||
    * ConditionalExpression
        * ? :



###### 运行时

1. 类型转换（Type Conversion）
2. Boxing & Unboxing
    * toPrimitive
    * toString vs valueOf


##### 三、JavaScript Statement 语句

语法
* 简单语句
    * Expression Statement（标准P.263）
    * Empty Statement（P.262）
    * Debugger Statement（P.300）
    * Thorw Statement（P.296）
    * Continue Statement（P.281）
    * Break Statement（P.282）
    * Return Statement（P.282）
* 复合语句
    * Block Statement（P.244）
    * If Statement（P.263）
    * Switch Statement（P.284）
    * Iteration Statements（P.265）
    * With Statement（P.283）
    * Labelled Statements（P.292）
    * Try Statement（P.296）
* 声明
    * FunctionDeclaration（P.301）
    * GeneratorDeclaration（P.317）
    * AsyncFunctionDeclaration（P.335）
    * AsyncGeneratorDeclaration（P.323）
    * VariableStatement（P.252）
    * ClassDeclaration（P.328）
    * LexicalDeclaration（P.250）
    
    
运行时
* Completion Record（ECAMScript标准 P.44）

    | Field Name |Value  | Meaning |
    | --- | --- | --- |
   [[Type]] | One of normal, break, continue, return, or throw |The type of completion that occurred.  |  |
   [[Value]] | any ECMAScript language value or empty |The value that was produced.  |  |
    [[Target]] | any ECMAScript string or empty  |The target label for directed control transfers.  |  |
* Lexical Environment

##### 对象

* 任何一个对象都是**唯一**的，与它本身的状态无关；状态完全一致的两个对象并不相等
* 用**状态**来描述对象
* **状态的改变**即是**行为**

1. 对象的三要素：
* 唯一性（identifier）
* 状态（state）
* 行为（behavior）

2. Object-Class
    * 类是一种常见的描述对象的方式
    * “归类”和“分类”是两个主要的流派
        * 对于“归类”，多继承是非常自然的事情，比如C++
        * 采用分类思想的计算机语言，则是单继承结构，并且会有一个基类Object

3. Object-Prototype
    * 原型是一种更接近人类原始认知的描述对象的方法
    * 并不试图做严谨的分类，而是采用“相似”这样的方式去描述对象
    * 任何对象仅仅需要描述它自己与原型的区别即可

4. 面向对象设计原则
    * 在设计对象的状态和行为时，应该总是遵循“行为改变状态”的原则
    * 关于面向对象的书：[《面向对象分析与设计》](https://book.douban.com/subject/3892590/)

5. Object in JavaScript
    * 在JavaScript运行时，原生对象的描述方式非常简单，只需关心原型（[[Prototype]]）和属性(Property)两个部分
    * 属性是一对key value对
        * key可以是Symbol或String
        * value可以是数据型属性（Data Property）或访问器型属性（Accessor Property）
    * JavaScript用属性来统一抽象对象状态和行为
        * 一般来说，数据属性用于描述状态，访问器属性用于描述行为
        * 数据属性中如果存储函数，也可以用于描述行为
        * Data Property：
            * [[value]]
            * writable
            * enumerable
            * configurable
        * Accessor Property
            * get
            * set
            * enumerable
            * configurable

    * 当访问属性时，如果当前对象没有，则会沿着原型链找原型对象上是否有该属性，直到null上为止，这一算法保证了，每个对象只需要描述自己与原型的区别即可
6. Object API/Grammar
    * {} . [] Object.defineProperty
    * Object.create Object.setPrototypeOf Object.getPrototypeOf
    * new class extends
    * new function prototype

7. Function Object
    * JavaScript中有一些特殊的对象，比如函数对象
    * 函数对象有一个行为[[call]]
    * 用function关键字、箭头函数运算符或Function构造器创建的对象，会有[[call]]这个行为
    * 用类似f()这样的语法把对象当作函数调用时，会访问到[[call]]这个行为，如果对应的对象没有[[call]]行为，则会报错

8. Special Object（P.127）
    * Array[[length]]
    * Object.prototype[[setPrototypeOf]]
    * ......


#### 个人感悟

1. 受老师对“**对象**”这个概念的阐释启发，在工作中将原本的一堆有一定关联的function组织成了class，使得结构更加清晰，更具可读性。
2. 另外一个有启示意义的点就是：在设计对象的状态和行为时，应该总是遵循“行为改变状态”的原则。这同样是避免代码混乱的一个好方法。
