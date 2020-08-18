const http = require("http");
// const querystring = require("querystring");
const fs = require("fs");

let filename = "./cat.jpg";

fs.stat(filename, (error, stat) => {
	const options = {
		hostname: "127.0.0.1",
		port: 8081,
		path: "/?filename=" + filename,
		method: "POST",
		headers: {
			"Content-Type": "application/octet-stream",
			"Content-Length": stat.size,
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

	const readStream = fs.createReadStream(filename);
	readStream.pipe(req);
	req.on("error", (e) => {
		console.error(`problem with request: ${e.message}`);
	});
	readStream.on("end", () => {
		// Write data to request body
		// req.write(postData);
		req.end();
	});
});
