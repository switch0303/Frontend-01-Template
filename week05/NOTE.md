#### 本周学习主题

##### 结构化

###### JavaScript执行粒度

* JavaScript Context => Realm
* 宏任务
* 微任务（Promise）
* 函数调用（Execution Context）
* 语句/声明
* 表达式
* 直接量/变量/this......

##### 浏览器工作原理 | HTTP协议

##### 浏览器从输入URL到展现页面的过程

URL ---HTTP---> HTML ---parse---> DOM ---css computing---> DOM with CSS ---layout---> DOM with position ---render---> Bitmap

##### ISO-OSI七层网络模型

| 七层 | 四层 | node |
| --- | --- | --- |
应用| HTTP | require('http') |  |
表示| HTTP |  require('http')|  |
会话| HTTP |  require('http')|  |
传输|  TCP| require('net') |  |
网络| Internet |  |  |
数据链路|  4G/5G/WIFI|  |  |
物理层|  4G/5G/WIFI|  |  |

##### TCP与IP


| TCP | IP |
| --- | --- |
流| 包 |  |
端口| IP地址 |  |
require('net')|libnet/libpcap(C++库)  |  |

###### 抓包工具
* WireShark

###### HTTP抓包工具
* Charles
* fiddler

##### HTTP

* Request
* Response

#### 个人感悟

1. JavaScript部分完结，其执行粒度从小到大的框架搭建完毕，方便后续知识点做定位。
2. 老师带我们实现了“玩具浏览器”的HTTP请求及对响应的解析部分，对浏览器的HTTP处理过程有了更直观的感受。
