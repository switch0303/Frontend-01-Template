#### 本周学习主题

##### 工具链 | Dev 工具

- Dev 工具

  - Server
    - build: webpack babel vue jsx postcss...
    - watch: [fsevents](https://github.com/fsevents/fsevents/)
    - mock: ...
    - http: http-server
  - Client
    - debugger: vscode devtool
    - source map

- debugger 工具原理：
  - vscode 的 debugger 是客户端，node 是服务端
  - 两者通过 ws 进行通信
  - 具体是通过 node 的私有协议来定义，[相关 node 文档](https://nodejs.org/en/docs/guides/debugging-getting-started/)
  - 同理，chrome 的 devtool 中的 debugger，devtool 是客户端，webkit 是服务端，具体的协议[在此](https://chromedevtools.github.io/devtools-protocol/1-3/Debugger/)

##### 工具链 | 设计并实现一个单元测试工具

- 测试工具
  - 测试框架：
    - [mocha](https://mochajs.org/)
    - [ava](https://github.com/avajs/ava)
  - 代码覆盖率工具：
    - [nyc](https://www.npmjs.com/package/nyc)
      - 要支持 es6 module 时，需配置[@istanbuljs/nyc-config-babel](https://www.npmjs.com/package/@istanbuljs/nyc-config-babel)插件，或者使用[esm](https://github.com/jzhang026/esmodule-mocha-boilerplate)
