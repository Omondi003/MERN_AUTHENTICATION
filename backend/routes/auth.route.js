import express from 'express'
const router=express.Router();

import {login, signup, signout, verifyEmail} from '../controllers/auth.controller.js'

router.post('/login', login)
router.post('/signup', signup )
router.post('/signout',  signout)

router.post('/verify_email', verifyEmail)

export default router;