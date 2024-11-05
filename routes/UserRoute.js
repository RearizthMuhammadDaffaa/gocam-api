import express from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
  getUsersRoleUser
} from "../controllers/UserController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getUsersById);
router.get('/user/message', getUsersRoleUser);
router.post('/user', verifyToken(['superadmin']),createUser);
router.patch('/user/:id',verifyToken(['superadmin']),updateUser);
router.delete('/user/:id',verifyToken(['superadmin']),deleteUser);

export default router;