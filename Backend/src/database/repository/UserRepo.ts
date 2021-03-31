import User from '../model/User';

class UserRepository {
    public static async findById(id: string): Promise<Object> {
        return await User.findOne()
            .where('id').equals(id)
    }

    public static async findByNickname(nickname: string): Promise<Object> {
        return await User.findOne()
            .where('nickname').equals(nickname)
    }

    public static async createUser(
        id: string,
        password: string,
        nickname: string,
        description: string,
        tag: string,
    ) {
        User.create({
            id: id,
            password: password,
            nickname: nickname,
            description: description,
            tag: tag,
            connection: false,
            guest: false,
            Last_access_time: Date.now().toString(),
        })
    }

    public static async createGuestUser(
        id: string,
        password: string,
        nickname: string,
    ) {
        User.create({
            id: id,
            password: password,
            nickname: nickname,
            connection: false,
            guest: true,
            Last_access_time: Date.now().toString(),
        })
    }
}

export default UserRepository;