import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatRoom = new mongoose.Schema({
    socket: { type: String },
    tag: { type: String },
    matching: { type: Boolean, default: false }
}, {
    versionKey: false 
});

export default mongoose.model("chatRoom", ChatRoom);