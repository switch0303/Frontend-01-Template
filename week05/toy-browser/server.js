const http = require('http');

let receivedCount = 0;
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req.headers);

    console.log('\n');
    receivedCount += 1;
    console.log(receivedCount);
    console.log('\n');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });

  server.listen(8088);
