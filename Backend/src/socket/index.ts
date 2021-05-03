import { Server as IO } from 'socket.io';
import socketServer from './socketServer';

export default (io: IO) => {
    io.on('connection', (socket) => {
        socket.on("test", () => {
            console.log(123);
            
        })
        socketServer(io, socket); 
        
    });
} 