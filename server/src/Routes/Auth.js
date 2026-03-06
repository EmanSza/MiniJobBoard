import { Router } from 'express';
const router = Router();

import { registerUser } from '../Controllers/Authentication.js';


router.post("/register", registerUser)

export default router