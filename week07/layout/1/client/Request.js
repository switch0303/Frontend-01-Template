const net = require('net');
const ResponseParser = require('./ResponseParser');

class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
Host: ${this.host}\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}\r\n`;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString());
                });
            }

            connection.on('data', (data) => {
                // console.log('data begin');
                // console.log(data.toString());
                // console.log('data end');
                parser.receive(data.toString());
                // resolve(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                }
                connection.end();
            });

            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });

            connection.on('end', () => {
                console.log('disconnected from server');
            });

        })
    }
}

module.exports = Request;
