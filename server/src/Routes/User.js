import { Router } from "express";
const router = Router()

import { hasPermission } from "../Middleware/ValidatePermissions.js";
import { isAuthenicated } from "../Middleware/ValidateAuth.js";

import { getUsers, getUser, createUser, updateUser, deleteUser } from "../Controllers/Users.js";

router.get('/', isAuthenicated(), hasPermission(), getUsers)
router.get('/:identifier', isAuthenicated(), hasPermission(), getUser)
router.post('/', isAuthenicated(), hasPermission(), createUser)
router.put("/:identifier", isAuthenicated(), hasPermission(), updateUser)
router.delete("/", isAuthenicated(), hasPermission(), deleteUser)

export default router