const button = document.getElementById("createRoom");
const input = document.getElementById("roomId");

button.addEventListener("click", () => {
    if(input.value.length > 0){
        let roomId = input.value;
        window.location.href = "/Programmentwurf/room.html?roomId="+ roomId;
        socket.subscribe(roomId)
    }
})

