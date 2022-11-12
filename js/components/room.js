let roomId;
let user;
const canvas = document.getElementById("canvas");
const messageInput = document.getElementById("message");
const roomIdSpan = document.getElementById("roomId");
const usernameHeader = document.getElementById("user")
const title = document.getElementById("title");
let messages;

window.onload = () => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);

    roomId = urlParams.get('roomId');

    if(roomId == null || roomId === "") {
        window.location.href = "/Programmentwurf/";
    }
    else {
        title.innerText = "Raum " + roomId;
        init();
    }
}

init = () => {
    waitForReady().then(() => {
        socket.subscribe(roomId);
        user = sessionStorage.getItem("user");
        roomIdSpan.innerText = roomId;
        usernameHeader.innerText = user;
        socket2.send("REGISTERROOM "+ roomId)
        sendMsg("SERVER", user + " hat den Raum betreten").then(() => {
            socket2.send("UPDATE "+ roomId)
            loadAllMessages()
            canvas.scrollTop = canvas.scrollHeight - canvas.clientHeight;
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
        socket2.send("UPDATE "+roomId)
        loadAllMessages()
    });
    messageInput.value = "";
}



createMessages = () => {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    for (let i = 0; i < messages.length; i++) {

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
        messages.reverse();
        createMessages();
    })
}

leave = () => {
    sendMsg("SERVER", "testusr hat den Raum verlassen", null).then(() => {
        socket.close();
        window.location.href = "/Programmentwurf/";
    });

}
//SO
sleep = (ms) => {
    return new Promise((resolve => setTimeout(resolve, ms)));
}