import express from 'express';
import validator from '../../middleware/validator';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import crypto from 'crypto';
import _ from 'lodash';
import { environment } from '../../config';
import { createTokens } from '../../auth/authUtils';
import {
  BadRequestError,
  AuthFailureError,
} from '../../core/apiError';
import User from '../../database/model/User';
import ChatRoom from '../../database/model/ChatRoom'
import UserRepository from '../../database/repository/UserRepo';
import ChatRoomRepository from '../../socket/socketFunction/ChatRoomRepo'
import ChatLog from '../../database/model/ChatLog'
import { info } from 'winston';

const router = express.Router();

router.post('/', 
  asyncHandler(async (req, res) => {
    console.log(await ChatLog.find());

  //   UserSchema.methods.addFriend = function (info) {
  //     this.friendList.push({friendId: info.id, name: info.name});
  //     return this.save();
  // };
    // const user = await ChatLog.create({
    //   roomName: "망나뇽&기모찌맨"
    // })
    // console.log(user);
    // await ChatLog.update({roomName: "망나뇽&기모찌맨"}, {$push: {chating: {message: "무야호", time: Date()}}});

    console.log(await ChatLog.findOne().and([
      { roomName: { $regex: '.*' + '망나뇽' + '.*' } }, 
      { roomName: { $regex: '.*' + '기모찌맨' + '.*' } }
    ]));



    //   { roomName: { $regex: '.*' + '망나뇽' + '.*' } }, 
    //   // { roomName: { $regex: '.*' + '기모찌맨' + '.*' } }
    // ));
    

    // console.log(await ChatLog.findOne({ roomName: '망나뇽&기모찌맨' }));
    

    res.status(200).json({ message: "success" })
  })
);

export default router
