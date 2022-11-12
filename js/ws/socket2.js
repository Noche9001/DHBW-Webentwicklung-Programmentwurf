let socket2 = new WebSocket("ws://localhost:1337/ws");


socket2.onopen = () =>{
        const user = sessionStorage.getItem("user");
        if(user == null && window.location.pathname !== "/Programmentwurf/login.html") window.location.href = "/Programmentwurf/login.html";
        if(user != null && user !== "") socket2.login(user);
}

socket2.onmessage = (msg) => {
        if(msg.data === "INUSE") alert("Der Benutzername ist zur Zeit belegt.")
        else if(msg.data === "SUCCESS") {
                if(window.location.pathname === "/Programmentwurf/login.html") window.location.href = "/Programmentwurf/";
        }
        else if(msg.data === "UPDATE") {
                loadAllMessages()
        }
        else alert(msg.data)
}

socket2.register = () => {
        let roomId = document.getElementById("a").value;
        socket2.send("REGISTERROOM "+ roomId)
}

socket2.setUser = () => {
        let user = document.getElementById("username").value;
        sessionStorage.setItem("user", user)
        socket2.login(user)
}

socket2.login = (user) =>{
        console.log("login")
        socket2.send('LOGIN ' + user);
}

socket2.logout = () => {
        let user = sessionStorage.getItem("user");
        socket2.send("LOGOUT "+ user)
        sessionStorage.removeItem("user")
        window.location.href = "/Programmentwurf/login.html"
}

socket2.privatemsg = () => {
        const username = document.getElementById("receiver").value
        const message = document.getElementById("message").value

        socket2.send('MESSAGE ' + username.length + ' ' + username + ' ' + message);
}


