const socket = new WebSocket("wss://chat.web2021.dhbw.scytec.de/ws");

socket.onopen = () => {
    console.log("Connection established");
}

socket.onmessage = () =>{
    loadAllMessages();
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