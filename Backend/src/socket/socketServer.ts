import UserRepository from './socketFunction/User'
import ChatRoomRepository from './socketFunction/ChatRoomRepo';
import ChatLogRepository from './socketFunction/ChatLogRepo';
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
        
        const chatLog = await ChatLogRepository.findChatLog(myInfo['nickname'], userInfo['nickname']); 
        let roomName = chatLog['roomName'];

        if (!chatLog) {
            roomName = `${myInfo['nickname']}&${userInfo['nickname']}`;
            ChatLogRepository.createChatRoom(roomName)
        }

        matchedUser['socket'].join(roomName);
        myInfo['socket'].join(roomName);

        UserRepository.joinRoom(socket, roomName);
        UserRepository.joinRoom(matchedUser['socket'], roomName)

        io.sockets.to(roomName).emit('randomUserFindingCompete', roomName)
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
        const User = UserRepository.disconnect(socket);
        if(User['roomName']) io.sockets.to(User['roomName']).emit("chatEnd");

        const ChatRoom = await ChatRoomRepository.goOutRoom(socket);
        if(ChatRoom) {
            ChatRoomRepository.ChangedAllRoomPeople(io);
            ChatRoomRepository.ChangedRoomPeople(io, ChatRoom['tag']);
        }
    })
}