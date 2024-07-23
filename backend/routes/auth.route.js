import express from 'express'

import {login, signup, logout} from '../controller/auth.controller.js'
// Khai báo instand router
const router = express.Router();

router.get('/signup', signup);

router.get('/login', login)

router.get('/logout', logout)

export default router;