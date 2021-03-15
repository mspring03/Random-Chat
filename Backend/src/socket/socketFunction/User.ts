import User from '../../database/model/User';

class UserRepository {
    public static async UserStatesUpdate(socket, id: string) {
        User.update({ id: id }, { $set: { connection: true, socket: socket }})
    }

    public static async FindBySocketID(socket) {
        return User.findOne()
            .where('socket').equals(socket);
    }
}

export default UserRepository;