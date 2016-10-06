/*

var http= require('http');

module.exports=httpProxyServer = http.createServer( (req, res) => {
    console.log("create server in ");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
    console.log("server created",httpProxyServer);
}).on('connect', (req, cltSocket, head) => {


        console.log("after connecting via proxy");

        var srvUrl = url.parse(`http://${req.url}`);
        var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
            cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-agent: Node.js-Proxy\r\n' +
                '\r\n');
            srvSocket.write(head);
            srvSocket.pipe(cltSocket);
            cltSocket.pipe(srvSocket);

        });

});

console.log("after connecting httpProxyServer");
httpProxyServer.listen(1337, '127.0.0.1', () => {

    var options = {

        hostname: '127.0.0.1',
        port: 1337,
        path: 'https://www.e-piotripawel.pl/klient/logowanie',
        headers:{
            host:"oneclick.com",
            'User-Agent':'Node.js/0.6.6'
        },
        method:'POST'

    };
    var req = http.request(options);
    req.end();

    req.on('connect', (res, socket, head) => {
        console.log('got connected!');

        // make a request over an HTTP tunnel
        socket.write('GET / HTTP/1.1\r\n' +
            'Host:piotr pawel :443\r\n' +
            'Connection: close\r\n' +
            '\r\n');
        socket.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        socket.on('end', () => {
            httpProxyServer.close();
        });
    });
});

console.log("End of file httpProxyServer");



/!*
http.createServer(function (request, response) {
    console.log("in servser")
    var proxy=http.createClient(80,request.headers['http://www.catonmat.net/http-proxy-in-nodejs/']);
    var proxy_request=proxy.request(request.method, request.url,request.headers);
    proxy_request.addListener('response',function (proxy_response){
        proxy_response.addListener('data', function (chunk) {
            response.write(chunk,'binary');
        });
        proxy_response.addListener('end',function () {
            response.end();
        });
        response.writeHead(proxy_response.statusCode, proxy_response.headers)
    });
    request.addListener('data', function(chunk){
        proxy_request.write(chunk,'binary')
    });
    console.log("in server")
    request.addListener('end',function () {
        proxy_request.end();
    });
}).listen(1337);*!/
*/
