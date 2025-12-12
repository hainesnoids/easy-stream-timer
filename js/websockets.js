const ws = new WebSocket('/ws');
ws.addEventListener('open', () => {

});

ws.onmessage = (event) => {
    console.log(event);
    const msg = JSON.parse(event.data);
    switch (msg.name) {
        case ('set'):
            startTimer(msg.content);
    }
}