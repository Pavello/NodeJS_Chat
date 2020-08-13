const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('CLient connected..');

    socket.emit('message', 'Welcome to Chat');

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', () => { 
        io.emit('message', 'User has left the chat');
    })
});


const PORT = 5600 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));