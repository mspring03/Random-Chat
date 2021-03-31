import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ChatLog = new mongoose.Schema({
    roomName: { type: String, unique: true },
    chating: [ new mongoose.Schema({ 
        nickname: String, 
        message: String, 
        time: Date 
    })]
}, {
    versionKey: false 
});

export default mongoose.model("chatLog", ChatLog);