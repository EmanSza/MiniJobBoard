import { Router } from "express";
const router = Router();

import { getJobs, createJob, getJob, deleteJob, updateJob } from "../Controllers/Jobs.js";

router.get("/", getJobs);
router.get("/:identifier", getJob);
router.post("/", createJob);
router.delete("/:identifier", deleteJob);
router.put("/", updateJob)

export default router;
