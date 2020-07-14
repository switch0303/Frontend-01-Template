#### 本周学习主题

##### 组件化 | 为组件添加JSX语法
* 参考链接
    * [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)
    * [https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/)
    * [https://github.com/babel/babel-loader](https://github.com/babel/babel-loader)
    * [https://facebook.github.io/jsx/](https://facebook.github.io/jsx/)
* 使用 webpack 和 babel-loader 插件来解析 JSX 语法
    * webpack.config.js
        ```javascript
            module.exports = {
                entry: "./main.js",
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["@babel/preset-env"],
                                    plugins: [
                                        [
                                            "@babel/plugin-transform-react-jsx", 
                                            {pragma: "create"}
                                        ]
                                    ]
                                }
                            }
                        }
                    ]
                },
                mode: "development",
                optimization: {
                    minimize: false
                }
            };
        ```
        
##### 组件化 | 轮播组件

* 架子代码
    ```javascript
            class Carousel {
                constructor(){
                    this.root = null;
                    this.data = null;
                }
                render() {
                    this.root = document.createElement("div");
                }
            }

            //create
            let carousel = new Carousel();

            //update
            carousel.data = [
                "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
                "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
                "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
                "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
            ];
            carousel.render();

            //mount
            document.getElementById("container").appendChild(carousel.root);
    ```
    
* 自动轮播
    ```javascript
                let position = 0;

                let nextPic = () => {
                    let nextPosition = (position + 1) % this.data.length;

                    let current = this.root.childNodes[position];
                    let next = this.root.childNodes[nextPosition];

                    // 移动到起始位置时关闭动画
                    current.style.transition = "ease 0s";
                    next.style.transition = "ease 0s";
                    // 动画的起始位置
                    current.style.transform = `translateX(${-100 * position}%)`;
                    next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

                    // 使用setTimeout，使得动画的transition能生效
                    setTimeout(function() {
                        // 移动到终止位置时开启动画
                        current.style.transition = ""; // 置为“”来使用css中的transition
                        next.style.transition = "";
                        // 动画的终止位置
                        current.style.transform = `translateX(${-100 - 100 * position}%)`;
                        next.style.transform = `translateX(${-100 * nextPosition}%)`;
                        
                        position = nextPosition;
                        // console.log(position);
                    }, 16);

                    setTimeout(nextPic, 2000);
                }
                setTimeout(nextPic, 2000);
    ```
    
* 拖拽轮播
    ```javascript
                    this.root.addEventListener("mousedown", event => {
                    let startX = event.clientX;
                    let startY = event.clientY;

                    let nextPosition = (position + 1) % this.data.length;
                    let lastPosition = (position - 1 + this.data.length) % this.data.length;

                    let current = this.root.childNodes[position];
                    let next = this.root.childNodes[nextPosition];
                    let last = this.root.childNodes[lastPosition];

                    current.style.transition = "ease 0s";
                    next.style.transition = "ease 0s";
                    last.style.transition = "ease 0s";

                    current.style.transform = `translateX(${-500 * position}px)`;
                    next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
                    last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
                    
                    let move = event => {
                        current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                        next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
                        last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;

                        // console.log(event.clientX - startX, event.clientY - startY);
                    };

                    let up = event => {
                        let offset = 0;

                        if (event.clientX - startX > 250) {
                            offset = 1;
                        } else if (event.clientX - startX < -250) {
                            offset = -1;
                        }

                        // console.log("offset", offset);

                        current.style.transition = ""; // 置为“”来使用css中的transition
                        next.style.transition = "";
                        last.style.transition = "";

                        
                        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;
                        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                        
                        position = (position - offset + this.data.length) % this.data.length;

                        document.removeEventListener("mousemove", move);
                        document.removeEventListener("mouseup", up);
                    };

                    document.addEventListener("mousemove", move);
                    document.addEventListener("mouseup", up);
                });
    ```
    