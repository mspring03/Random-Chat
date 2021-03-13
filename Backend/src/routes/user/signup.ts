import express, { Request, Response } from 'express';
import validator from '../../middleware/validator';
import { SuccessMsgResponse } from '../../core/apiResponse';
import bcrypt from 'bcrypt';
import asyncHandler from '../../middleware/asyncHandler';
import crypto from 'crypto';
import _ from 'lodash';
import { environment } from '../../config';
import { createTokens } from '../../auth/authUtils';
import UserRepository from '../../database/repository/UserRepo';
import { ConflictError } from '../../core/apiError';
import Schema from '../../schema/user';

const router = express.Router();

router.post('/basic', 
  validator(Schema.signup),  
  asyncHandler(async (req: Request, res: Response) => {
    const IdIsExists = await UserRepository.findById(req.body.id)
    if (IdIsExists) 
      throw new ConflictError('User already registered');

    const NicknameIsExists = await UserRepository.findByNickname(req.body.nickname);
    if (NicknameIsExists)
      throw new ConflictError('Nickname already in use');

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    
    UserRepository.createUser(
      req.body.id,
      passwordHash,
      req.body.nickname,
      req.body.discription,
      req.body.tag,
    );  
    
    new SuccessMsgResponse('signup success').send(res);
  })
);

export default router;