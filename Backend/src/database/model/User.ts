import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    description: { type: String },
    tag: { type: String },
    connection: { type: Boolean },
    guest: { type: Boolean },
    socket: { type: String },
    Last_access_time: { type: String },
    created_at: { type: Date, default: Date.now }
}, {
    versionKey: false 
});

export default mongoose.model("user", User);