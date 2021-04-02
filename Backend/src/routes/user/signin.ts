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
  validator(schema.userCredential),
  asyncHandler(async (req, res) => {
    const user = await UserRepository.findById(req.body.id);
    if (!user) throw new BadRequestError('User not registered');

    const match = await bcrypt.compare(req.body.password, user['password']);
    if (!match) throw new AuthFailureError('Authentication failure');
    if (user['connection']) throw new ConflictError('already login')

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    const tokens = await createTokens(user['id'], accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: _.pick(user, [
        'id',
        'nickname',
        'description',
        'tag',
        'guest'
      ]),
      tokens: tokens,
    }).send(res);
  }),
);

export default router;
