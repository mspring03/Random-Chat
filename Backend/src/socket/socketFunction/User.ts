import User from '../../database/model/User';

class UserRepository {
    public static async UserStatesUpdate(socket, id: string) {
        return await User.findOneAndUpdate({ id: id }, { $set: { connection: true, socket: socket }}, { new: true });
    }

    public static async FindBySocketID(socket) {
        return User.findOne()
            .where('socket').equals(socket);
    }

    public static async joinRoom(socket, roomName) {
        await User.findOneAndUpdate({ socket: socket }, { $set: { accessRoom: roomName }})
    }

    public static async outRoom(roomName) {
        await User.findOneAndUpdate({ accessRoom: roomName }, { $set: { accessRoom: "" }})
    }

    public static async deleteUser(id) {
        await User.findOneAndRemove({ id: id });
    }

    public static async disconnect(socket) {
        return await User.findOneAndUpdate({ socket: socket }, { $set: { connection: false, socket: "", accessRoom: "" }}, { new: false })
    }
}

export default UserRepository;