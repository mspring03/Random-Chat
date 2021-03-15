import User from '../../database/model/User';

class UserRepository {
    public static async UserStatesUpdate(socket, id: string) {
        User.update({ id: id }, { $set: { connection: true, socket: socket }})
    }

    public static async FindBySocketID(socket) {
        return User.findOne()
            .where('socket').equals(socket);
    }

    public static async joinRoom(socket, roomName) {
        User.update({ socket: socket }, { $set: { accessRoom: roomName }})
    }

    public static async outRoom(roomName) {
        User.update({ accessRoom: roomName }, { $set: { accessRoom: "" }})
    }

    public static async disconnect(socket) {
        User.findOneAndUpdate({ socket: socket }, { connection: false, socket: "", accessRoom: "" }, { new: false })
    }
}

export default UserRepository;