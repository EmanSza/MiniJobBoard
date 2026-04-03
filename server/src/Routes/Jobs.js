import { Router } from "express";
const router = Router();


import { validateJobPost, validateUpdateJob, validateDeleteJob } from "../Middleware/ValidateJobs.js";
import { isAuthenicated } from "../Middleware/ValidateAuth.js";
import { hasPermission } from "../Middleware/ValidatePermissions.js";
import { getJobs, createJob, getJob, deleteJob, updateJob } from "../Controllers/Jobs.js";

router.get("/", getJobs);
router.get("/:identifier", getJob);
router.post("/",isAuthenicated(), hasPermission(), validateJobPost(), createJob);
router.delete("/:identifier", isAuthenicated(), hasPermission(), validateDeleteJob(), deleteJob);
router.put("/", isAuthenicated(), hasPermission(), validateUpdateJob(), updateJob)

export default router;
