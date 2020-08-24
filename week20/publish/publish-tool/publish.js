const http = require("http");
const https = require("https");
// const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

const client_id = "Iv1.f5920a99e74bfde4";
const redirect_uri = encodeURIComponent("http://localhost:8081/auth");
const scope = "read%3Auser";
const state = "123abc";

const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
child_process.exec(`open ${url}`);

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
        // res.setEncoding("utf8");
        // res.on("data", (chunk) => {
        // 	console.log(`BODY: ${chunk}`);
        // });
        // res.on("end", () => {
        // 	console.log("No more data in response.");
        // });
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
        console.log("publish success!");
        response.end("publish success!")
        server.close();
    });
});

server.listen(8080);

console.log("Server running at http://127.0.0.1:8080/");
