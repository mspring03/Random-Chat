import ChatLog from '../../database/model/ChatLog'

class ChatLogRepository {
    public static async findChatLog(myNickname: string, userNickname) {
        return await ChatLog.findOne().and([
            { roomName: { $regex: '.*' + myNickname + '.*' } }, 
            { roomName: { $regex: '.*' + userNickname + '.*' } }
        ]);
    }

    public static async createChatRoom(roomName) {
        await ChatLog.create({
              roomName: roomName
        })
    }

    public static async saveChatingLog(roomName, data, nickname) {
        await ChatLog.update({roomName: roomName}, {$push: {chating: {message: data, nickname: nickname, time: Date()}}});
    }
}

export default ChatLogRepository;