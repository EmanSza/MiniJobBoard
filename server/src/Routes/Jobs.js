import { Router } from 'express';
const router = Router();

import { getJobs } from '../Controllers/Jobs.js';




router.get("/", getJobs)

export default router