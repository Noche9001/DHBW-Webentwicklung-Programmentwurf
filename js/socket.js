const socket = new WebSocket("wss://chat.web2021.dhbw.scytec.de/ws");
let activeUsers;

socket.onopen = () => {
    console.log("Connection established");
    activeUsers++;
    console.log("Active Users: " + activeUsers);
}

socket.onclose = () => {
    console.log("close");
}

socket.onerror = (error) => {
    console.log('Error im Websocket: ' + error);
}

socket.subscribe = (roomId) => {
    socket.send('SUBSCRIBE ' + roomId);
}

socket.isReady = () => {
    return socket.readyState;
}