#### 本周学习主题

##### 编程与算法训练 ｜ 异步编程

* 红绿灯问题：一个路口的红绿灯，会按照绿灯亮10秒，黄灯亮2秒，红灯亮5秒的顺序无限循环，请编写JS代码来控制这个红绿灯。
    * callback
        ```html
            <style>
                div {
                    background-color:grey;
                    display:inline-block;
                    margin:30px;
                    width:100px;
                    height:100px;
                    border-radius: 50px;;
                }
                .green.light {
                    background-color:green;
                }
                .yellow.light {
                    background-color:yellow;
                }
                .red.light {
                    background-color:red;
                }
            </style>

            <div class="green"></div>
            <div class="yellow"></div>
            <div class="red"></div>

            <script>
                function green(){
                    var lights = document.getElementsByTagName("div");
                    for(var i = 0; i < 3; i++)
                        lights[i].classList.remove("light")
                    document.getElementsByClassName("green")[0].classList.add('light')
                }
                function red(){
                    var lights = document.getElementsByTagName("div");
                    for(var i = 0; i < 3; i++)
                        lights[i].classList.remove("light")
                    document.getElementsByClassName("red")[0].classList.add('light')
                }
                function yellow(){
                    var lights = document.getElementsByTagName("div");
                    for(var i = 0; i < 3; i++)
                        lights[i].classList.remove("light")
                    document.getElementsByClassName("yellow")[0].classList.add('light')
                }

                function go(){
                    green()
                    setTimeout(function(){
                        yellow()
                        setTimeout(function(){
                            red()
                            setTimeout(function(){
                                go()
                            }, 5000);
                        }, 2000);
                    }, 10000);
                }

                go();
            </script>
        ```
    * Promise
        ```javascript
            function sleep(t) {
                return new Promise((resolve, reject)=> {
                    setTimeout(resolve, t);
                })
            }

            function go(){
                green()
                sleep(10000).then(() => {
                    yellow();
                    return sleep(2000);
                }).then(() => {
                    red();
                    return sleep(5000);
                }).then(go)
            }

            go();
        ```
    * async/await
        ```javascript
            function sleep(t) {
                return new Promise((resolve, reject)=> {
                    setTimeout(resolve, t);
                })
            }

            async function go(){
                while(true) {
                    green();
                    await sleep(10000);
                    yellow();
                    await sleep(2000);
                    red();
                    await sleep(5000);
                }
            }
            
            go();
        ```
* JavaScript的异步机制
    * callback
        * 存在回调地狱问题
    * Promise
        * 变成链式调用，有所改进
    * async/await
        * 用同步的方式写异步代码，推荐使用

* 扩展
    * async/await代码方便修改，比如上述红绿灯问题中将需求改为手动控制红绿灯变化，代码如下：
        ```javascript
            function happen(element, eventName){
                return new Promise((resolve, reject)=> {
                    element.addEventListener(eventName, resolve, {once:true});
                })
            }

            async function go(){
                while(true) {
                    green();
                    await happen(document.getElementById('next'), 'click');
                    yellow();
                    await happen(document.getElementById('next'), 'click');
                    red();
                    await happen(document.getElementById('next'), 'click');
                }
            }

            go();
        ```
    * 在async/await诞生之前，曾经有用generator书写的异步代码，但这属于历史过渡期，并非generator的原本用法，在现阶段已不推荐使用，代码如下：
        ```javascript
            function* go(){
                while(true){
                    green();
                    yield sleep(10000)
                    yellow();
                    yield sleep(2000)
                    red();
                    yield sleep(5000)
                }
            }

            function run(iterator){
                let {value, done} = iterator.next();
                if(done)
                    return;
                if(value instanceof Promise)    
                    value.then(() => {
                        run(iterator)
                    })
            }

            function co(generator){
                return function(){
                    return run(generator());
                }
            }

            go = co(go);

            go();
        ```
    * [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
        ```javascript
            function sleep(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }

            async function* g() {
                let i = 0;
                while(true) {
                    await sleep(1000);
                    yield i++;
                }
            }

            async function go() {
                for await(let v of g()) {
                    console.log(v);
                }
            }

            go();
        ```
        
##### 编程与算法训练 ｜ 寻路问题（搜索）
1. 实现100*100的地图编辑器
    * 数据结构采用一维数组
        * 如何创建10000个元素的数组
            * new Array(10000).fill(0)
            * 没有fill的年代：new Array(10001).join(0).split("").map(i => Number(i))
    * 按住鼠标左键时可以绘图
        * 添加事件
            * mousedown时标识位mouse置为true
            * mouseup时置为false
            * mouse为true时，mouseover会触发绘制
    * 按住鼠标右键时可以擦除
        * [event.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)为2时表示点击了鼠标右键
        * 增加一个标识位clear
    * 保存地图
        * 使用localStorage

2. 编写path函数，判断坐标点start能否到达坐标点end
3. 在path函数中加入动画，使寻路过程可视化
4. 改造path函数为findPath函数，找到路径的所有坐标点
5. 寻路时增加启发函数，每次都沿着与重点最短距离的方向寻找，为此增加Sorted数据结构
6. 使用BinaryHeap数据结构替换Sorted数据结构，进一步降低时间复杂度

##### 编程训练 ｜ 正则表达式

* 正则相关的API
    * match
    * replace
    * ()捕获
    * (?:)不捕获
    * exec
    * lastIndex

#### 个人感悟

1. 学习了寻路问题的解法，收获了将一种算法可视化的方法
2. 学习了正则的exec的使用方法和应用
