var io = require('socket.io-client');
// const socketConfig = require("../../config/socket");
const piUrl = ("https://192.168.1.10:8888",{secure: true});
var socket = io(piUrl);


socket.on('connect', () => {
    console.log('Connected to Pi');

    socket.emit("message", "unlock", (err) => {
        if (err)
            console.log("Error sending unlock signal " + err);
        else
            console.log("Unlock signal sent to socket server");
    });
})


socket.on('disconnect', () => {
    console.log('disconnected to pi');
})

socket.on('error', (err) => {
    console.log(err);
})
