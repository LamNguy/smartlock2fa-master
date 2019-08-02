var io = require('socket.io-client');
const logger = require('../../config/logger.js');

const socketConfig = require("../../config/socket");
//TODO: https when on server
const piUrl = ("http://" + socketConfig.ip + ":" + socketConfig.port);
var socket = io(piUrl,{ secure: true, reconnect: true, rejectUnauthorized : false });

logger.log('debug', 'Socket Client running');
console.log("Socket Client running");
process.title = "myclient";


console.log(process.argv);

process.on("SIGUSR2", () => {
    console.log("Received SIGUSR2 - trigger sending unlock signal");
    if (socket.connected) {
        socket.emit("message", "unlock", (err) => {
            if (err)
                console.log("Error sending unlock signal " + err);
            else
                console.log("Unlock signal sent to socket server");
        });
    } else {
        console.log("Socket connection's not establish yet");
    }
})



socket.on('connect', () => {
    console.log('Connected to Pi');
})

socket.on('disconnect', () => {
    console.log('disconnected to pi');
})

socket.on('error', (err) => {
    console.log(err);
})
