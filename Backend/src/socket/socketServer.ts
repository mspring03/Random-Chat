import UserRepository from './socketFunction/User'
import ChatRoomRepository from './socketFunction/ChatRoomRepo';
import ChatLogRepository from './socketFunction/ChatLogRepo';
import { Server as IO } from 'socket.io';

export default (io: IO, socket) => {
    socket.on('online', async (id: string) => {
        await UserRepository.UserStatesUpdate(socket.id, id);
    
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
        if (!user) return;
        ChatRoomRepository.ChangedAllRoomPeople(io);
        ChatRoomRepository.ChangedRoomPeople(io, user['tag']);
    })

    socket.on('matching', async (tag: string) => {
        const matchedUser = await ChatRoomRepository.userMatching(socket.id, tag);
        if (!matchedUser) return 0;
        
        const myInfo = await UserRepository.FindBySocketID(socket.id);
        const userInfo = await UserRepository.FindBySocketID(matchedUser['socket']);
        
        const chatLog = await ChatLogRepository.findChatLog(myInfo['nickname'], userInfo['nickname']); 
        let roomName = chatLog ? chatLog['roomName'] : '';

        if (!chatLog) roomName = `${myInfo['nickname']}&${userInfo['nickname']}`;

        io.to(matchedUser['socket']).emit('join', roomName);
        io.to(socket.id).emit('join', roomName);

        await UserRepository.joinRoom(socket.id, roomName);
        await UserRepository.joinRoom(matchedUser['socket'], roomName);

        io.sockets.to(roomName).emit('randomUserFindingCompete', { info1: myInfo, info2: userInfo })
    })

    socket.on('roomjoin', async (roomName) => {
        socket.join(roomName)
    })

    socket.on('messageSend', async (result) => {
        console.log(result);
        
        io.sockets.to(result['roomName']).emit('message', { data: result['data'], nickname: result['nickname'] });
    })

    socket.on('roomClosing', async (roomName) => {
        io.sockets.to(roomName).emit("chatEnd");
    });

    socket.on('roomClear', async (roomName) => {
        UserRepository.outRoom(roomName);
    })

    socket.on('logout', async () => {
        const User = await UserRepository.disconnect(socket.id);

        if (User == null) return;
        
        if (User['accessRoom']) io.sockets.to(User['accessRoom']).emit("chatEnd");

        const ChatRoom = await ChatRoomRepository.goOutRoom(socket.id);
        if (ChatRoom) {
            ChatRoomRepository.ChangedAllRoomPeople(io);
            ChatRoomRepository.ChangedRoomPeople(io, ChatRoom['tag']);
        }
    })

    socket.on('disconnect', async () => {
        const User = await UserRepository.disconnect(socket.id);

        if (User == null) return;
        
        if (User['accessRoom']) io.sockets.to(User['accessRoom']).emit("chatEnd");

        const ChatRoom = await ChatRoomRepository.goOutRoom(socket.id);
        if (ChatRoom) {
            ChatRoomRepository.ChangedAllRoomPeople(io);
            ChatRoomRepository.ChangedRoomPeople(io, ChatRoom['tag']);
        }
        
        if (User['guest']) UserRepository.deleteUser(User['id']);
    })
}