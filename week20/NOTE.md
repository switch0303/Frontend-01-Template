#### 本周学习主题

##### 发布系统 | lint与PhantomJS

* [PhantomJS](https://phantomjs.org/)
    * 可以用于测试dom结构是否正确

* [eslint](https://eslint.org/)
    * 用于检查JS代码风格

##### 发布系统 | OAuth

* [github相关文档](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

1. 在github上创建第三方应用，可参考[此链接](https://justauth.wiki/#/oauth/github)
2. publish-tool中首先让用户登录github并授权第一步中创建的应用，对应的代码如下：
    ```javascript
        const child_process = require("child_process");

        const client_id = "Iv1.f5920a99e74bfde4";
        const redirect_uri = encodeURIComponent("http://localhost:8081/auth");
        const scope = "read%3Auser";
        const state = "123abc";

        const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
        child_process.exec(`open ${url}`);
    ```
    
3. 如用户登录成功并授权，则会跳转到github中设置的callback url，并会带上github生成的code
4. github中设置的callback url，即publish-server所起服务的地址，publish-server会带上传过来的code，向github请求以拿到access_token，如成功拿到access_token，则会将access_token返还给publish-tool，相关代码如下：
    ```javascript
        function auth(req, res) {
            const code = req.url.match(/code=([^&]+)/)[1];
            const state = "123abc";
            const client_secret = "73c8af5cec9b86c9a471bcf7ebc767428b0e101f";
            const client_id = "Iv1.f5920a99e74bfde4";
            const redirect_uri = encodeURIComponent("http://localhost:8081/auth");

            const params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

            const options = {
                hostname: 'github.com',
                port: 443,
                path: `/login/oauth/access_token?${params}`,
                method: 'POST'
            };
            const request = https.request(options, (response) => {
                // console.log('statusCode:', response.statusCode);
                // console.log('headers:', response.headers);

                response.on('data', (d) => {
                    // process.stdout.write(d);
                    const result = d.toString().match(/access_token=([^&]+)/)
                    if (result) {
                        const token = result[1];
                        console.log(token);
                        res.writeHead(200, {
                            "access_token": token,
                            "Content-Type": "text/html"
                        });
                        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
                    } else {
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("error");
                    }
                });
            });

            request.on('error', (e) => {
                console.error(e);
            });
            request.end();
        }
    ```
    
5. publish-tool中所起的服务拿到access_token后才会带上access_token向publish-server发起真正的发布操作，相关代码如下：
    ```javascript
        let packname = "./package";

        const server = http.createServer((request, response) => {
            console.log("real publish!");
            const token = request.url.match(/token=([^&]+)/)[1];

            const options = {
                hostname: "127.0.0.1",
                port: 8081,
                path: "/?filename=" + "package.zip",
                method: "POST",
                headers: {
                    token,
                    "Content-Type": "application/octet-stream",
                },
            };

            const req = http.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            });

            req.on("error", (e) => {
                console.error(`problem with request: ${e.message}`);
            });

            const archive = archiver("zip", {
                zlib: { level: 9 },
            });

            archive.directory(packname, false);

            archive.finalize();

            archive.pipe(req);

            archive.on("end", () => {
                req.end();
                response.end("publish success!")
                server.close();
            });
        });

        server.listen(8080);
    ```
    
6. publish-server拿着access_token向github获取用户信息以判断该用户是否有权限进行发布，相关代码如下：
    ```javascript
            const options = {
                hostname: 'api.github.com',
                port: 443,
                path: `/user`,
                method: 'GET',
                headers: {
                    Authorization: `token ${req.headers.token}`,
                    "User-Agent": "toy-publish-server",
                },
            };
            const request = https.request(options, (response) => {

                let body = "";
                response.on('data', (d) => {
                    body += d.toString();
                });
                response.on("end", () => {
                    const user = JSON.parse(body);
                    console.log(user.id);
                    // 权限检查，以判断是否有权限进行发布，此处略过

                    const writeStream = unzip.Extract({
                        path: path.resolve(__dirname, "../server/public/"),
                    });
                    req.pipe(writeStream);
                    req.on("end", () => {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("okay");
                    });
                })
            });

            request.on('error', (e) => {
                console.error(e);
            });
            request.end();
    ```