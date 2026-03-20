import { Router } from "express";
const router = Router();


import { validateJobPost } from "../Middleware/ValidateJobs.js";
import { isAuthenicated } from "../Middleware/ValidateAuth.js";
import { getJobs, createJob, getJob, deleteJob, updateJob } from "../Controllers/Jobs.js";

router.get("/", getJobs);
router.get("/:identifier", getJob);
router.post("/",isAuthenicated(), validateJobPost(), createJob);
router.delete("/:identifier",isAuthenicated(), deleteJob);
router.put("/", isAuthenicated(), updateJob)

export default router;
