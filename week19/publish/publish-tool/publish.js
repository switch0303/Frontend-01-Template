const http = require("http");
// const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");

let packname = "./package";

// fs.stat(filename, (error, stat) => {
const options = {
	hostname: "127.0.0.1",
	port: 8081,
	path: "/?filename=" + "package.zip",
	method: "POST",
	headers: {
		"Content-Type": "application/octet-stream",
		// "Content-Length": stat.size,
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

// const readStream = fs.createReadStream(filename);
// readStream.pipe(req);
const archive = archiver("zip", {
	zlib: { level: 9 },
});

archive.directory(packname, false);

// archive.pipe(fs.createWriteStream("./package.zip"));

archive.finalize();

archive.pipe(req);

archive.on("end", () => {
	// Write data to request body
	// req.write(postData);
	req.end();
});
// });
