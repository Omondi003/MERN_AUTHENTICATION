import express from 'express'
const router=express.Router();

import {login, signup, signout, verifyEmail, forgotPassword} from '../controllers/auth.controller.js'

router.post('/login', login)
router.post('/signup', signup )
router.post('/signout',  signout)

router.post('/verify_email', verifyEmail)
router.post('/forgotPassword', forgotPassword)

export default router;