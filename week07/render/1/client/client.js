const images = require("images");
const Request =  require('./Request');
const parser = require('../parser');
const render = require("../render");

void async function() {
    const request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 8088,
        headers: {
            'Y-Foo': 'bar',
        },
        body: {
            name: 'link.w',
        },
    });
    
    const res = await request.send();
    const dom = parser.parseHTML(res.body);
    console.log(JSON.stringify(dom, null, 4));

    const viewport = images(800, 600);

    render(viewport, dom.children[0].children[3].children[1].children[1]);

    viewport.save("viewport.jpg");
    
}();

// const client = net.createConnection({
//     host: '127.0.0.1',
//     port: 8088
// },
// () => {
//         // 'connect' listener.
//         console.log('connected to server!');

//         const request = new Request({
//             method: 'POST',
//             host: '127.0.0.1',
//             port: 8088,
//             headers: {
//                 'Y-Foo': 'bar',
//             },
//             body: {
//                 name: 'link.w',
//             },
//         })
//         console.log(request.toString());
//         client.write(request.toString());
// //         client.write(
// //             `POST / HTTP/1.1\r
// // Host: 127.0.0.1\r
// // Content-Length: 10\r
// // Content-Type: application/x-www-form-urlencoded\r
// // \r
// // field1=aaa\r\n`
// // );
// }
// );

// client.on('data', (data) => {
//     console.log(data.toString());
//     client.end();
// });

// client.on('end', () => {
//     console.log('disconnected from server');
// });
