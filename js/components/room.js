let roomId;
let user;
const canvas = document.getElementById("canvas");
const messageInput = document.getElementById("message");
const roomIdSpan = document.getElementById("roomId");
const usernameHeader = document.getElementById("user")
const title = document.getElementById("title");
let messages;

window.onload = () => {
    //Parameter auslesen
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);

    roomId = urlParams.get('roomId');

    //Raum über leeren parameter in URL vermeiden
    if(roomId == null || roomId === "" ) {
        window.location.href = "/Programmentwurf/";
    }
    else {
        title.innerText = "Raum " + roomId;
        init();
    }
}

init = () => {
    //Auf Connection warten
    waitForReady().then(() => {
        socket.subscribe(roomId);

        user = sessionStorage.getItem("user");

        roomIdSpan.innerText = roomId;
        usernameHeader.innerText = user;

        //Sichergehen, dass min. 1 Nachricht im Raum ist um API-Error zu vermeiden
        sendMsg("SERVER", user + " hat den Raum betreten").then(() => {
            loadAllMessages()
        });
    })
}

waitForReady = async () => {
    let state = socket.readyState;
    while (state !== 1) {
        state = socket.readyState;
        await sleep(500);
    }
}

send = () => {
    sendMsg(user, messageInput.value, null).then(() => {
        messageInput.value = "";
        loadAllMessages()
    });
}



createMessages = () => {
    //Alle Elemente auf Canvas löschen
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    for (let i = 0; i < messages.length; i++) {
        //Nachricht Node bauen
        let msg = document.createDocumentFragment();

        const divMsg = document.createElement("div");
        divMsg.className = "message";

        const username = document.createElement("span");
        username.className = "username";
        username.innerText = messages[i].sender + ": ";

        const messageText = document.createElement("div");
        messageText.className = "messageText";
        messageText.innerText = messages[i].text;

        const dateDiv = document.createElement("div");
        dateDiv.className = "date"

        const date = document.createElement("span");
        date.innerText = messages[i].timestamp.substring(0,10).replaceAll("-", "/");

        const time = document.createElement("span");
        time.innerText = messages[i].timestamp.substring(11,16);

        dateDiv.appendChild(time);
        dateDiv.appendChild(date);


        divMsg.appendChild(username)
        divMsg.appendChild(messageText)
        divMsg.appendChild(dateDiv)

        msg.appendChild(divMsg)

        canvas.appendChild(msg);
    }
}

loadAllMessages = () => {
    loadMsgs().then(msgs => {
        messages = [];
        msgs.map((mappedMsg => messages.push(mappedMsg)));

        createMessages();

        //Scrollbar nach unten setzen
        canvas.scrollTop = canvas.scrollHeight;
    })
}

leave = () => {
    let user = sessionStorage.getItem("user")
    sendMsg("SERVER", user + " hat den Raum verlassen", null).then(() => {
        socket.close();
        window.location.href = "/Programmentwurf/";
    });

}
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
sleep = (ms) => {
    return new Promise((resolve => setTimeout(resolve, ms)));
}