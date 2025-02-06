import express from 'express'
const router=express.Router();

import {login, signup, signout} from '../controllers/auth.controller.js'

router.get('/login', login)
router.get('/signup', signup )
router.get('/signout',  signout)

export default router;