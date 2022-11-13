const input = document.getElementById("username");

login = () => {
    const username = input.value;

    if(username.length > 0){

        if(username.length > 9) alert("Der Nutzername darf maximal 9 Zeichen lang sein")
        else {
            for (let i = 0; i < username.length; i++) {
                //Auf ungültige Zeichen prüfen
                if(!/([A-Za-z0-9-_])/.test(username.charAt(i))) {
                    alert("Sie haben ungültige Zeichen eingegeben. \n Erlaubte Zeichen: a-z, A-Z, 0-9, -, _")
                    input.value = "";
                    return;
                }
            }
            //anmelden
            socket2.setUser();
        }
    }
}