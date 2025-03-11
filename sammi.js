function vnyanMain() {
    const portToSockets = {};
    const portToQueues = {};

    function getUrlFromPort(port){
        return `ws://localhost:${port}/vnyan`;
    }

    function deleteSocketAndRetry(port){
        SAMMI.alert('VNyan: Disconnected, reconnecting in 5 seconds');
        delete portToSockets[port];
        setTimeout(function(){ openSocket(port); }, 5000);
    }

    function openSocket(port) {
        let socket = portToSockets[port];
        if(!socket || socket.readyState === 3){
            socket = new WebSocket(getUrlFromPort(port));
            portToSockets[port] = socket;

            socket.onopen = function(event){
                SAMMI.alert(`VNyan connected on ${port}`);
                const queue = portToQueues[port];
                queue.forEach(function(command){
                    socket.send(command);
                });
                portToQueues[port] = [];
            };

            socket.onclose = function() {
                deleteSocketAndRetry(port);
            };
        }
        if(socket.readyState !== 2){
            return;
        }
        // 2 means it's closing. Delete and try to reopen
        deleteSocketAndRetry(port);
    }


    sammiclient.on('VNyan Message', (payload) => {
        const {commandName, port} = payload.Data;
        const socket = portToSockets[port];
        if(!socket || socket.readyState !== 1){
            portToQueues[port] = [...(portToQueues[port] || []), commandName];
            openSocket(port);
            return;
        }
        socket.send(commandName);
    });

    sammiclient.on('VNyan API Message', (payload) => {
        const {commandName, port, data} = payload.Data;
        let apiPayload = {};
        try {
            if(!!data){
                apiPayload = JSON.parse(data);
            }
        } catch (e) {
            SAMMI.alert(`${e}`);
        }
        SAMMI.httpRequest(`http://127.0.0.1:${port}`, "POST", { "Content-Type": "application/json" }, {
            action: commandName,
            payload: apiPayload,
        });
    });
}