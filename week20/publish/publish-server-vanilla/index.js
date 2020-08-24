const http = require("http");
const https = require("https");
// const fs = require("fs");
const path = require("path");
const unzip = require("unzipper");

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

    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.end("okay");
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    // const matched = req.url.match(/filename=([^&]+)/);
    // const filename = matched && matched[1];
    // if (!filename) {
    // 	return;
    // }

    // const writeStream = fs.createWriteStream(
    // 	path.resolve(__dirname, "../server/public/" + filename)
    // );
    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }

    // if (!req.url.match(/^\/?/)) {
    //     res.writeHead(404, { "Content-Type": "text/plain" });
    //     res.end("not found");
    //     return;
    // }

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
        // console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);
        
        let body = "";
        response.on('data', (d) => {
            // console.log("data");
            body += d.toString();
        });
        response.on("end", () => {
            const user = JSON.parse(body);
            console.log(user.id);
            // 权限检查

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


});

server.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
