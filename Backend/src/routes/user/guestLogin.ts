import express from 'express';
import validator from '../../middleware/validator';
import { SuccessResponse } from '../../core/apiResponse';
import schema from '../../schema/user';
import asyncHandler from '../../middleware/asyncHandler';
import userRepo from '../../database/repository/UserRepo';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import _ from 'lodash';
import { createTokens } from '../../auth/authUtils';
import {
  BadRequestError,
  AuthFailureError,
  ConflictError
} from '../../core/apiError';
import UserRepository from '../../database/repository/UserRepo';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.guest),
  asyncHandler(async (req, res) => {
    const NicknameIsExists = await UserRepository.findByNickname(req.body.nickname);
    if (NicknameIsExists)
      throw new ConflictError('Nickname already in use');
    
    const randomId = `${req.body.nickname}${Math.random().toString(36).substr(2,11)}`
    const passwordHash = await bcrypt.hash(req.body.nickname, 10);
    
    UserRepository.createGuestUser(
      randomId,
      passwordHash,
      req.body.nickname,
    );  

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    const tokens = await createTokens(randomId, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: {
        'id': randomId,
        'nickname': req.body.nickname,
        'guest': true
      },
      tokens: tokens,
    }).send(res);
  }),
);

export default router;