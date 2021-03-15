import socketioJwt from 'socketio-jwt';
import { Server as IO } from 'socket.io';
import { tokenInfo } from '../config'
import socketServer from './socketServer';

export default (io: IO) => {
    io.sockets
        .on('connection', socketioJwt.authorize({
            secret: tokenInfo.key,
            timeout: 15000 
        }))
        .on('authenticated', (socket) => {
            socketServer(io, socket);
            console.log(`hello! ${socket.decoded_token.name}`);
        });
} 