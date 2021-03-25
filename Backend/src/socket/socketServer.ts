import UserRepository from './socketFunction/User'
import ChatRoomRepository from './socketFunction/ChatRoomRepo';
import ChatLogRepository from './socketFunction/ChatLogRepo';
import { Server as IO } from 'socket.io';

export default (io: IO, socket) => {
    socket.on('online', async (id: string) => {
        UserRepository.UserStatesUpdate(socket.id, id);
        socket.emit('numberOfPeopleAllRoom', await ChatRoomRepository.countAllRoomPeople());
    });

    socket.on('joinRoom', async (tag: string) => {
        await ChatRoomRepository.roomJoin(socket.id, tag);
        socket.emit('numberOfPropleMyRoom', await ChatRoomRepository.countRoomPeople(tag))
        ChatRoomRepository.ChangedAllRoomPeople(io);
        ChatRoomRepository.ChangedRoomPeople(io, tag);
    });

    socket.on('outRoom', async () => {
        const user = await ChatRoomRepository.goOutRoom(socket.id);
        socket.emit('numberOfPeopleAllRoom', await ChatRoomRepository.countAllRoomPeople());
        ChatRoomRepository.ChangedAllRoomPeople(io);
        ChatRoomRepository.ChangedRoomPeople(io, user['tag']);
    })

    socket.on('matching', async (tag: string) => {
        const matchedUser = await ChatRoomRepository.userMatching(socket.id, tag);
        const myInfo = await UserRepository.FindBySocketID(socket.id);
        const userInfo = await UserRepository.FindBySocketID(matchedUser['socket']);
        
        const chatLog = await ChatLogRepository.findChatLog(myInfo['nickname'], userInfo['nickname']); 
        let roomName = chatLog['roomName'];

        if (!chatLog) {
            roomName = `${myInfo['nickname']}&${userInfo['nickname']}`;
            ChatLogRepository.createChatRoom(roomName)
        }

        // matchedUser['socket'].join(roomName);
        io.to(matchedUser['socket']).emit('join', roomName);
        socket.join(roomName);

        UserRepository.joinRoom(socket.id, roomName);
        UserRepository.joinRoom(matchedUser['socket'], roomName)

        io.sockets.to(roomName).emit('randomUserFindingCompete', roomName)
    })

    socket.on('roomjoin', async (roomName) => {
        socket.join(roomName)
    })

    socket.on('message', async (result) => {
        io.sockets.to(result['roomName']).emit('message', { data: result['data'], nickname: result['nickname'] });
        ChatLogRepository.saveChatingLog(result['roomName'], result['data'], result['nickname'])
    })

    socket.on('roomClosing', async (roomName) => {
        io.sockets.to(roomName).emit("chatEnd");
    });

    socket.on('roomClear', async (roomName) => {
        UserRepository.outRoom(roomName);
    })

    socket.on('disconnect', async () => {

        console.log('disconnect');
        const User = UserRepository.disconnect(socket.id);
        if(User['roomName']) io.sockets.to(User['roomName']).emit("chatEnd");

        const ChatRoom = await ChatRoomRepository.goOutRoom(socket.id);
        if(ChatRoom) {
            ChatRoomRepository.ChangedAllRoomPeople(io);
            ChatRoomRepository.ChangedRoomPeople(io, ChatRoom['tag']);
        }
    })
}