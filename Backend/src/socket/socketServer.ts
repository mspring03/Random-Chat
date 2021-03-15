import UserRepository from './socketFunction/User'
import ChatRoomRepository from './socketFunction/ChatRoomRepo';
import { Server as IO } from 'socket.io';

export default (io: IO, socket) => {
    socket.on('online', async (id: string) => {
        UserRepository.UserStatesUpdate(socket, id);
        socket.emit('numberOfPeopleAllRoom', await ChatRoomRepository.countAllRoomPeople());
    });

    socket.on('joinRoom', async (tag: string) => {
        await ChatRoomRepository.roomJoin(socket, tag);
        socket.emit('numberOfPropleMyRoom', await ChatRoomRepository.countRoomPeople(tag))
        ChatRoomRepository.ChangedAllRoomPeople(io);
        ChatRoomRepository.ChangedRoomPeople(io, tag);
    });

    socket.on('outRoom', async () => {
        const user = await ChatRoomRepository.goOutRoom(socket);
        socket.emit('numberOfPeopleAllRoom', await ChatRoomRepository.countAllRoomPeople());
        ChatRoomRepository.ChangedAllRoomPeople(io);
        ChatRoomRepository.ChangedRoomPeople(io, user['tag']);
    })

    socket.on('matching', async (tag: string) => {
        const matchedUser = await ChatRoomRepository.userMatching(socket, tag);
        const myInfo = await UserRepository.FindBySocketID(socket);
        const userInfo = await UserRepository.FindBySocketID(matchedUser['socket']);
        const roomName = `${myInfo['nickname']}&${userInfo['nickname']}`

        matchedUser['socket'].join(roomName);
        myInfo['socket'].join(roomName);

        io.sockets.to(roomName).emit('randomUserFindingCompete', roomName)
    })
}