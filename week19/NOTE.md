#### 本周学习主题

##### 工具链 | 目录结构与初始化工具

- 初始化工具核心原理：
  - 使用 [yeoman-generator](https://yeoman.io/authoring/index.html) 将模板文件拷贝到 待生成项目的目录下，并安装依赖
- 要点：

  - 目录结构：
    ```
    ├───package.json
    └───generators/
        ├───app/
            └───index.js
            └───templates/
    ```
  - package.json

    ```json
    {
    	"name": "generator-toytool",
    	"version": "1.0.0",
    	"description": "",
    	"main": "index.js",
    	"scripts": {
    		"test": "echo \"Error: no test specified\" && exit 1"
    	},
    	"author": "",
    	"license": "MIT",
    	"dependencies": {
    		"yeoman-generator": "^4.11.0"
    	}
    }
    ```

    上述 package.json 进行 `npm link` 操作后，即可以在命令行中使用 `yo toytool` 来生成项目，toytool 来自 package.json 中 name 字段， generator-后面的部分。

  - app/index.js

    ```javascript
    var Generator = require("yeoman-generator");

    module.exports = class extends Generator {
    	// The name `constructor` is important here
    	constructor(args, opts) {
    		// Calling the super constructor is important so our generator is correctly set up
    		super(args, opts);
    	}

    	collecting() {
    		this.log("collecting");
    	}

    	creating() {
    		this.fs.copyTpl(
    			this.templatePath("package.json"),
    			this.destinationPath("package.json"),
    			{ title: "project" }
    		);

    		this.fs.copyTpl(
    			this.templatePath("create.js"),
    			this.destinationPath("lib/create.js")
    		);
    		this.fs.copyTpl(
    			this.templatePath("gesture.js"),
    			this.destinationPath("lib/gesture.js")
    		);
    		this.fs.copyTpl(
    			this.templatePath("animation.js"),
    			this.destinationPath("lib/animation.js")
    		);

    		this.fs.copyTpl(
    			this.templatePath("main.js"),
    			this.destinationPath("src/main.js")
    		);

    		this.fs.copyTpl(
    			this.templatePath("index.html"),
    			this.destinationPath("src/index.html"),
    			{ title: "Templating with Yeoman" }
    		);

    		this.fs.copyTpl(
    			this.templatePath("main.test.js"),
    			this.destinationPath("test/main.test.js"),
    			{ title: "Templating with Yeoman" }
    		);

    		this.fs.copyTpl(
    			this.templatePath("webpack.config.js"),
    			this.destinationPath("webpack.config.js")
    		);

    		this.fs.copyTpl(
    			this.templatePath(".babelrc"),
    			this.destinationPath(".babelrc")
    		);

    		this.fs.copyTpl(
    			this.templatePath(".nycrc"),
    			this.destinationPath(".nycrc")
    		);

    		this.npmInstall(
    			[
    				"@babel/core",
    				"@babel/plugin-transform-react-jsx",
    				"@babel/preset-env",
    				"@babel/register",
    				"@istanbuljs/nyc-config-babel",
    				"babel-loader",
    				"babel-plugin-istanbul",
    				"webpack",
    				"webpack-cli",
    				"webpack-dev-server",
    				"html-webpack-plugin",
    				"mocha",
    				"nyc",
    			],
    			{
    				"save-dev": true,
    			}
    		);
    	}
    };
    ```

    使用 `this.fs.copyTpl` 来拷贝文件， 使用 `this.npmInstall` 来安装依赖。

##### 发布系统 | 实现一个线上 Web 服务

- 系统构成

  - server： 线上服务
  - publish-tool： 发布工具，向 publish-server 发起请求，完成发布
  - publish-server： 连接线上服务与发布工具，接受来自 publish-tool 的请求，并将文件发布到线上的 server 中

- 关键技术点
  - 使用 node 的流式（stream）能力，从而完成对大文件的处理
  - publish-tool 端使用 [archiver](https://www.npmjs.com/package/archiver) 将多个文件进行打包
  - publish-server 端使用 [unzipper](https://www.npmjs.com/package/unzipper) 对 publish-tool 发送过来的 zip 文件进行解压处理
