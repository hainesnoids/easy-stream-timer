const express = require('express');
const expressWs = require(`@wll8/express-ws`)
const path = require('node:path');
const fs = require('node:fs').promises;
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const {app, wsRoute} = expressWs(express())
const PORT = 4900;
let wsMsgEventData = { 'name': 'set', 'content': 3661 };

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {});

app.get('/create/:len', (req, res) => {
    const timerLength = req.params['len'];
    res.json({ 'response': 'Timer created.' });
    eventEmitter.emit('wsMsg', { 'name': 'set', 'content': timerLength });
});

app.ws(`/ws`, (ws, req) => {
    console.log('Connection established!');
    eventEmitter.on('wsMsg', (data) => {
        ws.send(JSON.stringify(data));
    })

    ws.on('message', async (msg) => {

    })
})

process.on('uncaughtException', () => {
    // do jack shit
})

console.log('Waiting for WebSocket Connection...')
