import express from 'express';
import validator from '../../middleware/validator';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import _ from 'lodash';
import { environment } from '../../config';
import { createTokens } from '../../auth/authUtils';
import {
  BadRequestError,
  AuthFailureError,
} from '../../core/apiError';

const router = express.Router();

router.post('/', 
    asyncHandler(async () => {

    })
);
