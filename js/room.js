let roomId;
const messageInput = document.getElementById("message")
let messages;

window.onload = () => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);

    roomId = urlParams.get('roomId')
    init();
}

init = () => {
    waitForReady().then(() => {
        socket.subscribe(roomId);
        sendMsg("testusr", "testusr joined the room.").then(() => loadAllMessages())
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
    sendMsg("testusr", messageInput.value, null).then(() => loadAllMessages())
}

createMessages = () => {
    const body = document.getElementById("chatContent")

    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    for (let i = 0; i < messages.length; i++) {
        let msg = document.createDocumentFragment();

        const divMsg = document.createElement("div");
        divMsg.className = "message";

        const divRow = document.createElement("div");
        divRow.className = "onlyRow";

        const hUser = document.createElement("h6");
        hUser.innerText = messages[i].sender + ": ";

        const  pMsg = document.createElement("p");
        pMsg.innerText = messages[i].text;

        divRow.appendChild(hUser);
        divRow.appendChild(pMsg);

        const divTime = document.createElement("div");

        const pTime = document.createElement("p");
        pTime.innerText = messages[i].timestamp.substring(11,16);

        divTime.appendChild(pTime);

        msg.appendChild(divMsg).appendChild(divRow);
        divMsg.appendChild(divTime)


        body.appendChild(msg);
    }
}

loadAllMessages = () => {
    loadMsgs().then(msgs => {
        messages = [];
        msgs.map((mappedMsg => messages.push(mappedMsg)));
        createMessages();
    })
}

//SO
sleep = (ms) => {
    return new Promise((resolve => setTimeout(resolve, ms)));
}