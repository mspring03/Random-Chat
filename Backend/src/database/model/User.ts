import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    description: { type: String},
    tag: { type: String },
    connection: { type: Boolean },
    Last_access_time: { type: Date },
    created_at: { type: Date, default: Date.now }
}, {
    versionKey: false 
});

export default mongoose.model("user", User);
// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//   } from 'typeorm';
  
//   @Entity()
//   export class User {
//     @PrimaryGeneratedColumn()
//     uuid: number;

//     @Column()
//     id: string;

//     @Column()
//     nickname: string;

//     @Column()
//     description: string;

//     @Column()
//     tag: string;

//     @Column()
//     connection: boolean;

//     @Column()
//     Last_access_time: string;
  
//     @CreateDateColumn({ type: 'timestamp' })
//     createdAt: string;
// }
  