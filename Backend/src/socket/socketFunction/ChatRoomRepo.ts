import ChatRoom from '../../database/model/ChatRoom';
import User from '../../database/model/User'
import { Server as IO } from 'socket.io';
import { match } from 'node:assert';

class ChatRoomRepository {
    public static async roomJoin(socket, tag: string) {   
        ChatRoom.create({ socket: socket, tag: tag });
    }

    public static async goOutRoom(socket) {
        return await ChatRoom.findOneAndDelete({ socket: socket });
    }

    public static async ChangedAllRoomPeople(io: IO) {
        const connectionPeopleList = await User.where('connection').equals(true);

        connectionPeopleList.forEach(async user => {
            io.to(user['socket']).emit('ChangedAllRoomPeople', await this.countAllRoomPeople());
        });
    }

    public static async ChangedRoomPeople(io: IO, tag: string) {
        const roomPeopleList = await ChatRoom.where('tag').equals(tag);

        roomPeopleList.forEach(async user => {
            io.to(user['socket']).emit('ChangedRoomPeople', await this.countRoomPeople(tag));
        });
    }

    public static async countAllRoomPeople() {   
        return await ChatRoom.aggregate([
            {
                '$group' : {
                    '_id': '$tag',
                    'people': {'$sum': 1}
                }
            }
        ])
    }

    public static async countRoomPeople(tag: string) {   
        return await ChatRoom.count({ tag: tag });
    }

    public static async userMatching(socket, tag: string) {
        while(1) {
            await ChatRoom.update({ socket: socket }, { $set: { matching: false }});
            
            setTimeout(() => {}, 3000);

            const roomPeopleCount = await ChatRoom.count({ matching: {$not: {$eq:true}}, tag: tag });                       
            const skipsize = Math.floor(Math.random() * roomPeopleCount);

            const matchedPeople = await ChatRoom.findOne({ matching: {$not: {$eq:true}}, tag: tag }).skip(skipsize).limit(1);            
            await ChatRoom.update({ socket: socket }, { $set: { matching: true }});

            const check = await ChatRoom.findOneAndUpdate({ _id: matchedPeople['_id'], tag: tag, matching: {$not: {$eq:true}} }, { matching: true }, { new: true });
            if (check) return check;
        } 
    }


}

export default ChatRoomRepository;