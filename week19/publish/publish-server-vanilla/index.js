const http = require("http");
// const fs = require("fs");
const path = require("path");
const unzip = require("unzipper");

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

	const writeStream = unzip.Extract({
		path: path.resolve(__dirname, "../server/public/"),
	});
	req.pipe(writeStream);
	req.on("end", () => {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("okay");
	});
});

server.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
