import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatLog = new mongoose.Schema({
    roomName: { type: String },
    chating: [new mongoose.Schema({ message: String, time: Date })]
}, {
    versionKey: false 
});

export default mongoose.model("chatLog", ChatLog);