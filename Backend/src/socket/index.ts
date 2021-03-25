import { Server as IO } from 'socket.io';
import socketServer from './socketServer';

export default (io: IO) => {
    io.on('connection', (socket) => {
        console.log(socket.id);
    console.log('-----------------');
            
        
        socket.on('data', () => {
            console.log(socket.id);
            
        })
        socketServer(io, socket);
    });
} 