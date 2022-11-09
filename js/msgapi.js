const loadMsgs = async () => {
    const url = "https://chat.web2021.dhbw.scytec.de/room/" + roomId + "/messages"
    const response = await fetch(url);
    return await response.json();
}


const sendMsg = async (sender, text, data) => {
    const url = "https://chat.web2021.dhbw.scytec.de/room/" + roomId + "/messages";

    var msg = {
        "sender" : sender,
        "text": text,
        "data": data
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    });

    // const json = await response.json();
    // console.log(json);
}