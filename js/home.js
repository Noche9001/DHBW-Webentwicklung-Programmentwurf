const button = document.getElementById("createRoom");
const input = document.getElementById("roomId");

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

