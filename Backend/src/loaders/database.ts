import { db } from '../config';
import mongoose from 'mongoose';
import Logger from '../core/Logger';

class Database{

    url: string

    constructor(){
        this.url = db.url;
    }

    public async connection() {
        const connection = await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
        Logger.info('DB is connected');
        return connection;
    }
}

export default Database;