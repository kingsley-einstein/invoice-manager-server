import io from 'socket.io';
import http from 'http';

export async function createIOServer(app) {
    const server = http.createServer(app);
    const socketIO = io(server, {
        origins: '*:*'
    });

    await socketIO.on('connection', async (socket) => {
        console.log(`Connected to socket with id ${socket.id}`);

        await socket.on('SEND_MESSAGE', async (data) => {
            await socketIO.emit('MESSAGE', data);
        });
    });
};