const http = require("http");
const fs = require("fs");
const path = require("path");

// Create an HTTP server
const server = http.createServer((req, res) => {
	const matched = req.url.match(/filename=([^&]+)/);
	const filename = matched && matched[1];
	if (!filename) {
		return;
	}

	const writeStream = fs.createWriteStream(
		path.resolve(__dirname, "../server/public/" + filename)
	);
	req.pipe(writeStream);
	req.on("end", () => {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("okay");
	});
});

server.listen(8081);
