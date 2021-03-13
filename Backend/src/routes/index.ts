import express from 'express';
import apikey from '../auth/apikey';
import test from './user/test';
import signup from './user/signup'
import signin from './user/signin'
import guestLogin from './user/guestLogin'

const router = express.Router();

// router.use('/', apikey);

router.use('/test', test);
router.use('/signup', signup);
router.use('/signin', signin);
router.use('/guest', guestLogin)

export default router;