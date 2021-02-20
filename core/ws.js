// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const connect = new WebSocketServer({
    port: 3000
});
function broadcast(data) {
    //所有的窗口都储存在connections里面，所以用循环把消息发给所有的窗口 
    connect.clients.forEach((connect) => { 								
        connect.send(data);  //sendText 服务端发送给客户端方法
    })
}

connect.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        broadcast(message);
        console.log(`[SERVER] Broadcast: ${message}`);
//        ws.send(`ECHO: ${message}`, (err) => {
//            if (err) {
//                console.log(`[SERVER] error: ${err}`);
//            }
//        });
    })
});