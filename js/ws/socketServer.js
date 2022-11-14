// https://www.youtube.com/watch?v=_Z9Axfh6AEU
const app = require('express')();
const appWs = require('express-ws')(app);

//Verbundene Nutzer (Nutzername -> Verbindung)
const conns = new Map();

app.ws("/ws", ws => {
    ws.on('message', msg => {
        console.log(msg)

        if(msg.includes("LOGIN ")){
            let username = msg.substring(6)

            //Doppelbelegung verhindern
            if(conns.has(username) || username === "SERVER"){
                ws.send("INUSE")
            } else {
                conns.set(username, ws);
                console.log(conns.keys())
                ws.send("SUCCESS")
            }
        }

        else if(msg.includes("LOGOUT ")){
            let username = msg.substring(7);
            conns.delete(username)
        }

        else if(msg.includes("MESSAGE ")){
            //String im Format "MESSAGE LAENGE0-9 USERNAME MESSAGE"
            const userLength = msg.substring(8,10);
            const username = msg.substring(10, 10+Number(userLength));
            const message = msg.substring(11+Number(userLength), msg.length);
            const sender = findKey(ws);

            if(conns.has(username)){
                const receiver = conns.get(username)
                const craftedMessage = "Nachricht von " + sender + ": \n" + message;
                receiver.send(craftedMessage);
                ws.send("Nachricht an "+ username + " erfolgreich verschickt")
            } else {
                const craftedMessage = "Es ist kein Nutzer mit dem Namen " + username + " online";
                ws.send(craftedMessage);
            }
        }
    });
    ws.on('close', () => {
        const key = findKey(ws);
        conns.delete(key);
    })
});

app.listen(1337, () => console.log('Started'))


//https://stackoverflow.com/questions/47135661/how-can-i-get-a-key-in-a-javascript-map-by-its-value
//Key zu Value finden
findKey = (searchValue) => {
    for (const [key, value] of conns) {
        if(value === searchValue) {
            return key;
        }
    }
}
