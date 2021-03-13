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

const router = express.Router();

router.post('/', 
  asyncHandler(async (req, res) => {
    console.log(await ChatRoom.find());

    // const user = await ChatRoomRepository.userMatching('game')
    // console.log(user);
    
    console.log(await ChatRoom.find());
    

    res.status(200).json({ message: "success" })
  })
);

export default router
