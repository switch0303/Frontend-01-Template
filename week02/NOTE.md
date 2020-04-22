#### 本周学习主题

##### 一、编程语言通识

1. 形式语言（乔姆斯基谱系）与产生式（BNF）
    * 0型 无限制文法
    * 1型 上下文相关文法
    * 2型 上下文无关文法
    * 3型 正则文法
2. 图灵完备性
3. 动态与静态
4. 类型系统
    * 动态类型系统与静态类型系统
    * 强类型与弱类型
        * 强类型无隐式转换
    * 复合类型
        * 结构体
        * 函数签名
    * 子类型
        * 逆变/协变
5. 一般命令式编程语言可以看作由一系列由小到大的元素构成：
    * Atom
    * Expression
    * Statement
    * Structure
    * Program

##### 二、JavaScript词法与类型

1. ECMAScript源代码使用Unicode字符集，取值从U+0000到U+10FFFF

    ```
    SourceCharacter ::
        any Unicode code point
    ```
    * 此处涉及charCodeAt和codePointAt的区别：
        * 前者只支持U+0000到U+FFFF，即BMP（Basic Multilingual Plane）范围
        * 后者支持U+0000到U+10FFFF

2. JavaScript的最小输入元素**InputElement**可以分为:
    * WhiteSpace
    * LineTerminator
    * Comment
    * Token
        * Punctuator
        * IdentiferName
            * Identifer
                * 变量名
                * 属性（可以是关键字）
            * Keywords
            * FutureReservedWord： enum（只剩这一个） 
        * Literal
            * Number
            * String
            * Boolean
            * Null
            * Undefined

#### 个人感悟
1. 本周学到了两个对ECMAScript标准进行“解码”的工具：①产生式②Unicode字符编码，可以说它们是看懂标准的前提条件。
2. 将JavaScript（也可以是其它编程语言）拆解成了从小到大不同的元素：Atom、Expression、Statement、Structure、Program，一下子建立的清晰的结构，对应到ECMAScript标准中便可以按图索骥了。
