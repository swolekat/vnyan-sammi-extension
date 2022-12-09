const WebSocket = require('ws');

const vnyanListeningServer = new WebSocket.Server({port: 8002});
const sammiServer = new WebSocket.Server({port: 8003});

vnyanListeningServer.on('connection', ws => {
    console.log('vnyan has connected');

    ws.on('message', data => {
        console.log(`vnyan has sent ${data}`);
        const messageToSend = `${data}`;
        let length = 0;
        sammiServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageToSend);
                length +=1;
            }
        });
        console.log(`there are ${length} sammi clients`);
        console.log(`sent ${data} to sammi`);
    });

    ws.on('close', () => {
        console.log('vnyan disconnected');
    });

    ws.on('error', () => {
        console.log('vnyan errored');
    });
});

sammiServer.on('connection', ws => {
    console.log('sammi has connected');

    ws.on('close', () => {
        console.log('sammi disconnected');

    });

    ws.on('error', () => {
        console.log('sammi errored');
    });
});

console.log('VNyan proxy running on 8002');
console.log('Sammi proxy running on 8003');