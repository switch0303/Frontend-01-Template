#### 本周学习主题

##### 结构化

##### 事件循环

* 事件循环不属于JavaScript引擎实现的东西，而是由浏览器或node js宿主环境实现的

##### 宏任务与微任务

* setTimeout会产生宏任务
* 每个宏任务里有一个微任务列表，列表里的所有微任务执行完才会执行下一个宏任务
* Promise的then方法以及async函数里的await会将一个微任务入队，微任务列表里的微任务按入队顺序执行

##### 代码示例

```javascript
async function afoo(){
    console.log("1");
    await new Promise(resolve => resolve());
    console.log("2");
}

new Promise(resolve => (console.log("3"), resolve()))
    .then(()=>(
        console.log("4"), 
        new Promise(resolve => resolve())
            .then(() => console.log("5")) ));

setTimeout(function(){
    console.log("6");
    new Promise(resolve => resolve()) .then(console.log("7"));
}, 0);
console.log("8");
console.log("9");
afoo();

// 3
// 8
// 9
// 1
// 4
// 2
// 5
// 6
// 7
```

解析：
* 第一个宏任务：
    * 3
        * 入队 4
    * 8
    * 9
    * 1
        * 入队 2
    * 4
        * 入队 5
    * 2
    * 5
* 第二个宏任务：
    * 6
        * 入队 7
    * 7

##### 与ECMAScript相关的章节
* RunJobs（P.104）
    
#### 个人感悟

本节课老师使用Objective-C的EvaluateScript来模拟JavaScript环境中的事件循环，事件循环的本质是在一个while(true){}的循环体里不断地接收传过来的JavaScript代码，然后执行，每次EvaluateScript都会产生一个**宏任务**。
P.S.老师采用的这种外部视角教学法不失为一个教学的好例子。
