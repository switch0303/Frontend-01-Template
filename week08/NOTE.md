#### 本周学习主题

##### 重学CSS ｜ CSS基本语法，CSS基础机制（二）

###### 选择器

1. 选择器语法
    * 简单选择器
        * \*
        * div svg|a
        * .cls
        * #id
        * [attr=value]
        * :hover
        * ::before
    * 复合选择器
        * <简单选择器><简单选择器><简单选择器>
        * *或者div必须写在最前面
    * 复杂选择器
        * <复合选择器><sp><复合选择器>
        * <复合选择器>">"<复合选择器>
        * <复合选择器>"~"<复合选择器>
        * <复合选择器>"+"<复合选择器>
        * <复合选择器>"||"<复合选择器>

2. 选择器优先级
    * [简单选择器计数](https://drafts.csswg.org/selectors-3/#specificity)
        * #id div.a#id    [0,2,1,1]
    * [a,b,c,d]
        * a对应inline style，即写在style=“”里的样式属性
        * b对应id选择器的数量
        * c对应类、属性、伪类选择器的数量
        * d对应标签和伪元素选择器的数量
        * *、:not()不参与计算优先级的权重
    * 权重计算
        * S = a * (N ** 3) + b * (N ** 2) + c * N + d;
        * N取一个足够大的整数，比如1000000
    * 小练习
        * 写出下面选择器的优先级
            * div#a.b .c[id=x] -----> [0,1,3,1]
            * #a:not(#b) ----> [0,2,0,0]
            * *.a ----> [0,0,1,0]
            * div.a ----> [0,0,1,1]
    * [关于权重计算的图解](https://specifishity.com/)

3. 伪类
    * 链接/行为
        * :any-link
        * :link
        * :visited
        * :hover
        * :active
        * :focus
        * :target
    * 树结构
        * :empty
        * :nth-child()
        * :nth-last-child()
        * :first-child :last-child :only-child
    * 逻辑型
        * :not()
        * :where() :has()

4. 伪元素
    * ::before
    * ::after
    * ::first-line
    * ::first-letter
    * 可用属性
        * ::first-line可用属性：
            * font系列
            * color系列
            * background系列
            * word-spacing
            * letter-spacing
            * text-decoration
            * text-transform
            * line-height
        * ::first-letter可用属性：
            * font系列
            * color系列
            * background系列
            * word-spacing
            * letter-spacing
            * text-decoration
            * text-transform
            * line-height
            * **float**
            * **vertical-align**
            * **盒模型系列：margin、padding、border**
        * 思考：为什么first-letter可以设置float，而first-line不行？
            * first-line设置了float会导致脱离文档流而使得下一行变成first-line，从而导致无限循环。
        * 思考：first-line为什么可以设置font系列，因为改变字体大小也会影响fist-line的范围？
            * 因为文字是一个一个进行排版的，first-line关于文字的属性会应用到文字上，直到排完第一行为止。


##### 重学CSS ｜ 排版

1. 盒（Box）—— 排版和渲染的基本单位
    * 标签（Tag） —— 源代码
    * 元素（Element） —— 语义
    * 盒（Box） —— 表现
    * HTML代码中可以书写开始**标签**，结束**标签**和自闭合**标签**。
    * 一对起止**标签**，表示一个**元素**。
    * DOM树中存储的是**元素**和其它类型的节点（Node）。
    * CSS选择器选中的是**元素**。
    * CSS选择器选中的**元素**，在排版时可能产生多个**盒**。
        * inline元素有多行的情况会产生多个盒
        * 带伪元素（::before ::after :: first-letter）的情况会产生多个盒
    * 排版和渲染的基本单位是**盒**。

2. [盒模型](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)

3. 正常流
    * 正常流排版
        * 收集**盒**进行
        * 计算盒在行中的排布
        * 计算行的排布
    * IFC（inline formatting context）
    * BFC（block formatting context）
    * 正常流的行模型
    * 扩展：
        * [Element.getClientRects\(\)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects)

4. float与clear
5. margin折叠
    * 只会发生在[BFC](https://www.w3.org/TR/CSS21/visuren.html#block-formatting)里
6. overflow:visible与[BFC](https://www.w3.org/TR/CSS21/visuren.html#block-formatting)
    * block-level 表示可以被放入 bfc
        * display: flex | table | block
    * block-container 表示可以容纳 bfc
        * display: block | inline-block
    * block-box = block-level && block-container
        * display: block
    * block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并


7. [Flex](https://www.w3.org/TR/css-flexbox-1/)排版
    * 收集盒进行
        * 根据主轴尺寸，把元素分进行
        * 若设置了no-wrap，则强行分配进一行
    * 计算盒在主轴方向的排布
        * 找出所有Flex元素
        * 把主轴方向的剩余尺寸按比例分配给这些元素
        * 若剩余空间为负数，所以Flex元素为0，等比压缩剩余元素
    * 计算盒在交叉轴方向的排布
        * 根据每一行中最大元素尺寸计算行高
        * 根据行高flex-align和item-align，确定元素具体位置

8. Grid
    * [Grid by Example](https://gridbyexample.com/examples/)

#### 个人感悟
1. 概念的缺失会对现象的理解产生障碍。
2. 本周课程学到的两个重要概念是**行模型**和**BFC**。
    1. 一个inline元素有多行的情况其实就是产生了多个盒，一个盒就是一个行模型。
    2. BFC在block-box的overflow设为visible的情况下，会跟父BFC产生合并，margin折叠只会发生在BFC里，众多的意外现象背后其实就是BFC。
    