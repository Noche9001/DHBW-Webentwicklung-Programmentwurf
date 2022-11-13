window.onload = () =>{
    let user = sessionStorage.getItem("user");
    if (user == null || user === "") window.location.href = "/Programmentwurf/login.html"

    const userSpan = document.getElementById("user");
    userSpan.innerHTML = user
}

createRoom = () => {
    const input = document.getElementById("roomId");
    const roomId = input.value;

    if(roomId.length > 0){
        for (let i = 0; i < roomId.length; i++) {
            //Auf ungültige Zeichen prüfen
            if(!/([A-Za-z0-9-_])/.test(roomId.charAt(i))) {
                alert("Sie haben ungültige Zeichen eingegeben. \n Erlaubte Zeichen: a-z, A-Z, 0-9, -, _")
                input.value = "";
                return;
            }
        }
        //Redirect zu Raum mit Room-ID Parameter
        window.location.href = "/Programmentwurf/room.html?roomId="+ roomId;
    }
}

sendPrivateMsg = () => {
    socket2.privatemsg()
}

//Single-Page-App framework workaround
switchFunc = () => {
    let switchMode = document.getElementById("switch").innerText

    if(switchMode === "PM"){
        document.getElementById("switch").innerText = "Räume";

        let container = document.getElementById("roomContainer");
        container.style.display = "none";

        const containerPM = document.getElementById("pmContainer");
        containerPM.style.display = "";

    } else {
        document.getElementById("switch").innerText = "PM";

        const containerPM = document.getElementById("pmContainer");
        containerPM.style.display = "none";

        let container = document.getElementById("roomContainer");
        container.style.display = "";
    }
}
