#### 本周学习主题

##### 重学CSS ｜ CSS动画与绘制


1. Animation
    * @keyframes定义：
        ```css
            @keyframes mykf
            {
                from {background: red;}
                to {background: yellow;}
            }
        ```
        
    * animation使用：
        ```css
            div {
                animation: mykf 5s infinite;
            }
        ```
    * animation属性：
        * animation-name @keyframes定义的名字
        * animation-duration 动画的时长
        * animation-timing-function 动画的时间曲线
        * animation-delay 动画开始前的延迟
        * animation-iteration-count 动画的播放次数
        * animation-direction 动画的方向
    * keyframes
        ```css
            @keyframes mykf
            {
                0% {top: 0; transition: top ease;}
                50% {top: 30px; transition: top ease-in;}
                75% {top: 10px; transition: top ease-out;}
                100% {top: 0; transition: top linear;}
            }
        ```
        
2. Transition
    * transition属性：
        * transition-property 要变换的属性
        * transition-duration 变换的时长
        * transition-timing-function 时间曲线
        * transition-delay 延迟
    * [cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67)

##### 重学CSS ｜ CSS渲染与颜色

1. 颜色
    * CMYK与RGB
    * HSL与HSV
2. 形状
    * border
    * box-shadow
    * border-radius
    * data uri + svg

##### 重学HTML ｜ HTML语言与扩展

1. HTML的定义：XML与SGML
    * DTD与XML namespace
        * [https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd](https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)
        * [https://www.w3.org/1999/xhtml/](https://www.w3.org/1999/xhtml/)
2. ENTITY
    * [https://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent)
    * [https://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent)
    * [https://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent)
    * 需要重点掌握的几个实体字符：
        ```html
            <!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
            <!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
            <!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
            <!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
        ```
            
##### 重学HTML ｜ HTML语义

* aside： 跟文章主体不那么相关的部分，它可能包含导航、广告等工具性质的内容
* hgroup： 标题组
* abbr： 缩写
* hr： 故事走向的转变或话题的转变
* blockquote： 段落级引述内容
* q： 行内引述内容
* cite： 引述的作品名
* time： 日期
* adress： 文章作者的联系方式
* figure, figcaption：插入文章中的内容，如图片、代码、表格等，可以用figure包裹起来，用figcaption表示内容的标题
* dfn：包裹被定义的名词
* nav：包裹链接到文章各个章节的目录
* samp：示例

##### 重学HTML ｜ HTML语法

* 合法元素
    * Element: <tagname>...</tagname>
    * Text: text
    * Comment: <!-- comments -->
    * DocumentType: <!Doctype html>
    * ProcessingInstruction: <?a 1?>
    * CDATA: <![CDATA[]]>
* 字符引用
    * \&#161;
    * \&amp;
    * \&lt;
    * \&quot;

##### 重学DOM ｜ DOM

* Browser API
    * DOM
        * DOM Tree
        * Events
        * Range
        * ~~Traversal~~
    * CSSOM
    * BOM
    * Web Animation
    * Crypto
    * ......

* Node
    * Element：元素型节点，跟标签相对应
        * HTMLElement
        * SVGElement
    * Document：文档根节点
    * CharacterData：字符数据
        * Text：文本节点
        * Comment：注释
        * ProcessingInstruction：处理信息
    * DocumentFragment：文档片段
    * DocumentType：文档类型

* 导航类操作
    * parentNode
    * childNodes
        * ⚠️childNodes是Living Collection，修改相应的dom时，会自动变更
    * firstChild
    * lastChild
    * nextSibling
    * previousSibling

* 修改操作
    * appendChild
    * insertBefore
        * ⚠️appendChild和insertBefore操作dom树中的原有节点时，相当于剪切操作，而不是复制
    * removeChild
    * replaceChild

* 高级操作
    * compareDocumentPosition 是一个用于比较两个节点中关系的函数
    * contains 检查一个节点是否包含另一个节点的函数
    * isEqualNode 检查两个节点是否完全相同
    * isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”
    * cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝

##### 重学DOM ｜ Event

* Event：冒泡与捕获
* [EventTarget.addEventListener\(\)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
    * target.addEventListener(type, listener [, options]);
target.addEventListener(type, listener [, useCapture]);
    * 第二个参数listener除了传function还可以传一个object
    * 第三个参数除了传boolean值，还可以传一个object，当object中包含值为true的passive属性时，将无法使用preventDefault()

#### 个人感悟

1. 对HTML语义化有了更深的了解。
2. 学习到了DOM API中的的高级操作部分以及addEventListener的参数的多样性。
