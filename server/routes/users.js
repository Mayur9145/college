import express from 'express';


import { signin, signup, requestPasswordReset, resetPassword, emailVerification, emailVerified } from '../controller/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/verify/:userId/:uniqueString', emailVerification);
router.get('/verified', emailVerified);
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);




export default router;