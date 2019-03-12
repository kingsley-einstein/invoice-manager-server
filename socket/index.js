import io from 'socket.io';
import http from 'http';

export function createIOServer(app) {
    const server = http.createServer(app);
    const socketIO = io(server, {
        origins: '*:*'
    });

     socketIO.on('connection', (socket) => {
        console.log(`Connected to socket with id ${socket.id}`);

        socket.on('SEND_MESSAGE', (data) => {
            socketIO.emit('MESSAGE', data);
        });

        socket.on('LEAVE', (data) => {
            console.log(`Socket with id ${socket.id} disconnecting`)
            socket.disconnect();        
        })
    });

    return server;
};