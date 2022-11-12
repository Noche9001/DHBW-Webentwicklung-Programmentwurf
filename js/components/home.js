let button = document.getElementById("createRoom");
let input = document.getElementById("roomId");

const body = document.getElementById("body")


switchFunc = () => {
    let switchMode = document.getElementById("switch").innerText
    console.log(switchMode)
    if(switchMode === "PM"){
        document.getElementById("switch").innerText = "Räume";

        const pm = document.createDocumentFragment();

        const containerPM = document.createElement("div");
        containerPM.className="containerPM";
        containerPM.id="pmContainer";

        const label = document.createElement("label");
        label.innerText = "Direktnachricht senden";

        const inputUser = document.createElement("input");
        inputUser.type = "text";
        inputUser.id="receiver";
        inputUser.placeholder = "Empfänger";

        const inputMessage = document.createElement("input");
        inputMessage.type="text";
        inputMessage.id = "message";
        inputMessage.placeholder = "Nachricht";

        const btn = document.createElement("button")
        btn.id = "pmsend"
        btn.innerText = "Nachricht senden"

        containerPM.appendChild(label);
        containerPM.appendChild(inputUser);
        containerPM.appendChild(inputMessage);
        containerPM.appendChild(btn);

        pm.append(containerPM);

        let container = document.getElementById("roomContainer");
        container.parentNode.removeChild(container);

        body.appendChild(pm)

        const buttonPM = document.getElementById("pmsend");
        buttonPM.addEventListener("click", () => {
            socket2.privatemsg()
        });

    } else {
        document.getElementById("switch").innerText = "PM";

        const room = document.createDocumentFragment();

        const container = document.createElement("div");
        container.className="container";
        container.id="roomContainer";

        const label = document.createElement("label");
        label.innerText = "Raum beitreten";

        const inputRoom = document.createElement("input");
        inputRoom.type = "text";
        inputRoom.id="roomId";
        inputRoom.placeholder = "Raum-ID";

        const btn = document.createElement("button")
        btn.id = "createRoom"
        btn.innerText = "Raum erstellen / betreten"

        const divRule = document.createElement("div")
        divRule.className = "rule"

        const bold = document.createElement("b");
        bold.innerText = "Erlaubte Zeichen: "

        const br = document.createElement("br");

        const span = document.createElement("span")
        span.innerText = "a-z; A-Z; 0-9; -; _"

        divRule.appendChild(bold)
        divRule.appendChild(br);
        divRule.appendChild(span)

        container.appendChild(label);
        container.appendChild(inputRoom);
        container.appendChild(btn);
        container.appendChild(divRule);

        room.append(container);

        const containerPM = document.getElementById("pmContainer");
        containerPM.parentNode.removeChild(containerPM);

        body.appendChild(room);

        button = document.getElementById("createRoom")
        input = document.getElementById("roomId");
        button.addEventListener("click", () => {
            const roomId = input.value;
            if(roomId.length > 0){
                for (let i = 0; i < roomId.length; i++) {
                    if(!/([A-Za-z0-9-_])/.test(roomId.charAt(i))) {
                        alert("Sie haben ungültige Zeichen eingegeben. \n Erlaubte Zeichen: a-z, A-Z, 0-9, -, _")
                        input.value = "";
                        return;
                    }
                }
                window.location.href = "/Programmentwurf/room.html?roomId="+ roomId;
            }
        })
    }
}
