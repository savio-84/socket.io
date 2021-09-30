import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app)
import path from 'path';
import { Server } from 'socket.io';
const io = new Server(server);

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
})

io.on('connection', (socket) => {
    console.log('A user connected 👱 ')
    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
        console.log('A user disconnected 🧖 ')
    })


    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

})


server.listen(3000, () => {
    console.log('Listening on: 3000 port! 🚀');
})