import ChatRoom from '../../database/model/ChatRoom';
import User from '../../database/model/User'
import { Server as IO } from 'socket.io';

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
            io.to(user['socket']).emit('numberOfPeopleAllRoom', await this.countAllRoomPeople());
        });
    }

    public static async ChangedRoomPeople(io: IO, tag: string) {
        const roomPeopleList = await ChatRoom.where('tag').equals(tag);

        roomPeopleList.forEach(async user => {
            io.to(user['socket']).emit('numberOfPropleMyRoom', await this.countRoomPeople(tag));
        });
    }

    public static async countAllRoomPeople() {   
        return await ChatRoom.aggregate([
            {
                '$group' : {
                    // _id: {'$addToSet': '$_id'},
                    _id: '$tag',
                    people: {'$sum': 1}
                }
            },
            {'$sort' : 
                {'people': -1} 
            },
        ])
    }

    public static async countRoomPeople(tag: string) {   
        return await ChatRoom.count({ tag: tag });
    }

    public static async sleep(ms) {
        return new Promise((r) => setTimeout(r, ms))
    }

    public static async userMatching(socket, tag: string) {
        while(1) {
            await ChatRoom.findOneAndUpdate({ socket: socket }, { $set: { matching: false }});
                      
            await this.sleep(3000);

            const matchingCheck = await ChatRoom.findOneAndUpdate({ socket: socket }, { $set: { matching: true }}, { new: false });
            if (matchingCheck == undefined || matchingCheck['matching']) return 0;

            const roomPeopleCount = await ChatRoom.count({ socket: {$not: {$eq:socket}}, matching: {$not: {$eq:true}}, tag: tag });
            if (!roomPeopleCount) continue;
             
            const skipsize = Math.floor(Math.random() * roomPeopleCount);

            const matchedPeople = await ChatRoom.findOne({ matching: {$not: {$eq:true}}, tag: tag }).skip(skipsize).limit(1);  
            if (!matchedPeople) continue;
            
            const check = await ChatRoom.findOneAndUpdate({ _id: matchedPeople['_id'], socket: {$not: {$eq:socket}}, tag: tag, matching: {$not: {$eq:true}} }, { matching: true }, { new: true });
            if (check) return check;
        } 
    }


}

export default ChatRoomRepository;