import express from 'express'
const router=express.Router();

import {login, signup, signout} from '../controllers/auth.controller.js'

router.post('/login', login)
router.post('/signup', signup )
router.post('/signout',  signout)

export default router;