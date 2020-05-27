#### 本周学习主题

##### 浏览器工作原理 ｜ 排版

* 浏览器里的三代排版技术
    1. 正常流
        * display: block | inline-block | block
        * position: absolute ｜ relative
        * float、clear
    2. Flex（本次实现，相对最简单）
    3. Grid

* 步骤
    1. 抽象方向为主轴、交叉轴
        * flex-direction: row
            * Main:  width x left right
            * Cross: height y top bottom
        * flex-direction: column
            * Main:  height y top bottom
            * Cross: width x left right

    2. 收集元素进行(hang)
        * 分行
            * 根据主轴尺寸，把元素分进**行**
            * 若设置了no-wrap，则强行分配进第一行

    3. 计算主轴
        * 计算主轴方向
            * 找出所有flex元素
            * 把主轴方向的剩余尺寸按比例分配给这些元素
            * 若剩余空间为负数，则所有flex元素为0，等比压缩剩余元素

    4. 计算交叉轴
        * 计算交叉轴方向
            * 根据每一行中最大元素尺寸计算行高
            * 根据行高flex-align和item-align，确定元素具体位置


##### 浏览器工作原理 ｜ 绘制

* 步骤
    1. 绘制单个元素
        * 绘制需要依赖一个图形环境
        * 这里采用了npm包[images](https://www.npmjs.com/package/images)
        * 绘制在一个viewport上进行
        * 与绘制相关的属性：background-color、border、background-image等
    2. 绘制DOM
        * 递归调用子元素的绘制方法完成DOM树的绘制
        * 忽略一些不需要绘制的节点
        * 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
        * 实际浏览器中，还会对一些图层做compositing，这里也忽略


##### 重学CSS ｜ CSS基本语法，CSS基础机制

1. CSS语法的研究
    * CSS2.1的语法
        * [https://www.w3.org/TR/CSS21/grammar.html#q25.0](https://www.w3.org/TR/CSS21/grammar.html#q25.0)
        * [https://www.w3.org/TR/css-syntax-3/](https://www.w3.org/TR/css-syntax-3/)
    * CSS总体结构
        * @charset
        * @import
        * rules
            * @media
            * @page
            * rule

2. CSS @规则的研究
    * [At-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)
        * @charset: [https://www.w3.org/TR/css-syntax-3/#charset-rule](https://www.w3.org/TR/css-syntax-3/#charset-rule)
        * @import: [https://www.w3.org/TR/css-cascade-4/#at-import](https://www.w3.org/TR/css-cascade-4/#at-import)
        * @media: [https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
        * @page: [https://www.w3.org/TR/css-page-3/#at-page-rule](https://www.w3.org/TR/css-page-3/#at-page-rule)
        * @counter-style: [https://www.w3.org/TR/css-counter-styles-3/](https://www.w3.org/TR/css-counter-styles-3/)
        * @keyframes: [https://www.w3.org/TR/css-animations-1/](https://www.w3.org/TR/css-animations-1/)
        * @font-face: [https://www.w3.org/TR/css-fonts-3/](https://www.w3.org/TR/css-fonts-3/)
        * @supports: [https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
        * @namespace: [https://www.w3.org/TR/css-namespaces-3/](https://www.w3.org/TR/css-namespaces-3/)

3. CSS规则的结构
    * CSS规则
        * Selector
            * [https://www.w3.org/TR/selectors-3/](https://www.w3.org/TR/selectors-3/)
            * [https://www.w3.org/TR/selectors-4/](https://www.w3.org/TR/selectors-4/)
        * Key
            * Properties
            * Variables: [https://www.w3.org/TR/css-variables/](https://www.w3.org/TR/css-variables/)
        * Value
            * [https://www.w3.org/TR/css-values-4/](https://www.w3.org/TR/css-values-4/)

4. 初建CSS知识体系
    * 收集CSS标准
        * 在 [https://www.w3.org/TR/?tag=css](https://www.w3.org/TR/?tag=css) 页面，通过寻找规律后，使用下面的代码获取CSS标准的名字与链接
        ```javascript
            var lis = document.getElementById("container").children
            var result = [];

            for(let li of lis) {
                if(li.getAttribute('data-tag').match(/css/))
                    result.push({
                        name:li.children[1].innerText,
                        url:li.children[1].children[0].href
                    })
            }
            console.log(result)
        ```
        
    * 收集CSS属性相关标准
        * 在 https://www.w3.org/TR/2020/WD-css-position-3-20200519/ 页面下，对上一步获得的CSS标准页面进行爬虫
        ```javascript
            const iframe = document.createElement("iframe");
            document.body.innerHTML = "";
            document.body.appendChild(iframe);

            function happen(element, event){
                return new Promise(function(resolve){
                    let handler = () => {
                        resolve();
                        element.removeEventListener(event, handler);
                    }
                    element.addEventListener(event, handler);
                })
            }

            void async function(){
                // standards为上一步获得的结果
                for (let standard of standards) {
                    iframe.src = standard.url;
                    console.log(standard.name);
                    await happen(iframe, "load");
                }
            }();
        ```
        
#### 个人感悟

1. 通过对浏览器排版原理的理解可以更好地学习CSS的布局。
2. 通过对CSS知识体系的搭建，再次感受到知识框架的重要性。
